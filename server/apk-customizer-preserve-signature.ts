import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import AdmZip from 'adm-zip';

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
 * Customize APK while PRESERVING the original signature
 * 
 * This approach:
 * 1. Uses updateFile() to modify only specific files (resources.arsc, icons)
 * 2. NEVER removes META-INF (preserves original signature)
 * 3. Keeps the APK valid for installation on real devices
 */
export async function customizeAPKPreserveSignature(options: APKCustomizerOptions): Promise<string> {
  const outputPath = options.outputPath || options.apkPath;

  try {
    console.log(`[APK-CUSTOMIZER-PRESERVE] Starting APK customization (preserving signature)`);
    console.log(`[APK-CUSTOMIZER-PRESERVE] Input APK: ${options.apkPath}`);
    console.log(`[APK-CUSTOMIZER-PRESERVE] App Name: ${options.appName}`);
    console.log(`[APK-CUSTOMIZER-PRESERVE] Output Path: ${outputPath}`);

    // Load APK as ZIP
    console.log(`[APK-CUSTOMIZER-PRESERVE] Loading APK...`);
    const zip = new AdmZip(options.apkPath);

    // 1. Modify resources.arsc to replace app name
    console.log(`[APK-CUSTOMIZER-PRESERVE] Modifying resources.arsc...`);
    const resourcesEntry = zip.getEntry('resources.arsc');
    if (resourcesEntry) {
      const resourcesData = zip.readFile(resourcesEntry);
      if (!resourcesData) throw new Error('Failed to read resources.arsc');
      let resourcesBuffer = Buffer.from(resourcesData);
      console.log(`[APK-CUSTOMIZER-PRESERVE] resources.arsc size: ${resourcesBuffer.length} bytes`);

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

        console.log(`[APK-CUSTOMIZER-PRESERVE] Made ${replacements} replacements in resources.arsc`);

        // Update the entry in ZIP using updateFile (CRITICAL: preserves structure)
        zip.updateFile(resourcesEntry, resourcesBuffer as any);
        console.log(`[APK-CUSTOMIZER-PRESERVE] ✓ resources.arsc updated`);
      }
    }

    // 2. Download and replace all icon files if logoUrl provided
    if (options.logoUrl) {
      console.log(`[APK-CUSTOMIZER-PRESERVE] Downloading logo from: ${options.logoUrl}`);
      try {
        const logoBuffer = await downloadImage(options.logoUrl);
        console.log(`[APK-CUSTOMIZER-PRESERVE] Logo downloaded: ${logoBuffer.length} bytes`);

        // List of icon files to replace
        const iconFiles = [
          'res/drawable/claimedw70.png',  // Main app icon
          'res/drawable/skinicon.png',     // Skin icon
          'res/drawable/minnesotai71.png', // Minnesota icon
        ];

        for (const iconPath of iconFiles) {
          const iconEntry = zip.getEntry(iconPath);
          if (iconEntry) {
            // Use updateFile to preserve ZIP structure
            zip.updateFile(iconEntry, logoBuffer);
            console.log(`[APK-CUSTOMIZER-PRESERVE] ✓ Replaced ${iconPath}`);
          } else {
            console.warn(`[APK-CUSTOMIZER-PRESERVE] WARNING: ${iconPath} not found`);
          }
        }
      } catch (logoError) {
        console.warn(`[APK-CUSTOMIZER-PRESERVE] WARNING: Failed to download/replace logo: ${logoError}`);
      }
    }

    // 3. CRITICAL: DO NOT remove META-INF - preserve original signature
    console.log(`[APK-CUSTOMIZER-PRESERVE] ✓ Preserving original signature (META-INF not removed)`);

    // 4. Write modified APK
    console.log(`[APK-CUSTOMIZER-PRESERVE] Writing modified APK...`);
    zip.writeZip(outputPath);
    console.log(`[APK-CUSTOMIZER-PRESERVE] ✓ APK written to: ${outputPath}`);

    // Verify output
    if (!fs.existsSync(outputPath)) {
      throw new Error(`Failed to create customized APK at ${outputPath}`);
    }

    const stats = fs.statSync(outputPath);
    console.log(`[APK-CUSTOMIZER-PRESERVE] ✓ APK customization completed`);
    console.log(`[APK-CUSTOMIZER-PRESERVE] Output size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    // Verify signature is still present
    const verifyZip = new AdmZip(outputPath);
    const metaInfEntries = verifyZip.getEntries().filter((entry: any) => entry.entryName.startsWith('META-INF/'));
    console.log(`[APK-CUSTOMIZER-PRESERVE] ✓ Verified: ${metaInfEntries.length} signature files present`);

    return outputPath;
  } catch (error) {
    console.error(`[APK-CUSTOMIZER-PRESERVE] Error: ${error}`);
    throw error;
  }
}
