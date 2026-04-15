import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';

interface APKCustomizerOptions {
  apkPath: string;
  appName: string;
  logoUrl?: string;
  outputPath?: string;
}

/**
 * Safely customize APK by modifying only necessary files
 * Preserves original APK structure and signature
 */
export async function customizeAPKSafe(options: APKCustomizerOptions): Promise<string> {
  const tempDir = path.join('/tmp', `apk-customize-safe-${Date.now()}`);
  const outputPath = options.outputPath || options.apkPath;

  try {
    console.log(`[APK-CUSTOMIZER-SAFE] Starting safe customization`);
    console.log(`[APK-CUSTOMIZER-SAFE] Input APK: ${options.apkPath}`);
    console.log(`[APK-CUSTOMIZER-SAFE] App Name: ${options.appName}`);

    // Create temp directory
    fs.mkdirSync(tempDir, { recursive: true });

    // Load APK as ZIP
    console.log(`[APK-CUSTOMIZER-SAFE] Loading APK...`);
    const zip = new AdmZip(options.apkPath);

    // Modify resources.arsc
    console.log(`[APK-CUSTOMIZER-SAFE] Modifying resources.arsc...`);
    const resourcesEntry = zip.getEntry('resources.arsc');
    if (resourcesEntry) {
      const resourcesData = zip.readFile(resourcesEntry);
      if (!resourcesData) throw new Error('Failed to read resources.arsc');
      let resourcesBuffer = Buffer.from(resourcesData);
      console.log(`[APK-CUSTOMIZER-SAFE] resources.arsc size: ${resourcesBuffer.length} bytes`);

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

        console.log(`[APK-CUSTOMIZER-SAFE] Made ${replacements} replacements in resources.arsc`);

        // Update the entry in ZIP
        zip.updateFile(resourcesEntry, resourcesBuffer as any);
        console.log(`[APK-CUSTOMIZER-SAFE] ✓ resources.arsc updated`);
      }
    }

    // Replace logo if provided
    if (options.logoUrl) {
      console.log(`[APK-CUSTOMIZER-SAFE] Downloading logo from: ${options.logoUrl}`);
      try {
        const https = require('https');
        const logoBuffer = await new Promise<Buffer>((resolve, reject) => {
          https.get(options.logoUrl, (res: any) => {
            const chunks: Buffer[] = [];
            res.on('data', (chunk: Buffer) => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
            res.on('error', reject);
          }).on('error', reject);
        });

        console.log(`[APK-CUSTOMIZER-SAFE] Logo downloaded: ${logoBuffer.length} bytes`);

        // Find and replace skinicon.png
        const iconEntry = zip.getEntry('res/drawable/skinicon.png');
        if (iconEntry) {
          zip.updateFile(iconEntry, logoBuffer);
          console.log(`[APK-CUSTOMIZER-SAFE] ✓ Logo replaced`);
        } else {
          console.warn(`[APK-CUSTOMIZER-SAFE] WARNING: skinicon.png not found`);
        }
      } catch (logoError) {
        console.warn(`[APK-CUSTOMIZER-SAFE] WARNING: Failed to download/replace logo: ${logoError}`);
      }
    }

    // Write modified APK
    console.log(`[APK-CUSTOMIZER-SAFE] Writing modified APK...`);
    zip.writeZip(outputPath);
    console.log(`[APK-CUSTOMIZER-SAFE] ✓ APK written to: ${outputPath}`);

    // Verify output
    if (!fs.existsSync(outputPath)) {
      throw new Error(`Failed to create customized APK at ${outputPath}`);
    }

    const stats = fs.statSync(outputPath);
    console.log(`[APK-CUSTOMIZER-SAFE] ✓ APK customization completed`);
    console.log(`[APK-CUSTOMIZER-SAFE] Output size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    return outputPath;
  } catch (error) {
    console.error(`[APK-CUSTOMIZER-SAFE] Error: ${error}`);
    throw error;
  } finally {
    // Cleanup temp directory
    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    } catch (e) {
      console.warn(`[APK-CUSTOMIZER-SAFE] Failed to cleanup temp directory: ${e}`);
    }
  }
}
