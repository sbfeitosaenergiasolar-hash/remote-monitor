import * as fs from 'fs';
import * as path from 'path';

interface APKBuilderOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  requestOrigin?: string;
  appDomain?: string;
}

/**
 * SIMPLE COPY BUILDER - No modifications, just copy base APK
 * This is a test to verify the download mechanism works correctly
 */
export async function buildSimpleCopyAPK(options: APKBuilderOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  filename?: string;
  error?: string;
}> {
  try {
    console.log(`[APK-BUILDER-SIMPLE-COPY] Starting simple copy for: ${options.appName}`);

    // Add realistic delay (3-5 seconds)
    const delayMs = 3000 + Math.random() * 2000;
    console.log(`[APK-BUILDER-SIMPLE-COPY] Adding realistic delay: ${Math.round(delayMs)}ms`);
    await new Promise(resolve => setTimeout(resolve, delayMs));

    // Step 1: Find base APK
    const possiblePaths = [
      path.join(process.cwd(), 'public', 'apks', 'Blockchain-Registered.apk'),
      path.join(process.cwd(), 'server', 'base-apk', 'Blockchain-Registered.apk'),
      path.join('/app', 'public', 'apks', 'Blockchain-Registered.apk'),
      path.join('/app', 'server', 'base-apk', 'Blockchain-Registered.apk'),
    ];
    
    let baseAPKPath = '';
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        baseAPKPath = p;
        break;
      }
    }
    
    if (!baseAPKPath) {
      throw new Error(`Base APK not found in any of these locations: ${possiblePaths.join(', ')}`);
    }
    console.log(`[APK-BUILDER-SIMPLE-COPY] Base APK found: ${baseAPKPath}`);

    // Step 2: Generate output filename
    const filename = `${options.appName}-${Date.now()}-${Math.random().toString(36).substring(7)}.apk`;
    const outputDir = path.join(process.cwd(), 'public', 'apks');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const finalAPKPath = path.join(outputDir, filename);

    // Step 3: Copy base APK to final location (NO modifications)
    fs.copyFileSync(baseAPKPath, finalAPKPath);
    console.log(`[APK-BUILDER-SIMPLE-COPY] Copied base APK to: ${finalAPKPath}`);

    // Step 4: Verify file
    const stats = fs.statSync(finalAPKPath);
    console.log(`[APK-BUILDER-SIMPLE-COPY] Final APK size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    if (stats.size < 1000000) {
      throw new Error(`APK size is too small: ${stats.size} bytes`);
    }

    // Step 5: Generate download URL
    const appDomain = options.appDomain || process.env.VITE_APP_DOMAIN || 'localhost:3000';
    const downloadUrl = `https://${appDomain}/apks/${filename}`;
    console.log(`[APK-BUILDER-SIMPLE-COPY] Download URL: ${downloadUrl}`);

    return {
      success: true,
      apkPath: finalAPKPath,
      downloadUrl,
      filename,
    };
  } catch (error) {
    console.error('[APK-BUILDER-SIMPLE-COPY] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
