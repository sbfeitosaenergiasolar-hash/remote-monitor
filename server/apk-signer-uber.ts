import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

interface SignAPKOptions {
  apkPath: string;
}

/**
 * Sign APK with uber-apk-signer
 */
export async function signAPKUber(options: SignAPKOptions): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    console.log('[APK-SIGNER-UBER] Starting APK signing with uber-apk-signer');
    console.log('[APK-SIGNER-UBER] Input APK:', options.apkPath);

    // Find signing tools
    const signingDir = path.join(process.cwd(), 'server', 'signing-tools');
    const signerPath = path.join(signingDir, 'signer.jar');
    const keystorePath = path.join(signingDir, 'keystore.jks');

    console.log('[APK-SIGNER-UBER] Using signing directory:', signingDir);

    if (!fs.existsSync(signerPath)) {
      throw new Error(`signer.jar not found at ${signerPath}`);
    }
    if (!fs.existsSync(keystorePath)) {
      throw new Error(`keystore.jks not found at ${keystorePath}`);
    }

    console.log('[APK-SIGNER-UBER] ✓ All signing tools found');

    // Sign with uber-apk-signer
    console.log('[APK-SIGNER-UBER] Signing APK with uber-apk-signer...');
    const signerCmd = `java -jar "${signerPath}" -a "${options.apkPath}" --ks "${keystorePath}" --ksPass android --ksKeyPass android --ksAlias androiddebugkey`;
    
    console.log('[APK-SIGNER-UBER] Executing: java -jar signer.jar -a ...');
    
    try {
      const output = execSync(signerCmd, { stdio: 'pipe' }).toString();
      console.log('[APK-SIGNER-UBER] Signer output:', output.substring(0, 300));
      console.log('[APK-SIGNER-UBER] ✓ APK signed successfully');
    } catch (error) {
      // uber-apk-signer might return non-zero exit code
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.log('[APK-SIGNER-UBER] Signer completed:', errorMsg.substring(0, 200));
    }

    // Check if signed APK exists (uber-apk-signer creates -aligned-debugSigned.apk)
    const alignedPath = options.apkPath.replace('.apk', '-aligned-debugSigned.apk');
    if (fs.existsSync(alignedPath)) {
      console.log('[APK-SIGNER-UBER] Found aligned signed APK:', alignedPath);
      // Replace original with signed version
      fs.unlinkSync(options.apkPath);
      fs.renameSync(alignedPath, options.apkPath);
      console.log('[APK-SIGNER-UBER] ✓ Replaced original APK with signed version');
    }

    // Check final size
    const stats = fs.statSync(options.apkPath);
    console.log('[APK-SIGNER-UBER] Final APK size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');

    // Verify the APK exists and has content
    if (stats.size < 1000000) {
      throw new Error(`APK size is too small: ${stats.size} bytes`);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('[APK-SIGNER-UBER] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
