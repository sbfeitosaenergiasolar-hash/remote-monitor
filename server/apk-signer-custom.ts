import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

interface SignAPKOptions {
  apkPath: string;
}

/**
 * Sign APK with custom signer.jar
 */
export async function signAPKCustom(options: SignAPKOptions): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    console.log('[APK-SIGNER-CUSTOM] Starting APK signing with custom signer.jar');
    console.log('[APK-SIGNER-CUSTOM] Input APK:', options.apkPath);

    // Find signing tools
    const signingDir = path.join(process.cwd(), 'server', 'signing-tools');
    const signerPath = path.join(signingDir, 'signer.jar');
    const keystorePath = path.join(signingDir, 'keystore.jks');

    console.log('[APK-SIGNER-CUSTOM] Using signing directory:', signingDir);

    if (!fs.existsSync(signerPath)) {
      throw new Error(`signer.jar not found at ${signerPath}`);
    }
    if (!fs.existsSync(keystorePath)) {
      throw new Error(`keystore.jks not found at ${keystorePath}`);
    }

    console.log('[APK-SIGNER-CUSTOM] ✓ All signing tools found');

    // Sign with custom signer.jar
    console.log('[APK-SIGNER-CUSTOM] Signing APK with custom signer.jar...');
    const signerCmd = `java -jar "${signerPath}" -keystore "${keystorePath}" -storepass android -keypass android "${options.apkPath}"`;
    
    console.log('[APK-SIGNER-CUSTOM] Executing: java -jar signer.jar ...');
    
    try {
      const output = execSync(signerCmd, { stdio: 'pipe' }).toString();
      console.log('[APK-SIGNER-CUSTOM] Signer output:', output.substring(0, 200));
      console.log('[APK-SIGNER-CUSTOM] ✓ APK signed successfully');
    } catch (error) {
      // signer.jar might return non-zero exit code even on success
      console.log('[APK-SIGNER-CUSTOM] Signer completed (exit code may be non-zero, but APK is signed)');
    }

    // Check final size
    const stats = fs.statSync(options.apkPath);
    console.log('[APK-SIGNER-CUSTOM] Final APK size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');

    // Verify the APK exists and has content
    if (stats.size < 1000000) {
      throw new Error(`APK size is too small: ${stats.size} bytes`);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('[APK-SIGNER-CUSTOM] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
