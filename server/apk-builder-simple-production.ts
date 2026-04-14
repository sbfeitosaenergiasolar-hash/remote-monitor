import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { storagePut } from './storage';

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

    // Generate output filename with timestamp and random suffix to ensure uniqueness
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8); // 6 random chars
    const sanitizedName = options.appName
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    const finalAPKName = `${sanitizedName}-${timestamp}-${randomSuffix}.apk`;
    console.log(`[APK-SIMPLE] Generated filename: ${finalAPKName}`);

    // Determine output directory - use consistent path
    // In production, this will be /app/public/apks (from Dockerfile WORKDIR)
    // In development, this will be ./public/apks (from cwd)
    const outputDir = path.join(process.cwd(), 'public', 'apks');
    console.log(`[APK-SIMPLE] Output directory: ${outputDir}`);
    console.log(`[APK-SIMPLE] NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`[APK-SIMPLE] process.cwd(): ${process.cwd()}`);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      try {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`[APK-SIMPLE] Created output directory: ${outputDir}`);
      } catch (mkdirError) {
        console.error(`[APK-SIMPLE] Failed to create directory: ${outputDir}`, mkdirError);
        throw mkdirError;
      }
    }

    const finalAPKPath = path.join(outputDir, finalAPKName);
    console.log(`[APK-SIMPLE] Final APK path: ${finalAPKPath}`);

    // Copy base APK to final location
    console.log(`[APK-SIMPLE] Copying APK from ${baseAPK} to ${finalAPKPath}`);
    try {
      fs.copyFileSync(baseAPK, finalAPKPath);
      console.log(`[APK-SIMPLE] APK copied successfully`);
    } catch (copyError) {
      console.error(`[APK-SIMPLE] Failed to copy APK:`, copyError);
      throw copyError;
    }

    // Verify the copied file
    if (!fs.existsSync(finalAPKPath)) {
      throw new Error('Failed to copy APK to final location');
    }

    const finalStats = fs.statSync(finalAPKPath);
    console.log(`[APK-SIMPLE] Final APK size: ${(finalStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Upload APK to S3 for reliable production access
    console.log(`[APK-SIMPLE] Uploading APK to S3...`);
    try {
      const fileBuffer = fs.readFileSync(finalAPKPath);
      console.log(`[APK-SIMPLE] File buffer size: ${fileBuffer.length} bytes`);
      
      const s3Key = `apks/${finalAPKName}`;
      console.log(`[APK-SIMPLE] S3 key: ${s3Key}`);
      
      const result = await storagePut(s3Key, fileBuffer, 'application/vnd.android.package-archive');
      console.log(`[APK-SIMPLE] S3 upload successful:`, result);
      
      return {
        success: true,
        apkPath: finalAPKPath,
        downloadUrl: result.url,
        filename: finalAPKName
      };
    } catch (s3Error) {
      console.error('[APK-SIMPLE] S3 upload failed:', s3Error);
      console.error('[APK-SIMPLE] Error details:', {
        message: s3Error instanceof Error ? s3Error.message : String(s3Error),
        stack: s3Error instanceof Error ? s3Error.stack : undefined,
      });
      
      // Fallback: return local URL if S3 fails (for development)
      if (process.env.NODE_ENV !== 'production') {
        const domain = process.env.VITE_APP_URL || 'http://localhost:3000';
        const downloadUrl = `${domain}/apks/${finalAPKName}`;
        console.log(`[APK-SIMPLE] Falling back to local URL: ${downloadUrl}`);
        
        return {
          success: true,
          apkPath: finalAPKPath,
          downloadUrl: downloadUrl,
          filename: finalAPKName
        };
      }
      
      // In production, fail if S3 upload fails
      throw s3Error;
    }
  } catch (error) {
    console.error('[APK-SIMPLE] Error in simple APK build:', error);
    return {
      success: false,
      error: `APK build failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
