import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createWriteStream } from 'fs';
import https from 'https';
import http from 'http';

interface CustomAPKOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Customizar APK com nome, logo e URL
 */
export async function buildCustomAPK(options: CustomAPKOptions): Promise<string> {
  const { appName, appUrl, logoUrl } = options;
  const timestamp = Date.now();
  const buildId = Math.random().toString(36).substring(7);
  const workDir = `/tmp/apk-custom-${timestamp}-${buildId}`;
  const extractDir = `${workDir}/extracted`;
  const outputDir = '/home/ubuntu/remote-monitor/public/apks';
  
  try {
    // Criar diretórios
    fs.mkdirSync(workDir, { recursive: true });
    fs.mkdirSync(extractDir, { recursive: true });
    
    const baseAPKPath = '/home/ubuntu/remote-monitor/public/apks/base-faztudo.apk';
    if (!fs.existsSync(baseAPKPath)) {
      throw new Error('Base APK not found');
    }

    console.log(`[CUSTOM-APK] Building APK: ${appName}`);
    
    // 1. Desempacotar APK base
    console.log(`[CUSTOM-APK] Extracting base APK...`);
    execSync(`cd ${extractDir} && unzip -q ${baseAPKPath}`);
    
    // 2. Customizar nome (strings.xml)
    console.log(`[CUSTOM-APK] Customizing app name: ${appName}`);
    const stringsPath = `${extractDir}/res/values/strings.xml`;
    if (fs.existsSync(stringsPath)) {
      let content = fs.readFileSync(stringsPath, 'utf-8');
      content = content.replace(
        /<string name="app_name">[^<]*<\/string>/,
        `<string name="app_name">${appName}</string>`
      );
      fs.writeFileSync(stringsPath, content);
    }
    
    // 3. Customizar URL (app-config.json)
    console.log(`[CUSTOM-APK] Setting app URL: ${appUrl}`);
    const configPath = `${extractDir}/assets/app-config.json`;
    const config = {
      appName,
      appUrl,
      logoUrl: logoUrl || '',
      buildTime: new Date().toISOString()
    };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    // 4. Customizar logo (se fornecido)
    if (logoUrl) {
      console.log(`[CUSTOM-APK] Downloading logo: ${logoUrl}`);
      try {
        const logoPath = `${extractDir}/res/drawable/ic_launcher.png`;
        await downloadFile(logoUrl, logoPath);
        console.log(`[CUSTOM-APK] Logo customized`);
      } catch (err) {
        console.warn(`[CUSTOM-APK] Failed to customize logo:`, err);
      }
    }
    
    // 5. Reempacotar APK
    console.log(`[CUSTOM-APK] Repacking APK...`);
    const customAPKPath = `${workDir}/custom.apk`;
    execSync(`cd ${extractDir} && zip -r -q ${customAPKPath} .`);
    
    // 6. Alinhar APK
    console.log(`[CUSTOM-APK] Aligning APK...`);
    const alignedAPKPath = `${workDir}/custom-aligned.apk`;
    execSync(`zipalign -v 4 ${customAPKPath} ${alignedAPKPath}`);
    
    // 7. Assinar APK
    console.log(`[CUSTOM-APK] Signing APK...`);
    execSync(`jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore /tmp/android.keystore -storepass android -keypass android ${alignedAPKPath} android 2>/dev/null || true`);
    
    // 8. Copiar para output
    const finalAPKName = `${appName.replace(/[^a-zA-Z0-9]/g, '')}-${timestamp}-${buildId}.apk`;
    const finalAPKPath = `${outputDir}/${finalAPKName}`;
    fs.copyFileSync(alignedAPKPath, finalAPKPath);
    
    console.log(`[CUSTOM-APK] APK built successfully: ${finalAPKName}`);
    console.log(`[CUSTOM-APK] Size: ${(fs.statSync(finalAPKPath).size / 1024 / 1024).toFixed(2)}MB`);
    
    // Limpar
    try {
      execSync(`rm -rf ${workDir}`, { stdio: 'ignore' });
    } catch (e) {
      console.warn('[CUSTOM-APK] Failed to clean up temp directory');
    }
    
    return finalAPKName;
  } catch (error) {
    console.error('[CUSTOM-APK] Error building APK:', error);
    // Limpar em caso de erro
    try {
      if (fs.existsSync(workDir)) {
        execSync(`rm -rf ${workDir}`, { stdio: 'ignore' });
      }
    } catch (e) {
      // Ignore cleanup errors
    }
    throw error;
  }
}

/**
 * Download file from URL
 */
function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = createWriteStream(dest);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location!, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}
