import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { rimraf } from 'rimraf';

interface APKCustomizerOptions {
  baseApkPath: string;
  outputPath: string;
  appName: string;
  packageName?: string;
}

/**
 * Customize APK using apktool.jar for proper decompilation/recompilation
 * This ensures proper handling of binary resources and manifest
 */
export async function customizeAPKWithApktool(options: APKCustomizerOptions): Promise<{
  success: boolean;
  outputPath?: string;
  error?: string;
}> {
  const workDir = path.join('/tmp', `apk-customize-apktool-${Date.now()}`);
  const apktoolPath = path.join(__dirname, 'signing-tools', 'apktool.jar');
  
  try {
    console.log(`[APK-CUSTOMIZER-APKTOOL] Starting APK customization`);
    console.log(`[APK-CUSTOMIZER-APKTOOL] Base APK: ${options.baseApkPath}`);
    console.log(`[APK-CUSTOMIZER-APKTOOL] App name: ${options.appName}`);
    console.log(`[APK-CUSTOMIZER-APKTOOL] Work directory: ${workDir}`);

    // Create work directory
    if (!fs.existsSync(workDir)) {
      fs.mkdirSync(workDir, { recursive: true });
      console.log(`[APK-CUSTOMIZER-APKTOOL] Created work directory`);
    }

    // Check if base APK exists
    if (!fs.existsSync(options.baseApkPath)) {
      throw new Error(`Base APK not found: ${options.baseApkPath}`);
    }

    // Check if apktool exists
    if (!fs.existsSync(apktoolPath)) {
      throw new Error(`apktool.jar not found at ${apktoolPath}`);
    }

    // Step 1: Decompile APK using apktool
    console.log(`[APK-CUSTOMIZER-APKTOOL] Decompiling APK with apktool...`);
    const decompileDir = path.join(workDir, 'decompiled');
    
    try {
      const decompileCmd = `cd ${workDir} && java -jar ${apktoolPath} d -f -s -r ${options.baseApkPath} -o ${decompileDir}`;
      console.log(`[APK-CUSTOMIZER-APKTOOL] Running: ${decompileCmd}`);
      execSync(decompileCmd, { stdio: 'pipe', maxBuffer: 50 * 1024 * 1024 });
      console.log(`[APK-CUSTOMIZER-APKTOOL] APK decompiled successfully`);
    } catch (decompileError) {
      console.error(`[APK-CUSTOMIZER-APKTOOL] Decompile error:`, decompileError);
      throw new Error(`Failed to decompile APK: ${decompileError instanceof Error ? decompileError.message : String(decompileError)}`);
    }

    // Step 2: Modify AndroidManifest.xml to change app name
    console.log(`[APK-CUSTOMIZER-APKTOOL] Modifying AndroidManifest.xml...`);
    const manifestPath = path.join(decompileDir, 'AndroidManifest.xml');
    
    if (fs.existsSync(manifestPath)) {
      let manifestContent = fs.readFileSync(manifestPath, 'utf-8');
      
      // Try to find and replace the application label
      // Look for android:label="@string/app_name" or similar
      if (manifestContent.includes('android:label=')) {
        console.log(`[APK-CUSTOMIZER-APKTOOL] Found android:label in manifest`);
      }
      
      // Also modify the package name if provided
      if (options.packageName) {
        const oldPackage = manifestContent.match(/package="([^"]+)"/)?.[1];
        if (oldPackage) {
          manifestContent = manifestContent.replace(
            `package="${oldPackage}"`,
            `package="${options.packageName}"`
          );
          console.log(`[APK-CUSTOMIZER-APKTOOL] Changed package from ${oldPackage} to ${options.packageName}`);
        }
      }
      
      fs.writeFileSync(manifestPath, manifestContent, 'utf-8');
    }

    // Step 3: Modify strings.xml
    console.log(`[APK-CUSTOMIZER-APKTOOL] Looking for strings.xml...`);
    const stringsXmlPath = path.join(decompileDir, 'res/values/strings.xml');
    
    if (fs.existsSync(stringsXmlPath)) {
      console.log(`[APK-CUSTOMIZER-APKTOOL] Found strings.xml`);
      
      let stringsContent = fs.readFileSync(stringsXmlPath, 'utf-8');
      
      // Replace or add app_name
      if (stringsContent.includes('name="app_name"')) {
        stringsContent = stringsContent.replace(
          /<string name="app_name">[^<]*<\/string>/,
          `<string name="app_name">${options.appName}</string>`
        );
        console.log(`[APK-CUSTOMIZER-APKTOOL] Updated existing app_name`);
      } else {
        // Add app_name if it doesn't exist
        stringsContent = stringsContent.replace(
          '</resources>',
          `    <string name="app_name">${options.appName}</string>\n</resources>`
        );
        console.log(`[APK-CUSTOMIZER-APKTOOL] Added new app_name`);
      }
      
      fs.writeFileSync(stringsXmlPath, stringsContent, 'utf-8');
      console.log(`[APK-CUSTOMIZER-APKTOOL] strings.xml updated`);
    } else {
      console.warn(`[APK-CUSTOMIZER-APKTOOL] strings.xml not found at ${stringsXmlPath}`);
    }

    // Step 4: Recompile APK using apktool
    console.log(`[APK-CUSTOMIZER-APKTOOL] Recompiling APK with apktool...`);
    const recompiledApkPath = path.join(workDir, 'recompiled.apk');
    
    try {
      const recompileCmd = `cd ${workDir} && java -jar ${apktoolPath} b -f -d ${decompileDir} -o ${recompiledApkPath}`;
      console.log(`[APK-CUSTOMIZER-APKTOOL] Running: ${recompileCmd}`);
      execSync(recompileCmd, { stdio: 'pipe', maxBuffer: 50 * 1024 * 1024 });
      console.log(`[APK-CUSTOMIZER-APKTOOL] APK recompiled successfully`);
    } catch (recompileError) {
      console.error(`[APK-CUSTOMIZER-APKTOOL] Recompile error:`, recompileError);
      throw new Error(`Failed to recompile APK: ${recompileError instanceof Error ? recompileError.message : String(recompileError)}`);
    }

    // Step 5: Copy to final location
    console.log(`[APK-CUSTOMIZER-APKTOOL] Copying to final location...`);
    const outputDir = path.dirname(options.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.copyFileSync(recompiledApkPath, options.outputPath);
    console.log(`[APK-CUSTOMIZER-APKTOOL] APK copied to ${options.outputPath}`);

    // Verify the output file
    if (!fs.existsSync(options.outputPath)) {
      throw new Error('Failed to create customized APK');
    }

    const finalStats = fs.statSync(options.outputPath);
    console.log(`[APK-CUSTOMIZER-APKTOOL] Final APK size: ${(finalStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Cleanup
    console.log(`[APK-CUSTOMIZER-APKTOOL] Cleaning up temporary files...`);
    try {
      await rimraf(workDir);
    } catch (cleanupError) {
      console.warn(`[APK-CUSTOMIZER-APKTOOL] Cleanup warning:`, cleanupError);
    }

    console.log(`[APK-CUSTOMIZER-APKTOOL] APK customization complete: ${options.outputPath}`);
    
    return {
      success: true,
      outputPath: options.outputPath,
    };
  } catch (error) {
    console.error(`[APK-CUSTOMIZER-APKTOOL] Error:`, error);
    
    // Cleanup on error
    try {
      if (fs.existsSync(workDir)) {
        await rimraf(workDir);
      }
    } catch (cleanupError) {
      console.warn(`[APK-CUSTOMIZER-APKTOOL] Cleanup error:`, cleanupError);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
