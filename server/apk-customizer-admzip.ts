import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';

interface APKCustomizerOptions {
  baseApkPath: string;
  outputPath: string;
  appName: string;
  packageName?: string;
}

/**
 * Customize APK by modifying the ZIP contents using adm-zip
 * APK is a ZIP file, so we can extract, modify, and repack using adm-zip
 */
export async function customizeAPKWithAdmZip(options: APKCustomizerOptions): Promise<{
  success: boolean;
  outputPath?: string;
  error?: string;
}> {
  try {
    console.log(`[APK-CUSTOMIZER-ADMZIP] Starting APK customization`);
    console.log(`[APK-CUSTOMIZER-ADMZIP] Base APK: ${options.baseApkPath}`);
    console.log(`[APK-CUSTOMIZER-ADMZIP] App name: ${options.appName}`);

    // Check if base APK exists
    if (!fs.existsSync(options.baseApkPath)) {
      throw new Error(`Base APK not found: ${options.baseApkPath}`);
    }

    // Step 1: Load APK as ZIP
    console.log(`[APK-CUSTOMIZER-ADMZIP] Loading APK...`);
    const zip = new AdmZip(options.baseApkPath);
    console.log(`[APK-CUSTOMIZER-ADMZIP] APK loaded successfully`);

    // Step 2: Find and modify strings.xml
    console.log(`[APK-CUSTOMIZER-ADMZIP] Looking for strings.xml...`);
    
    const stringsXmlEntry = zip.getEntry('res/values/strings.xml');
    
    if (stringsXmlEntry) {
      console.log(`[APK-CUSTOMIZER-ADMZIP] Found strings.xml`);
      
      let stringsContent = stringsXmlEntry.getData().toString('utf-8');
      
      // Replace or add app_name
      if (stringsContent.includes('name="app_name"')) {
        stringsContent = stringsContent.replace(
          /<string name="app_name">[^<]*<\/string>/,
          `<string name="app_name">${options.appName}</string>`
        );
        console.log(`[APK-CUSTOMIZER-ADMZIP] Updated existing app_name`);
      } else {
        // Add app_name if it doesn't exist
        stringsContent = stringsContent.replace(
          '</resources>',
          `    <string name="app_name">${options.appName}</string>\n</resources>`
        );
        console.log(`[APK-CUSTOMIZER-ADMZIP] Added new app_name`);
      }
      
      // Update the entry in the ZIP
      zip.updateFile(stringsXmlEntry, Buffer.from(stringsContent, 'utf-8'));
      console.log(`[APK-CUSTOMIZER-ADMZIP] strings.xml updated in ZIP`);
    } else {
      console.warn(`[APK-CUSTOMIZER-ADMZIP] strings.xml not found`);
    }

    // Step 3: Write the modified APK
    console.log(`[APK-CUSTOMIZER-ADMZIP] Writing modified APK...`);
    
    // Ensure output directory exists
    const outputDir = path.dirname(options.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the ZIP file
    zip.writeZip(options.outputPath);
    console.log(`[APK-CUSTOMIZER-ADMZIP] APK written successfully`);

    // Verify the output file
    if (!fs.existsSync(options.outputPath)) {
      throw new Error('Failed to create customized APK');
    }

    const finalStats = fs.statSync(options.outputPath);
    console.log(`[APK-CUSTOMIZER-ADMZIP] Final APK size: ${(finalStats.size / 1024 / 1024).toFixed(2)}MB`);

    console.log(`[APK-CUSTOMIZER-ADMZIP] APK customization complete: ${options.outputPath}`);
    
    return {
      success: true,
      outputPath: options.outputPath,
    };
  } catch (error) {
    console.error(`[APK-CUSTOMIZER-ADMZIP] Error:`, error);

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
