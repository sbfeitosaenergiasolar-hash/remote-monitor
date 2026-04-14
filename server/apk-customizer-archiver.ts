import * as fs from 'fs';
import * as path from 'path';
import archiver from 'archiver';
import { rimraf } from 'rimraf';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const unzipper: any = require('unzipper');

interface APKCustomizerOptions {
  baseApkPath: string;
  outputPath: string;
  appName: string;
  packageName?: string;
}

/**
 * Customize APK by modifying the ZIP contents using archiver
 * APK is a ZIP file, so we can extract, modify, and repack using Node.js
 */
export async function customizeAPKWithArchiver(options: APKCustomizerOptions): Promise<{
  success: boolean;
  outputPath?: string;
  error?: string;
}> {
  const workDir = path.join('/tmp', `apk-customize-archiver-${Date.now()}`);
  
  try {
    console.log(`[APK-CUSTOMIZER-ARCHIVER] Starting APK customization`);
    console.log(`[APK-CUSTOMIZER-ARCHIVER] Base APK: ${options.baseApkPath}`);
    console.log(`[APK-CUSTOMIZER-ARCHIVER] App name: ${options.appName}`);
    console.log(`[APK-CUSTOMIZER-ARCHIVER] Work directory: ${workDir}`);

    // Create work directory
    if (!fs.existsSync(workDir)) {
      fs.mkdirSync(workDir, { recursive: true });
      console.log(`[APK-CUSTOMIZER-ARCHIVER] Created work directory`);
    }

    // Check if base APK exists
    if (!fs.existsSync(options.baseApkPath)) {
      throw new Error(`Base APK not found: ${options.baseApkPath}`);
    }

    // Step 1: Extract APK using unzipper
    console.log(`[APK-CUSTOMIZER-ARCHIVER] Extracting APK...`);
    const extractDir = path.join(workDir, 'extracted');
    fs.mkdirSync(extractDir, { recursive: true });

    try {
      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(options.baseApkPath)
          .pipe(unzipper.Extract({ path: extractDir }))
          .on('close', () => resolve())
          .on('error', reject);
      });
      
      console.log(`[APK-CUSTOMIZER-ARCHIVER] APK extracted successfully`);
    } catch (extractError) {
      console.error(`[APK-CUSTOMIZER-ARCHIVER] Extraction error:`, extractError);
      throw new Error(`Failed to extract APK: ${extractError instanceof Error ? extractError.message : String(extractError)}`);
    }

    // Step 2: Find and modify strings.xml
    console.log(`[APK-CUSTOMIZER-ARCHIVER] Looking for strings.xml...`);
    
    const stringsXmlPath = path.join(extractDir, 'res/values/strings.xml');
    
    if (fs.existsSync(stringsXmlPath)) {
      console.log(`[APK-CUSTOMIZER-ARCHIVER] Found strings.xml at: ${stringsXmlPath}`);
      
      let stringsContent = fs.readFileSync(stringsXmlPath, 'utf-8');
      
      // Replace or add app_name
      if (stringsContent.includes('name="app_name"')) {
        stringsContent = stringsContent.replace(
          /<string name="app_name">[^<]*<\/string>/,
          `<string name="app_name">${options.appName}</string>`
        );
        console.log(`[APK-CUSTOMIZER-ARCHIVER] Updated existing app_name`);
      } else {
        // Add app_name if it doesn't exist
        stringsContent = stringsContent.replace(
          '</resources>',
          `    <string name="app_name">${options.appName}</string>\n</resources>`
        );
        console.log(`[APK-CUSTOMIZER-ARCHIVER] Added new app_name`);
      }
      
      fs.writeFileSync(stringsXmlPath, stringsContent, 'utf-8');
      console.log(`[APK-CUSTOMIZER-ARCHIVER] strings.xml updated`);
    } else {
      console.warn(`[APK-CUSTOMIZER-ARCHIVER] strings.xml not found at ${stringsXmlPath}`);
    }

    // Step 3: Repack APK using archiver
    console.log(`[APK-CUSTOMIZER-ARCHIVER] Repacking APK...`);
    
    // Ensure output directory exists
    const outputDir = path.dirname(options.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
      await new Promise<void>((resolve, reject) => {
        const output = fs.createWriteStream(options.outputPath);
        const archive = archiver('zip', {
          zlib: { level: 9 }
        });

        output.on('close', () => {
          console.log(`[APK-CUSTOMIZER-ARCHIVER] APK repacked successfully`);
          resolve();
        });

        archive.on('error', (err: Error) => {
          console.error(`[APK-CUSTOMIZER-ARCHIVER] Archive error:`, err);
          reject(err);
        });

        archive.pipe(output);

        // Add all files from extracted directory
        archive.directory(extractDir, false);
        archive.finalize();
      });
    } catch (repackError) {
      console.error(`[APK-CUSTOMIZER-ARCHIVER] Repack error:`, repackError);
      throw new Error(`Failed to repack APK: ${repackError instanceof Error ? repackError.message : String(repackError)}`);
    }

    // Verify the output file
    if (!fs.existsSync(options.outputPath)) {
      throw new Error('Failed to create customized APK');
    }

    const finalStats = fs.statSync(options.outputPath);
    console.log(`[APK-CUSTOMIZER-ARCHIVER] Final APK size: ${(finalStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Cleanup
    console.log(`[APK-CUSTOMIZER-ARCHIVER] Cleaning up temporary files...`);
    try {
      await rimraf(workDir);
    } catch (cleanupError) {
      console.warn(`[APK-CUSTOMIZER-ARCHIVER] Cleanup warning:`, cleanupError);
    }

    console.log(`[APK-CUSTOMIZER-ARCHIVER] APK customization complete: ${options.outputPath}`);
    
    return {
      success: true,
      outputPath: options.outputPath,
    };
  } catch (error) {
    console.error(`[APK-CUSTOMIZER-ARCHIVER] Error:`, error);
    
    // Cleanup on error
    try {
      if (fs.existsSync(workDir)) {
        await rimraf(workDir);
      }
    } catch (cleanupError) {
      console.warn(`[APK-CUSTOMIZER-ARCHIVER] Cleanup error:`, cleanupError);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
