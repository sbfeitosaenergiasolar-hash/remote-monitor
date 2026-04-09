import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { nanoid } from 'nanoid';

/**
 * APK Generator Router
 * Gerencia a geração dinâmica de APKs customizados
 */

interface BuildJob {
  id: string;
  status: 'pending' | 'building' | 'completed' | 'failed';
  progress: number;
  message: string;
  panelUrl: string;
  appName: string;
  packageName: string;
  downloadUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Simulação de fila de builds (em produção, usar Redis ou banco de dados)
const buildJobs = new Map<string, BuildJob>();

export const apkRouter = router({
  /**
   * Iniciar geração de APK
   */
  generate: publicProcedure
    .input(
      z.object({
        panelUrl: z.string().url(),
        appName: z.string().min(1).max(50),
        packageName: z.string().regex(/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)*$/),
      })
    )
    .mutation(async ({ input }) => {
      const buildId = nanoid();

      const job: BuildJob = {
        id: buildId,
        status: 'pending',
        progress: 0,
        message: 'Preparando build...',
        panelUrl: input.panelUrl,
        appName: input.appName,
        packageName: input.packageName,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      buildJobs.set(buildId, job);

      // Simular progresso do build (em produção, usar sistema real de build)
      simulateBuildProgress(buildId);

      return {
        buildId,
        message: 'Build iniciado com sucesso',
      };
    }),

  /**
   * Verificar status do build
   */
  status: publicProcedure
    .input(z.object({ buildId: z.string() }))
    .query(({ input }) => {
      const job = buildJobs.get(input.buildId);

      if (!job) {
        return {
          status: 'not_found',
          progress: 0,
          message: 'Build não encontrado',
        };
      }

      return {
        status: job.status,
        progress: job.progress,
        message: job.message,
        downloadUrl: job.downloadUrl,
      };
    }),

  /**
   * Listar builds recentes
   */
  listRecent: publicProcedure.query(() => {
    const recent = Array.from(buildJobs.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10)
      .map((job) => ({
        id: job.id,
        appName: job.appName,
        status: job.status,
        progress: job.progress,
        createdAt: job.createdAt,
      }));

    return recent;
  }),
});

/**
 * Simular progresso do build
 * Em produção, isso seria integrado com EAS Build ou outro sistema
 */
function simulateBuildProgress(buildId: string) {
  const job = buildJobs.get(buildId);
  if (!job) return;

  job.status = 'building';
  job.updatedAt = new Date();

  const stages = [
    { progress: 10, message: 'Baixando dependências...' },
    { progress: 25, message: 'Configurando projeto...' },
    { progress: 40, message: 'Compilando código...' },
    { progress: 60, message: 'Gerando APK...' },
    { progress: 80, message: 'Assinando APK...' },
    { progress: 95, message: 'Finalizando...' },
  ];

  let stageIndex = 0;

  const interval = setInterval(() => {
    if (stageIndex < stages.length) {
      const stage = stages[stageIndex];
      job.progress = stage.progress;
      job.message = stage.message;
      job.updatedAt = new Date();
      stageIndex++;
    } else {
      // Build completo
      job.status = 'completed';
      job.progress = 100;
      job.message = 'APK gerado com sucesso!';
      job.downloadUrl = generateDownloadUrl(job);
      job.updatedAt = new Date();
      clearInterval(interval);

      // Limpar job após 24 horas
      setTimeout(() => {
        buildJobs.delete(buildId);
      }, 24 * 60 * 60 * 1000);
    }
  }, 3000); // Atualizar a cada 3 segundos
}

/**
 * Gerar URL de download (simulado)
 * Em produção, seria um link real para o APK no S3 ou similar
 */
function generateDownloadUrl(job: BuildJob): string {
  // Simulação: em produção, seria um link real
  return `https://storage.example.com/apks/${job.id}/${job.packageName}.apk`;
}
