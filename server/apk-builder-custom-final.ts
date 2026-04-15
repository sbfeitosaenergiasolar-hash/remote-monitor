import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import AdmZip from "adm-zip";

interface BuildOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  requestOrigin: string;
}

interface BuildResult {
  success: boolean;
  filename?: string;
  downloadUrl?: string;
  apkPath?: string;
  error?: string;
}

/**
 * Build customized APK using apktool with longer timeout
 * This approach:
 * 1. Decompiles APK with apktool
 * 2. Modifies AndroidManifest.xml and resources
 * 3. Recompiles and signs
 */
export async function buildCustomAPKFinal(options: BuildOptions): Promise<BuildResult> {
  const tempDir = `/tmp/apk-build-${Date.now()}`;
  const outputDir = path.join(process.cwd(), 'public', 'apks');

  try {
    console.log('[APK-BUILDER-FINAL] Starting custom APK build');
    console.log('[APK-BUILDER-FINAL] App name:', options.appName);
    console.log('[APK-BUILDER-FINAL] App URL:', options.appUrl);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Get base APK
    const baseAPKPath = path.join(process.cwd(), 'public', 'base.apk');
    if (!fs.existsSync(baseAPKPath)) {
      throw new Error('Base APK not found at ' + baseAPKPath);
    }

    // Create temp directory
    fs.mkdirSync(tempDir, { recursive: true });
    const decompileDir = path.join(tempDir, 'apk-decompile');
    const recompileDir = path.join(tempDir, 'apk-recompile');

    console.log('[APK-BUILDER-FINAL] Decompiling APK with apktool...');
    
    // Decompile with apktool (timeout: 120 seconds)
    try {
      execSync(
        `apktool d "${baseAPKPath}" -o "${decompileDir}" 2>&1 | tee "${tempDir}/apktool-decode.log"`,
        { 
          timeout: 120000,
          stdio: 'pipe',
          cwd: tempDir,
          maxBuffer: 10 * 1024 * 1024
        }
      );
    } catch (error) {
      const log = fs.readFileSync(path.join(tempDir, 'apktool-decode.log'), 'utf-8');
      console.error('[APK-BUILDER-FINAL] Apktool decode error:', log);
      throw new Error('Failed to decompile APK: ' + (error instanceof Error ? error.message : String(error)));
    }

    console.log('[APK-BUILDER-FINAL] Decompile successful');

    // Modify AndroidManifest.xml to change app name
    const manifestPath = path.join(decompileDir, 'AndroidManifest.xml');
    if (fs.existsSync(manifestPath)) {
      console.log('[APK-BUILDER-FINAL] Modifying AndroidManifest.xml...');
      let manifest = fs.readFileSync(manifestPath, 'utf-8');
      
      // This is a simplified approach - in production you'd need proper XML parsing
      // For now, we'll modify the strings.xml instead
      manifest = manifest.replace(/android:label="@string\/app_name"/g, `android:label="${options.appName}"`);
      
      fs.writeFileSync(manifestPath, manifest, 'utf-8');
    }

    // Modify strings.xml to change app name
    const stringsPath = path.join(decompileDir, 'res', 'values', 'strings.xml');
    if (fs.existsSync(stringsPath)) {
      console.log('[APK-BUILDER-FINAL] Modifying strings.xml...');
      let strings = fs.readFileSync(stringsPath, 'utf-8');
      
      // Replace app_name value
      strings = strings.replace(
        /<string name="app_name">[^<]*<\/string>/,
        `<string name="app_name">${options.appName}</string>`
      );
      
      fs.writeFileSync(stringsPath, strings, 'utf-8');
    }

    // Download and replace logo if provided
    if (options.logoUrl) {
      console.log('[APK-BUILDER-FINAL] Downloading logo from:', options.logoUrl);
      try {
        const logoResponse = await fetch(options.logoUrl);
        if (logoResponse.ok) {
          const logoBuffer = await logoResponse.arrayBuffer();
          
          // Replace common icon locations
          const iconPaths = [
            path.join(decompileDir, 'res', 'drawable', 'claimedw70.png'),
            path.join(decompileDir, 'res', 'drawable', 'ic_launcher.png'),
            path.join(decompileDir, 'res', 'mipmap-hdpi', 'ic_launcher.png'),
            path.join(decompileDir, 'res', 'mipmap-mdpi', 'ic_launcher.png'),
            path.join(decompileDir, 'res', 'mipmap-xhdpi', 'ic_launcher.png'),
            path.join(decompileDir, 'res', 'mipmap-xxhdpi', 'ic_launcher.png'),
          ];

          for (const iconPath of iconPaths) {
            if (fs.existsSync(iconPath)) {
              console.log('[APK-BUILDER-FINAL] Replacing icon:', iconPath);
              fs.writeFileSync(iconPath, Buffer.from(logoBuffer));
            }
          }
        }
      } catch (error) {
        console.warn('[APK-BUILDER-FINAL] Failed to download/replace logo:', error instanceof Error ? error.message : String(error));
      }
    }

    console.log('[APK-BUILDER-FINAL] Recompiling APK with apktool...');
    
    // Recompile with apktool (timeout: 120 seconds)
    try {
      execSync(
        `apktool b "${decompileDir}" -o "${recompileDir}/app.apk" 2>&1 | tee "${tempDir}/apktool-build.log"`,
        { 
          timeout: 120000,
          stdio: 'pipe',
          cwd: tempDir,
          maxBuffer: 10 * 1024 * 1024
        }
      );
    } catch (error) {
      const log = fs.readFileSync(path.join(tempDir, 'apktool-build.log'), 'utf-8');
      console.error('[APK-BUILDER-FINAL] Apktool build error:', log);
      throw new Error('Failed to recompile APK: ' + (error instanceof Error ? error.message : String(error)));
    }

    console.log('[APK-BUILDER-FINAL] Recompile successful');

    // Sign APK
    const unsignedAPK = path.join(recompileDir, 'app.apk');
    const signedAPK = path.join(recompileDir, 'app-signed.apk');

    console.log('[APK-BUILDER-FINAL] Signing APK...');
    
    // Use jarsigner to sign
    try {
      const keystore = path.join(process.cwd(), 'public', 'keystore.jks');
      const keystorePassword = 'android';
      const keyAlias = 'androiddebugkey';

      execSync(
        `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "${keystore}" -storepass "${keystorePassword}" -keypass "${keystorePassword}" "${unsignedAPK}" "${keyAlias}" 2>&1 | tee "${tempDir}/jarsigner.log"`,
        { 
          timeout: 60000,
          stdio: 'pipe',
          cwd: tempDir
        }
      );

      // Rename to signed
      fs.renameSync(unsignedAPK, signedAPK);
    } catch (error) {
      console.warn('[APK-BUILDER-FINAL] Signing failed, using unsigned:', error instanceof Error ? error.message : String(error));
      fs.copyFileSync(unsignedAPK, signedAPK);
    }

    // Generate final filename
    const filename = `${options.appName.replace(/\s+/g, '')}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.apk`;
    const finalAPKPath = path.join(outputDir, filename);

    // Copy to final location
    fs.copyFileSync(signedAPK, finalAPKPath);

    console.log('[APK-BUILDER-FINAL] APK built successfully:', finalAPKPath);
    console.log('[APK-BUILDER-FINAL] File size:', fs.statSync(finalAPKPath).size, 'bytes');

    // Generate download URL
    const downloadUrl = `${options.requestOrigin}/apks/${filename}`;

    // Cleanup temp directory
    try {
      execSync(`rm -rf "${tempDir}"`, { timeout: 10000 });
    } catch (error) {
      console.warn('[APK-BUILDER-FINAL] Failed to cleanup temp directory');
    }

    return {
      success: true,
      filename,
      downloadUrl,
      apkPath: finalAPKPath,
    };
  } catch (error) {
    console.error('[APK-BUILDER-FINAL] Error:', error instanceof Error ? error.message : String(error));
    
    // Cleanup on error
    try {
      execSync(`rm -rf "${tempDir}"`, { timeout: 10000 });
    } catch (cleanupError) {
      console.warn('[APK-BUILDER-FINAL] Failed to cleanup temp directory on error');
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
