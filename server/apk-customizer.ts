import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface APKCustomizerOptions {
  baseApkPath: string;
  outputPath: string;
  appName: string;
  packageName?: string;
  logoUrl?: string;
}

/**
 * Customize APK with new app name and package name
 * Uses apktool to decompile, modify, and recompile
 */
export async function customizeAPK(options: APKCustomizerOptions): Promise<{
  success: boolean;
  outputPath?: string;
  error?: string;
}> {
  const workDir = path.join('/tmp', `apk-customize-${Date.now()}`);
  
  try {
    console.log(`[APK-CUSTOMIZER] Starting APK customization`);
    console.log(`[APK-CUSTOMIZER] Base APK: ${options.baseApkPath}`);
    console.log(`[APK-CUSTOMIZER] App name: ${options.appName}`);
    console.log(`[APK-CUSTOMIZER] Work directory: ${workDir}`);

    // Create work directory
    if (!fs.existsSync(workDir)) {
      fs.mkdirSync(workDir, { recursive: true });
      console.log(`[APK-CUSTOMIZER] Created work directory`);
    }

    // Check if base APK exists
    if (!fs.existsSync(options.baseApkPath)) {
      throw new Error(`Base APK not found: ${options.baseApkPath}`);
    }

    // Step 1: Decompile APK using apktool
    console.log(`[APK-CUSTOMIZER] Decompiling APK...`);
    const decompileDir = path.join(workDir, 'decompiled');
    
    try {
      await execAsync(`apktool d "${options.baseApkPath}" -o "${decompileDir}" -f`, {
        timeout: 60000,
        maxBuffer: 10 * 1024 * 1024,
      });
      console.log(`[APK-CUSTOMIZER] APK decompiled successfully`);
    } catch (error) {
      console.error(`[APK-CUSTOMIZER] Decompile error:`, error);
      throw new Error(`Failed to decompile APK: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Step 2: Modify AndroidManifest.xml
    console.log(`[APK-CUSTOMIZER] Modifying AndroidManifest.xml...`);
    const manifestPath = path.join(decompileDir, 'AndroidManifest.xml');
    
    if (!fs.existsSync(manifestPath)) {
      throw new Error('AndroidManifest.xml not found in decompiled APK');
    }

    let manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    
    // Generate new package name from app name
    const newPackageName = options.packageName || `com.example.${options.appName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    console.log(`[APK-CUSTOMIZER] New package name: ${newPackageName}`);

    // Replace package name in manifest
    // This is a simple replacement - in production you'd want XML parsing
    const oldPackageName = 'com.example.blockchain';
    manifestContent = manifestContent.replace(new RegExp(oldPackageName, 'g'), newPackageName);

    fs.writeFileSync(manifestPath, manifestContent, 'utf-8');
    console.log(`[APK-CUSTOMIZER] AndroidManifest.xml updated`);

    // Step 3: Modify app name in resources
    console.log(`[APK-CUSTOMIZER] Updating app name in resources...`);
    
    // Find and update strings.xml
    const stringsXmlPaths = [
      path.join(decompileDir, 'res/values/strings.xml'),
      path.join(decompileDir, 'res/values-en/strings.xml'),
    ];

    for (const stringsPath of stringsXmlPaths) {
      if (fs.existsSync(stringsPath)) {
        let stringsContent = fs.readFileSync(stringsPath, 'utf-8');
        
        // Replace app_name value
        stringsContent = stringsContent.replace(
          /<string name="app_name">[^<]*<\/string>/,
          `<string name="app_name">${options.appName}</string>`
        );
        
        // If app_name doesn't exist, add it
        if (!stringsContent.includes('name="app_name"')) {
          stringsContent = stringsContent.replace(
            '</resources>',
            `    <string name="app_name">${options.appName}</string>\n</resources>`
          );
        }

        fs.writeFileSync(stringsPath, stringsContent, 'utf-8');
        console.log(`[APK-CUSTOMIZER] Updated: ${stringsPath}`);
      }
    }

    // Step 4: Recompile APK
    console.log(`[APK-CUSTOMIZER] Recompiling APK...`);
    const recompiledApkPath = path.join(workDir, 'app-unsigned.apk');
    
    try {
      await execAsync(`apktool b "${decompileDir}" -o "${recompiledApkPath}" -f`, {
        timeout: 120000,
        maxBuffer: 10 * 1024 * 1024,
      });
      console.log(`[APK-CUSTOMIZER] APK recompiled successfully`);
    } catch (error) {
      console.error(`[APK-CUSTOMIZER] Recompile error:`, error);
      throw new Error(`Failed to recompile APK: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Step 5: Copy to output location
    console.log(`[APK-CUSTOMIZER] Copying to output location...`);
    
    // Ensure output directory exists
    const outputDir = path.dirname(options.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.copyFileSync(recompiledApkPath, options.outputPath);
    console.log(`[APK-CUSTOMIZER] APK customization complete: ${options.outputPath}`);

    // Cleanup
    console.log(`[APK-CUSTOMIZER] Cleaning up temporary files...`);
    try {
      await execAsync(`rm -rf "${workDir}"`);
    } catch (cleanupError) {
      console.warn(`[APK-CUSTOMIZER] Cleanup warning:`, cleanupError);
    }

    return {
      success: true,
      outputPath: options.outputPath,
    };
  } catch (error) {
    console.error(`[APK-CUSTOMIZER] Error:`, error);
    
    // Cleanup on error
    try {
      if (fs.existsSync(workDir)) {
        await execAsync(`rm -rf "${workDir}"`);
      }
    } catch (cleanupError) {
      console.warn(`[APK-CUSTOMIZER] Cleanup error:`, cleanupError);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
