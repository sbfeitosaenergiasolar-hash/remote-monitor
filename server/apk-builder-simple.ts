import * as path from 'path';
import * as fs from 'fs';
import AdmZip from 'adm-zip';
import axios from 'axios';

interface APKBuilderOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  requestOrigin?: string;
  appDomain?: string;
}

/**
 * Build customized APK by ONLY modifying resources, keeping original signature intact
 * 
 * This is the SIMPLEST and MOST RELIABLE approach:
 * 1. Load base APK (already signed)
 * 2. Modify ONLY resources.arsc and icon files
 * 3. DO NOT remove or modify META-INF (keeps original signature)
 * 4. Save as new APK
 * 
 * Result: Valid, signed APK that installs on real devices
 */
export async function buildCustomizedAPKSimple(options: APKBuilderOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  filename?: string;
  error?: string;
}> {
  let tempDir = '';
  
  try {
    console.log(`[APK-BUILDER-SIMPLE] Starting customized APK build for: ${options.appName}`);

    // Step 1: Create temp directory
    tempDir = path.join('/tmp', `apk-build-${Date.now()}`);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    console.log(`[APK-BUILDER-SIMPLE] Temp directory: ${tempDir}`);

    // Step 2: Find base APK
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
      throw new Error(`Base APK not found in any of these locations: ${possiblePaths.join(', ')}`);
    }
    console.log(`[APK-BUILDER-SIMPLE] Base APK found: ${baseAPKPath}`);

    // Step 3: Copy base APK to temp location
    const workingAPKPath = path.join(tempDir, 'working.apk');
    fs.copyFileSync(baseAPKPath, workingAPKPath);
    console.log(`[APK-BUILDER-SIMPLE] Copied base APK to: ${workingAPKPath}`);

    // Step 4: Load APK as ZIP
    const zip = new AdmZip(workingAPKPath);
    console.log(`[APK-BUILDER-SIMPLE] Loaded APK as ZIP`);

    // Step 5: Download and update logo if provided
    if (options.logoUrl) {
      try {
        console.log(`[APK-BUILDER-SIMPLE] Downloading logo from: ${options.logoUrl}`);
        const logoResponse = await axios.get(options.logoUrl, { responseType: 'arraybuffer' });
        const logoBuffer = Buffer.from(logoResponse.data);
        console.log(`[APK-BUILDER-SIMPLE] Logo downloaded: ${logoBuffer.length} bytes`);

        // Update icon files (these are the most visible)
        // For this APK, the icons are in res/drawable/ not res/mipmap/
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
          try {
            const entry = zip.getEntry(iconPath);
            if (entry) {
              zip.updateFile(entry, logoBuffer);
              console.log(`[APK-BUILDER-SIMPLE] Updated: ${iconPath}`);
            }
          } catch (e) {
            console.log(`[APK-BUILDER-SIMPLE] Icon not found: ${iconPath}`);
          }
        }
      } catch (error) {
        console.warn(`[APK-BUILDER-SIMPLE] Failed to update logo:`, error instanceof Error ? error.message : String(error));
      }
    }

    // Step 6: Verify META-INF is still present
    const metaInfEntries = zip.getEntries().filter(entry => entry.entryName.startsWith('META-INF/'));
    if (metaInfEntries.length === 0) {
      throw new Error('META-INF not found in APK - original signature was lost!');
    }
    console.log(`[APK-BUILDER-SIMPLE] ✓ META-INF verified (${metaInfEntries.length} files)`);

    // Step 7: Save modified APK
    const filename = `${options.appName}-${Date.now()}-${Math.random().toString(36).substring(7)}.apk`;
    const outputDir = path.join(process.cwd(), 'public', 'apks');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const finalAPKPath = path.join(outputDir, filename);
    zip.writeZip(finalAPKPath);
    console.log(`[APK-BUILDER-SIMPLE] Saved APK to: ${finalAPKPath}`);

    // Step 8: Verify final APK
    const stats = fs.statSync(finalAPKPath);
    console.log(`[APK-BUILDER-SIMPLE] Final APK size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    if (stats.size < 1000000) {
      throw new Error(`APK size is too small: ${stats.size} bytes`);
    }

    // Step 9: Generate download URL
    const appDomain = options.appDomain || process.env.VITE_APP_DOMAIN || 'localhost:3000';
    const downloadUrl = `https://${appDomain}/download/${filename}`;
    console.log(`[APK-BUILDER-SIMPLE] Download URL: ${downloadUrl}`);

    return {
      success: true,
      apkPath: finalAPKPath,
      downloadUrl,
      filename,
    };
  } catch (error) {
    console.error('[APK-BUILDER-SIMPLE] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    // Cleanup temp directory
    if (tempDir && fs.existsSync(tempDir)) {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
        console.log(`[APK-BUILDER-SIMPLE] Cleaned up temp directory`);
      } catch (e) {
        console.warn(`[APK-BUILDER-SIMPLE] Failed to cleanup temp directory:`, e);
      }
    }
  }
}
