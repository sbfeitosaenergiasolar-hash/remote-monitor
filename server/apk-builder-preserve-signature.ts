import * as path from 'path';
import * as fs from 'fs';
import { customizeAPKPreserveSignature } from './apk-customizer-preserve-signature';

interface APKBuilderOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  requestOrigin?: string;
  appDomain?: string;
}

/**
 * Build customized APK while PRESERVING the original signature
 * 
 * This is the CORRECT approach that works:
 * 1. Modify only resources.arsc and icon files
 * 2. Keep original signature (META-INF) intact
 * 3. No re-signing needed - APK remains valid for installation
 */
export async function buildCustomizedAPKPreserveSignature(options: APKBuilderOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  filename?: string;
  error?: string;
}> {
  try {
    console.log(`[APK-BUILDER-PRESERVE] Starting customized APK build for: ${options.appName}`);
    console.log(`[APK-BUILDER-PRESERVE] URL: ${options.appUrl}`);

    // Find base APK
    const baseAPKDir = path.join(process.cwd(), 'public', 'apks');
    const baseAPK = path.join(baseAPKDir, 'Blockchain-Registered.apk');

    if (!fs.existsSync(baseAPK)) {
      throw new Error(`Base APK not found at ${baseAPK}`);
    }

    console.log(`[APK-BUILDER-PRESERVE] Found base APK at: ${baseAPK}`);

    // Get base APK size
    const baseStats = fs.statSync(baseAPK);
    console.log(`[APK-BUILDER-PRESERVE] Base APK size: ${(baseStats.size / 1024 / 1024).toFixed(2)}MB`);

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
    console.log(`[APK-BUILDER-PRESERVE] Final APK path: ${finalAPKPath}`);

    // Customize the APK with new app name and icons (PRESERVING SIGNATURE)
    console.log(`[APK-BUILDER-PRESERVE] Customizing APK with app name: ${options.appName}`);
    try {
      const customizedApkPath = await customizeAPKPreserveSignature({
        apkPath: baseAPK,
        appName: options.appName,
        outputPath: finalAPKPath,
        logoUrl: options.logoUrl,
      });
      console.log(`[APK-BUILDER-PRESERVE] ✓ APK customization completed: ${customizedApkPath}`);
    } catch (customizeError) {
      console.error('[APK-BUILDER-PRESERVE] Customization failed:', customizeError);
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
    console.log(`[APK-BUILDER-PRESERVE] Customized APK size: ${(customizedStats.size / 1024 / 1024).toFixed(2)}MB`);

    // NO RE-SIGNING NEEDED - Original signature is preserved and valid!
    console.log(`[APK-BUILDER-PRESERVE] ✓ APK is ready for installation (signature preserved)`);

    // Generate download URL with full domain
    const appDomain = process.env.VITE_APP_DOMAIN || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'https';
    const downloadUrl = `${protocol}://${appDomain}/download/${finalAPKName}`;
    console.log(`[APK-BUILDER-PRESERVE] Generated absolute download URL: ${downloadUrl}`);

    console.log(`[APK-BUILDER-PRESERVE] ✓ APK build completed successfully`);

    return {
      success: true,
      apkPath: finalAPKPath,
      filename: finalAPKName,
      downloadUrl: downloadUrl,
    };
  } catch (error) {
    console.error('[APK-BUILDER-PRESERVE] APK Build Error:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
