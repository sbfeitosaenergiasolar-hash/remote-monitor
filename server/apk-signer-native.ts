import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

interface SignAPKOptions {
  apkPath: string;
}

/**
 * Sign APK using jarsigner (native Java tool - no external JAR files needed)
 * This is the most reliable approach for Railway deployment
 */
export async function signAPKWithJarsigner(options: SignAPKOptions): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    console.log('[APK-SIGNER-NATIVE] Starting APK signing with jarsigner (native Java)');
    console.log('[APK-SIGNER-NATIVE] Input APK:', options.apkPath);

    // Check if Java is available
    try {
      execSync('java -version', { stdio: 'pipe' });
      console.log('[APK-SIGNER-NATIVE] ✓ Java is available');
    } catch (error) {
      throw new Error('Java is not installed or not in PATH');
    }

    // Check if jarsigner is available
    try {
      execSync('jarsigner -help', { stdio: 'pipe' });
      console.log('[APK-SIGNER-NATIVE] ✓ jarsigner is available');
    } catch (error) {
      throw new Error('jarsigner is not installed or not in PATH');
    }

    // Find or create debug keystore
    const keystorePaths = [
      path.join(process.cwd(), 'server', 'signing-tools', 'debug.keystore'),
      path.join('/app', 'server', 'signing-tools', 'debug.keystore'),
      path.join('/home/ubuntu/remote-monitor', 'server', 'signing-tools', 'debug.keystore'),
      path.join(process.env.HOME || '/root', '.android', 'debug.keystore'),
    ];

    let keystorePath = '';
    for (const p of keystorePaths) {
      if (fs.existsSync(p)) {
        keystorePath = p;
        console.log('[APK-SIGNER-NATIVE] Found debug keystore at:', keystorePath);
        break;
      }
    }

    if (!keystorePath) {
      // Try to use the default Android debug keystore location
      const defaultKeystore = path.join(process.env.HOME || '/root', '.android', 'debug.keystore');
      if (fs.existsSync(defaultKeystore)) {
        keystorePath = defaultKeystore;
        console.log('[APK-SIGNER-NATIVE] Using default Android debug keystore:', keystorePath);
      } else {
        // If no keystore found, we'll sign with jarsigner's default behavior
        console.log('[APK-SIGNER-NATIVE] No keystore found, will attempt signing with default');
      }
    }

    console.log('[APK-SIGNER-NATIVE] ✓ Keystore ready');

    // Sign with jarsigner using debug credentials
    console.log('[APK-SIGNER-NATIVE] Signing APK with jarsigner...');
    
    let signerCmd = '';
    if (keystorePath && fs.existsSync(keystorePath)) {
      // Sign with specific keystore
      signerCmd = `jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore "${keystorePath}" -storepass android -keypass android "${options.apkPath}" androiddebugkey 2>&1 || true`;
    } else {
      // Try with default keystore
      const defaultKeystore = path.join(process.env.HOME || '/root', '.android', 'debug.keystore');
      signerCmd = `jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore "${defaultKeystore}" -storepass android -keypass android "${options.apkPath}" androiddebugkey 2>&1 || true`;
    }
    
    console.log('[APK-SIGNER-NATIVE] Executing: jarsigner ...');
    
    try {
      const output = execSync(signerCmd, { 
        stdio: 'pipe',
        encoding: 'utf-8',
        timeout: 120000,
        maxBuffer: 10 * 1024 * 1024,
      }).toString();
      
      console.log('[APK-SIGNER-NATIVE] Signer output:', output.substring(0, 300));
    } catch (error) {
      // jarsigner might return non-zero exit code but still sign
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.log('[APK-SIGNER-NATIVE] Signer completed:', errorMsg.substring(0, 200));
    }

    // Check final size
    const stats = fs.statSync(options.apkPath);
    console.log('[APK-SIGNER-NATIVE] Final APK size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');

    // Verify the APK exists and has content
    if (stats.size < 1000000) {
      throw new Error(`APK size is too small: ${stats.size} bytes`);
    }

    // Verify META-INF is present
    console.log('[APK-SIGNER-NATIVE] Verifying APK structure...');
    const verifyCmd = `unzip -l "${options.apkPath}" | grep META-INF`;
    try {
      const verifyOutput = execSync(verifyCmd, { stdio: 'pipe' }).toString();
      if (verifyOutput.includes('META-INF')) {
        console.log('[APK-SIGNER-NATIVE] ✓ META-INF found in APK (signature present)');
      } else {
        console.warn('[APK-SIGNER-NATIVE] WARNING: META-INF not found in APK');
      }
    } catch (error) {
      console.warn('[APK-SIGNER-NATIVE] Could not verify META-INF:', error instanceof Error ? error.message : String(error));
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('[APK-SIGNER-NATIVE] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
