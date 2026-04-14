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
}

/**
 * Customize APK by modifying the ZIP contents directly
 * APK is a ZIP file, so we can extract, modify, and repack without apktool
 */
export async function customizeAPKWithZip(options: APKCustomizerOptions): Promise<{
  success: boolean;
  outputPath?: string;
  error?: string;
}> {
  const workDir = path.join('/tmp', `apk-customize-zip-${Date.now()}`);
  
  try {
    console.log(`[APK-CUSTOMIZER-ZIP] Starting APK customization`);
    console.log(`[APK-CUSTOMIZER-ZIP] Base APK: ${options.baseApkPath}`);
    console.log(`[APK-CUSTOMIZER-ZIP] App name: ${options.appName}`);
    console.log(`[APK-CUSTOMIZER-ZIP] Work directory: ${workDir}`);

    // Create work directory
    if (!fs.existsSync(workDir)) {
      fs.mkdirSync(workDir, { recursive: true });
      console.log(`[APK-CUSTOMIZER-ZIP] Created work directory`);
    }

    // Check if base APK exists
    if (!fs.existsSync(options.baseApkPath)) {
      throw new Error(`Base APK not found: ${options.baseApkPath}`);
    }

    // Step 1: Extract APK (it's a ZIP file)
    console.log(`[APK-CUSTOMIZER-ZIP] Extracting APK...`);
    const extractDir = path.join(workDir, 'extracted');
    
    try {
      await execAsync(`cd "${workDir}" && unzip -q "${options.baseApkPath}" -d "${extractDir}"`, {
        timeout: 30000,
        maxBuffer: 10 * 1024 * 1024,
      });
      console.log(`[APK-CUSTOMIZER-ZIP] APK extracted successfully`);
    } catch (error) {
      console.error(`[APK-CUSTOMIZER-ZIP] Extract error:`, error);
      throw new Error(`Failed to extract APK: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Step 2: Find and modify strings.xml
    console.log(`[APK-CUSTOMIZER-ZIP] Looking for strings.xml...`);
    
    // strings.xml is usually in res/values/
    const stringsXmlPath = path.join(extractDir, 'res/values/strings.xml');
    
    if (fs.existsSync(stringsXmlPath)) {
      console.log(`[APK-CUSTOMIZER-ZIP] Found strings.xml at: ${stringsXmlPath}`);
      
      let stringsContent = fs.readFileSync(stringsXmlPath, 'utf-8');
      
      // Replace or add app_name
      if (stringsContent.includes('name="app_name"')) {
        stringsContent = stringsContent.replace(
          /<string name="app_name">[^<]*<\/string>/,
          `<string name="app_name">${options.appName}</string>`
        );
        console.log(`[APK-CUSTOMIZER-ZIP] Updated existing app_name`);
      } else {
        // Add app_name if it doesn't exist
        stringsContent = stringsContent.replace(
          '</resources>',
          `    <string name="app_name">${options.appName}</string>\n</resources>`
        );
        console.log(`[APK-CUSTOMIZER-ZIP] Added new app_name`);
      }
      
      fs.writeFileSync(stringsXmlPath, stringsContent, 'utf-8');
      console.log(`[APK-CUSTOMIZER-ZIP] strings.xml updated`);
    } else {
      console.warn(`[APK-CUSTOMIZER-ZIP] strings.xml not found at ${stringsXmlPath}`);
      // Try to find it in other locations
      const findResult = await execAsync(`find "${extractDir}" -name "strings.xml" 2>/dev/null || true`);
      console.log(`[APK-CUSTOMIZER-ZIP] Found strings.xml at:`, findResult.stdout);
    }

    // Step 3: Repack APK
    console.log(`[APK-CUSTOMIZER-ZIP] Repacking APK...`);
    
    // Ensure output directory exists
    const outputDir = path.dirname(options.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
      // Create new APK by zipping the extracted contents
      await execAsync(`cd "${extractDir}" && zip -r -q "${options.outputPath}" . -x "*.DS_Store"`, {
        timeout: 60000,
        maxBuffer: 10 * 1024 * 1024,
      });
      console.log(`[APK-CUSTOMIZER-ZIP] APK repacked successfully`);
    } catch (error) {
      console.error(`[APK-CUSTOMIZER-ZIP] Repack error:`, error);
      throw new Error(`Failed to repack APK: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Verify the output file
    if (!fs.existsSync(options.outputPath)) {
      throw new Error('Failed to create customized APK');
    }

    const finalStats = fs.statSync(options.outputPath);
    console.log(`[APK-CUSTOMIZER-ZIP] Final APK size: ${(finalStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Cleanup
    console.log(`[APK-CUSTOMIZER-ZIP] Cleaning up temporary files...`);
    try {
      await execAsync(`rm -rf "${workDir}"`);
    } catch (cleanupError) {
      console.warn(`[APK-CUSTOMIZER-ZIP] Cleanup warning:`, cleanupError);
    }

    console.log(`[APK-CUSTOMIZER-ZIP] APK customization complete: ${options.outputPath}`);
    
    return {
      success: true,
      outputPath: options.outputPath,
    };
  } catch (error) {
    console.error(`[APK-CUSTOMIZER-ZIP] Error:`, error);
    
    // Cleanup on error
    try {
      if (fs.existsSync(workDir)) {
        await execAsync(`rm -rf "${workDir}"`);
      }
    } catch (cleanupError) {
      console.warn(`[APK-CUSTOMIZER-ZIP] Cleanup error:`, cleanupError);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
