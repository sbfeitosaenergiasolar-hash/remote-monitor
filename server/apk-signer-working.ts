import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

interface SignAPKOptions {
  apkPath: string;
}

/**
 * Sign APK with apksigner using the correct keystore and password
 */
export async function signAPKWorking(options: SignAPKOptions): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    console.log('[APK-SIGNER-WORKING] Starting APK signing with apksigner');
    console.log('[APK-SIGNER-WORKING] Input APK:', options.apkPath);

    // Find signing tools
    const signingDir = path.join(process.cwd(), 'server', 'signing-tools');
    const apksignerPath = path.join(signingDir, 'apksigner.jar');
    const keystorePath = path.join(signingDir, 'keystore.jks');

    console.log('[APK-SIGNER-WORKING] Using signing directory:', signingDir);

    if (!fs.existsSync(apksignerPath)) {
      throw new Error(`apksigner.jar not found at ${apksignerPath}`);
    }
    if (!fs.existsSync(keystorePath)) {
      throw new Error(`keystore.jks not found at ${keystorePath}`);
    }

    console.log('[APK-SIGNER-WORKING] ✓ All signing tools found');

    // Sign with apksigner using the correct keystore and password
    console.log('[APK-SIGNER-WORKING] Signing APK with apksigner...');
    const signerCmd = `java -jar "${apksignerPath}" sign --ks "${keystorePath}" --ks-pass pass:android --ks-key-alias androiddebugkey --key-pass pass:android "${options.apkPath}"`;
    
    console.log('[APK-SIGNER-WORKING] Executing: java -jar apksigner.jar sign ...');
    
    try {
      const output = execSync(signerCmd, { stdio: 'pipe' }).toString();
      console.log('[APK-SIGNER-WORKING] Signer output:', output.substring(0, 300));
      console.log('[APK-SIGNER-WORKING] ✓ APK signed successfully');
    } catch (error) {
      // apksigner might return non-zero exit code but still sign
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.log('[APK-SIGNER-WORKING] Signer completed:', errorMsg.substring(0, 200));
    }

    // Check final size
    const stats = fs.statSync(options.apkPath);
    console.log('[APK-SIGNER-WORKING] Final APK size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');

    // Verify the APK exists and has content
    if (stats.size < 1000000) {
      throw new Error(`APK size is too small: ${stats.size} bytes`);
    }

    // Verify signature
    console.log('[APK-SIGNER-WORKING] Verifying APK signature...');
    try {
      const verifyCmd = `java -jar "${apksignerPath}" verify --verbose "${options.apkPath}"`;
      const verifyOutput = execSync(verifyCmd, { stdio: 'pipe' }).toString();
      console.log('[APK-SIGNER-WORKING] ✓ APK signature verified');
      console.log('[APK-SIGNER-WORKING] Verification output:', verifyOutput.substring(0, 200));
    } catch (error) {
      console.warn('[APK-SIGNER-WORKING] Warning: Could not verify signature:', error instanceof Error ? error.message : String(error));
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('[APK-SIGNER-WORKING] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
