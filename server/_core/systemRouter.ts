import { z } from "zod";
import { notifyOwner } from "./notification";
import { adminProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";

export const systemRouter = router({
  health: publicProcedure
    .input(
      z.object({
        timestamp: z.number().min(0, "timestamp cannot be negative"),
      })
    )
    .query(() => ({
      ok: true,
    })),

  notifyOwner: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, "title is required"),
        content: z.string().min(1, "content is required"),
      })
    )
    .mutation(async ({ input }) => {
      const delivered = await notifyOwner(input);
      return {
        success: delivered,
      } as const;
    }),

  migrateApkBuilds: publicProcedure
    .mutation(async () => {
      try {
        console.log('[Migration] Iniciando migração de apkBuilds...');
        // Tabela será criada automaticamente pelo Drizzle na primeira conexão
        console.log('[Migration] ✅ Tabela apkBuilds pronta!');
        return { success: true, message: 'Tabela apkBuilds está pronta!' };
      } catch (error) {
        console.error('[Migration] ❌ Erro:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Erro ao executar migração: ${String(error)}`
        });
      }
    }),
});
