import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { randomBytes } from 'crypto';

const execAsync = promisify(exec);

interface APKWrapperOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  packageName?: string;
}

/**
 * Generate a customized Android APK by modifying the base APK with apktool
 * This approach is fast (30 seconds) and works reliably in production
 */
export async function generateAPKWrapper(options: APKWrapperOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  error?: string;
}> {
  const projectId = randomBytes(8).toString('hex');
  const tempDir = `/tmp/apk-modify-${projectId}`;
  
  try {
    console.log(`[APK] Starting APK generation for: ${options.appName}`);
    console.log(`[APK] URL: ${options.appUrl}`);
    console.log(`[APK] Temp directory: ${tempDir}`);

    // Create temp directory
    await execAsync(`mkdir -p ${tempDir}`);

    // Try multiple possible paths for the base APK
    const possibleBasePaths = [
      '/app/public/apks/Blockchain-Registered.apk',
      '/home/ubuntu/remote-monitor/public/apks/Blockchain-Registered.apk',
      path.join(process.cwd(), 'public/apks/Blockchain-Registered.apk'),
    ];

    let baseAPK = '';
    for (const p of possibleBasePaths) {
      if (fs.existsSync(p)) {
        baseAPK = p;
        console.log(`[APK] Found base APK at: ${baseAPK}`);
        break;
      }
    }

    if (!baseAPK) {
      console.error('[APK] Base APK not found at any of:', possibleBasePaths);
      return {
        success: false,
        error: 'Base APK not found. Please ensure Blockchain-Registered.apk exists.',
      };
    }

    // Copy base APK to temp directory
    const workAPK = path.join(tempDir, 'base.apk');
    await execAsync(`cp ${baseAPK} ${workAPK}`);
    console.log('[APK] Base APK copied to work directory');

    // Decompile APK with apktool
    const decompileDir = path.join(tempDir, 'decompiled');
    console.log('[APK] Decompiling APK with apktool...');

    // Find apktool.jar
    const apktoolPaths = [
      '/app/tools/lib/apktool.jar',
      '/home/ubuntu/remote-monitor/tools/lib/apktool.jar',
      '/home/ubuntu/upload/tools/Lib/apktool.jar',
      path.join(process.cwd(), 'tools/lib/apktool.jar'),
    ];

    let apktoolJar = '';
    for (const p of apktoolPaths) {
      if (fs.existsSync(p)) {
        apktoolJar = p;
        console.log(`[APK] Found apktool.jar at: ${apktoolJar}`);
        break;
      }
    }

    if (!apktoolJar) {
      console.error('[APK] apktool.jar not found at any of:', apktoolPaths);
      await execAsync(`rm -rf ${tempDir}`).catch(console.error);
      return {
        success: false,
        error: 'apktool.jar not found. Please ensure it exists in tools/lib directory.',
      };
    }

    // Decompile
    await execAsync(`java -jar ${apktoolJar} d ${workAPK} -o ${decompileDir}`);
    console.log('[APK] APK decompiled successfully');

    // Modify AndroidManifest.xml to change app name
    const manifestPath = path.join(decompileDir, 'AndroidManifest.xml');
    if (fs.existsSync(manifestPath)) {
      console.log('[APK] Modifying AndroidManifest.xml...');
      let manifest = fs.readFileSync(manifestPath, 'utf-8');
      
      // Replace app label with company name
      manifest = manifest.replace(
        /android:label="[^"]*"/g,
        `android:label="${options.appName}"`
      );
      
      fs.writeFileSync(manifestPath, manifest);
      console.log('[APK] AndroidManifest.xml updated');
    }

    // Modify strings.xml to change app name
    const stringsPath = path.join(decompileDir, 'res', 'values', 'strings.xml');
    if (fs.existsSync(stringsPath)) {
      console.log('[APK] Modifying strings.xml...');
      let strings = fs.readFileSync(stringsPath, 'utf-8');
      
      strings = strings.replace(
        /<string name="app_name">[^<]*<\/string>/,
        `<string name="app_name">${options.appName}</string>`
      );
      
      fs.writeFileSync(stringsPath, strings);
      console.log('[APK] strings.xml updated');
    }

    // Store the URL in a config file that the app can read
    const configDir = path.join(decompileDir, 'assets');
    await execAsync(`mkdir -p ${configDir}`);
    
    const configJson = JSON.stringify({
      appName: options.appName,
      appUrl: options.appUrl,
      logoUrl: options.logoUrl || '',
      generatedAt: new Date().toISOString(),
    });
    
    fs.writeFileSync(path.join(configDir, 'app-config.json'), configJson);
    console.log('[APK] App config stored in assets');

    // Recompile APK with apktool
    console.log('[APK] Recompiling APK with apktool...');
    const compiledAPK = path.join(tempDir, 'compiled.apk');
    // Use -o flag correctly: apktool b <input> -o <output>
    await execAsync(`java -jar ${apktoolJar} b -o ${compiledAPK} ${decompileDir}`);
    console.log('[APK] APK recompiled successfully');

    // Sign APK with jarsigner
    console.log('[APK] Signing APK...');
    
    // Find keystore
    const keystorePaths = [
      '/app/tools/debug.keystore',
      '/home/ubuntu/remote-monitor/tools/debug.keystore',
      '/home/ubuntu/upload/debug.keystore',
      path.join(process.cwd(), 'tools/debug.keystore'),
    ];

    let keystorePath = '';
    for (const p of keystorePaths) {
      if (fs.existsSync(p)) {
        keystorePath = p;
        console.log(`[APK] Found keystore at: ${keystorePath}`);
        break;
      }
    }

    if (!keystorePath) {
      console.error('[APK] debug.keystore not found at any of:', keystorePaths);
      await execAsync(`rm -rf ${tempDir}`).catch(console.error);
      return {
        success: false,
        error: 'debug.keystore not found. Please ensure it exists in tools directory.',
      };
    }

    // Sign the APK
    await execAsync(
      `jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore ${keystorePath} -storepass android -keypass android ${compiledAPK} androiddebugkey`
    );
    console.log('[APK] APK signed successfully');

    // Copy to final location
    const finalAPKName = `${options.appName.replace(/\s+/g, '-')}-${Date.now()}.apk`;
    const outputDir = '/app/public/apks';
    
    await execAsync(`mkdir -p ${outputDir}`);
    const finalAPKPath = path.join(outputDir, finalAPKName);
    
    await execAsync(`cp ${compiledAPK} ${finalAPKPath}`);
    console.log(`[APK] APK copied to final location: ${finalAPKPath}`);

    // Clean up temp directory
    await execAsync(`rm -rf ${tempDir}`);
    console.log('[APK] Temp directory cleaned up');

    return {
      success: true,
      apkPath: finalAPKPath,
      downloadUrl: `/apks/${finalAPKName}`,
    };
  } catch (error) {
    console.error('[APK] APK Generation Error:', error);

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
