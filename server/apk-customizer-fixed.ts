import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';
import https from 'https';

interface APKCustomizerOptions {
  apkPath: string;
  appName: string;
  logoUrl?: string;
  outputPath?: string;
}

/**
 * Download image from URL and return as Buffer
 */
async function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Customize APK by:
 * 1. Replacing app name in resources.arsc
 * 2. Replacing all icon files (claimedw70, skinicon, minnesotai71)
 * 3. Removing invalid signature (META-INF/)
 * 4. Preserving structure for re-signing
 */
export async function customizeAPKFixed(options: APKCustomizerOptions): Promise<string> {
  const outputPath = options.outputPath || options.apkPath;

  try {
    console.log(`[APK-CUSTOMIZER-FIXED] Starting APK customization`);
    console.log(`[APK-CUSTOMIZER-FIXED] Input APK: ${options.apkPath}`);
    console.log(`[APK-CUSTOMIZER-FIXED] App Name: ${options.appName}`);
    console.log(`[APK-CUSTOMIZER-FIXED] Output Path: ${outputPath}`);

    // Load APK as ZIP
    console.log(`[APK-CUSTOMIZER-FIXED] Loading APK...`);
    const zip = new AdmZip(options.apkPath);

    // 1. Modify resources.arsc to replace app name
    console.log(`[APK-CUSTOMIZER-FIXED] Modifying resources.arsc...`);
    const resourcesEntry = zip.getEntry('resources.arsc');
    if (resourcesEntry) {
      const resourcesData = zip.readFile(resourcesEntry);
      if (!resourcesData) throw new Error('Failed to read resources.arsc');
      let resourcesBuffer = Buffer.from(resourcesData);
      console.log(`[APK-CUSTOMIZER-FIXED] resources.arsc size: ${resourcesBuffer.length} bytes`);

      // Replace "Blockchain" with app name
      const blockchainBuffer = Buffer.from('Blockchain', 'utf-8');
      const appNameBuffer = Buffer.from(options.appName, 'utf-8');

      if (appNameBuffer.length <= blockchainBuffer.length) {
        // Pad app name with nulls if needed
        const paddedAppName = Buffer.alloc(blockchainBuffer.length);
        appNameBuffer.copy(paddedAppName);

        // Replace all occurrences
        let offset = 0;
        let replacements = 0;
        while ((offset = resourcesBuffer.indexOf(blockchainBuffer, offset)) !== -1) {
          paddedAppName.copy(resourcesBuffer, offset);
          offset += blockchainBuffer.length;
          replacements++;
        }

        console.log(`[APK-CUSTOMIZER-FIXED] Made ${replacements} replacements in resources.arsc`);

        // Update the entry in ZIP
        zip.updateFile(resourcesEntry, resourcesBuffer as any);
        console.log(`[APK-CUSTOMIZER-FIXED] ✓ resources.arsc updated`);
      }
    }

    // 2. Download and replace all icon files if logoUrl provided
    if (options.logoUrl) {
      console.log(`[APK-CUSTOMIZER-FIXED] Downloading logo from: ${options.logoUrl}`);
      try {
        const logoBuffer = await downloadImage(options.logoUrl);
        console.log(`[APK-CUSTOMIZER-FIXED] Logo downloaded: ${logoBuffer.length} bytes`);

        // List of icon files to replace
        const iconFiles = [
          'res/drawable/claimedw70.png',  // Main app icon
          'res/drawable/skinicon.png',     // Skin icon
          'res/drawable/minnesotai71.png', // Minnesota icon
        ];

        for (const iconPath of iconFiles) {
          const iconEntry = zip.getEntry(iconPath);
          if (iconEntry) {
            zip.updateFile(iconEntry, logoBuffer);
            console.log(`[APK-CUSTOMIZER-FIXED] ✓ Replaced ${iconPath}`);
          } else {
            console.warn(`[APK-CUSTOMIZER-FIXED] WARNING: ${iconPath} not found`);
          }
        }
      } catch (logoError) {
        console.warn(`[APK-CUSTOMIZER-FIXED] WARNING: Failed to download/replace logo: ${logoError}`);
      }
    }

    // 3. Remove invalid signature (META-INF/) so we can re-sign
    console.log(`[APK-CUSTOMIZER-FIXED] Removing invalid signature...`);
    const metaInfEntries = zip.getEntries().filter(entry => entry.entryName.startsWith('META-INF/'));
    for (const entry of metaInfEntries) {
      zip.deleteFile(entry);
      console.log(`[APK-CUSTOMIZER-FIXED] Removed ${entry.entryName}`);
    }
    console.log(`[APK-CUSTOMIZER-FIXED] ✓ Removed ${metaInfEntries.length} signature files`);

    // 4. Write modified APK
    console.log(`[APK-CUSTOMIZER-FIXED] Writing modified APK...`);
    zip.writeZip(outputPath);
    console.log(`[APK-CUSTOMIZER-FIXED] ✓ APK written to: ${outputPath}`);

    // Verify output
    if (!fs.existsSync(outputPath)) {
      throw new Error(`Failed to create customized APK at ${outputPath}`);
    }

    const stats = fs.statSync(outputPath);
    console.log(`[APK-CUSTOMIZER-FIXED] ✓ APK customization completed`);
    console.log(`[APK-CUSTOMIZER-FIXED] Output size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    return outputPath;
  } catch (error) {
    console.error(`[APK-CUSTOMIZER-FIXED] Error: ${error}`);
    throw error;
  }
}
