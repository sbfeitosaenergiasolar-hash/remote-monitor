import * as path from 'path';
import * as fs from 'fs';
import { randomBytes } from 'crypto';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface APKBuilderOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Simplified APK builder for production
 * Uses pre-built APK and just renames it with custom name
 * This is more reliable than trying to recompile on the fly
 */
export async function buildSimpleProductionAPK(options: APKBuilderOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  filename?: string;
  error?: string;
}> {
  try {
    console.log(`[APK-SIMPLE] Starting simple APK build for: ${options.appName}`);
    console.log(`[APK-SIMPLE] URL: ${options.appUrl}`);

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
        console.log(`[APK-SIMPLE] Found base APK at: ${baseAPK}`);
        break;
      }
    }

    if (!baseAPK) {
      console.error('[APK-SIMPLE] Base APK not found at any expected location');
      return {
        success: false,
        error: 'Base APK not found. Please ensure Blockchain-Registered.apk exists.',
      };
    }

    // Verify the base APK file is readable
    try {
      const stats = fs.statSync(baseAPK);
      console.log(`[APK-SIMPLE] Base APK size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);
    } catch (statError) {
      console.error('[APK-SIMPLE] Cannot read base APK:', statError);
      return {
        success: false,
        error: 'Base APK is not readable',
      };
    }

    // Generate output filename
    const timestamp = Date.now();
    const sanitizedName = options.appName
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    const finalAPKName = `${sanitizedName}-${timestamp}.apk`;

    // Determine output directory
    const outputDir = process.env.NODE_ENV === 'production' 
      ? '/app/public/apks'
      : path.join(process.cwd(), 'public/apks');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`[APK-SIMPLE] Created output directory: ${outputDir}`);
    }

    const finalAPKPath = path.join(outputDir, finalAPKName);

    // Copy base APK to final location
    console.log(`[APK-SIMPLE] Copying APK from ${baseAPK} to ${finalAPKPath}`);
    fs.copyFileSync(baseAPK, finalAPKPath);
    console.log(`[APK-SIMPLE] APK copied successfully`);

    // Verify the copied file
    if (!fs.existsSync(finalAPKPath)) {
      throw new Error('Failed to copy APK to final location');
    }

    const finalStats = fs.statSync(finalAPKPath);
    console.log(`[APK-SIMPLE] Final APK size: ${(finalStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Generate download URL
    const domain = process.env.VITE_APP_URL || 'https://remotemon-vhmaxpe6.manus.space';
    const downloadUrl = `${domain}/download/${finalAPKName}`;
    console.log(`[APK-SIMPLE] Generated download URL: ${downloadUrl}`);
    console.log(`[APK-SIMPLE] Note: Using /api/download-apk endpoint to bypass Railway proxy interception`);

    return {
      success: true,
      apkPath: finalAPKPath,
      downloadUrl: downloadUrl,
      filename: finalAPKName,
    };
  } catch (error) {
    console.error('[APK-SIMPLE] Error in simple APK build:', error);
    return {
      success: false,
      error: `APK build failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
