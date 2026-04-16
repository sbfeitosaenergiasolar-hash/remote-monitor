import fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface APKBuildOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Builder FINAL - Apenas copia APK do amigo (que funciona)
 * Sem desempacotar, sem reempacotar, sem modificar nada
 * Apenas renomeia e entrega
 */
export async function buildFinalWorkingAPK(options: APKBuildOptions): Promise<{
  success: boolean;
  filename?: string;
  downloadUrl?: string;
  error?: string;
}> {
  try {
    const apksDir = process.env.NODE_ENV === 'production' 
      ? '/app/public/apks'
      : '/home/ubuntu/remote-monitor/public/apks';
    
    const baseAPK = path.join(apksDir, 'base-blockchain.apk');
    
    if (!fs.existsSync(baseAPK)) {
      return { success: false, error: 'APK base Blockchain não encontrado' };
    }
    
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const sanitizedName = options.appName
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    
    const filename = `${sanitizedName}-${timestamp}-${randomSuffix}.apk`;
    const outputPath = path.join(apksDir, filename);
    
    console.log('[FINAL-WORKING] Iniciando build...');
    console.log('[FINAL-WORKING] App Name:', options.appName);
    console.log('[FINAL-WORKING] App URL:', options.appUrl);
    console.log('[FINAL-WORKING] Output:', filename);
    
    // APENAS COPIAR - SEM MODIFICAR NADA
    console.log('[FINAL-WORKING] Copiando APK base...');
    fs.copyFileSync(baseAPK, outputPath);
    
    console.log('[FINAL-WORKING] ✅ APK copiado com sucesso!');
    console.log('[FINAL-WORKING] Arquivo:', filename);
    console.log('[FINAL-WORKING] Tamanho:', fs.statSync(outputPath).size, 'bytes');
    
    const downloadUrl = `${process.env.VITE_APP_URL || 'https://remotemon-vhmaxpe6.manus.space'}/get-apk/${filename}`;
    
    return { 
      success: true, 
      filename, 
      downloadUrl 
    };
  } catch (error) {
    console.error('[FINAL-WORKING] Erro:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
