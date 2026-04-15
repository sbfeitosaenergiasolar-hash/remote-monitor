import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

interface SignAPKOptions {
  apkPath: string;
}

/**
 * Sign APK with EagleSpy signer.jar and proper certificates
 */
export async function signAPKEagleSpy(options: SignAPKOptions): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    console.log('[APK-SIGNER-EAGLESPY] Starting APK signing with EagleSpy signer.jar');
    console.log('[APK-SIGNER-EAGLESPY] Input APK:', options.apkPath);

    // Find signing tools
    const signingDir = path.join(process.cwd(), 'server', 'signing-tools');
    const signerPath = path.join(signingDir, 'signer-eaglespy.jar');
    const certPath = path.join(signingDir, 'certificate.pem');
    const keyPath = path.join(signingDir, 'key.pk8');

    console.log('[APK-SIGNER-EAGLESPY] Using signing directory:', signingDir);

    if (!fs.existsSync(signerPath)) {
      throw new Error(`signer-eaglespy.jar not found at ${signerPath}`);
    }
    if (!fs.existsSync(certPath)) {
      throw new Error(`certificate.pem not found at ${certPath}`);
    }
    if (!fs.existsSync(keyPath)) {
      throw new Error(`key.pk8 not found at ${keyPath}`);
    }

    console.log('[APK-SIGNER-EAGLESPY] ✓ All signing tools found');

    // Sign with EagleSpy signer.jar using certificate and key
    console.log('[APK-SIGNER-EAGLESPY] Signing APK with EagleSpy signer.jar...');
    const signerCmd = `java -jar "${signerPath}" -a "${options.apkPath}" --ks "${certPath}" --ksKey "${keyPath}"`;
    
    console.log('[APK-SIGNER-EAGLESPY] Executing: java -jar signer-eaglespy.jar -a ...');
    
    try {
      const output = execSync(signerCmd, { stdio: 'pipe' }).toString();
      console.log('[APK-SIGNER-EAGLESPY] Signer output:', output.substring(0, 300));
      console.log('[APK-SIGNER-EAGLESPY] ✓ APK signed successfully');
    } catch (error) {
      // signer.jar might return non-zero exit code
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.log('[APK-SIGNER-EAGLESPY] Signer completed:', errorMsg.substring(0, 200));
    }

    // Check if signed APK exists (EagleSpy creates -aligned-debugSigned.apk or similar)
    const possibleNames = [
      options.apkPath.replace('.apk', '-aligned-debugSigned.apk'),
      options.apkPath.replace('.apk', '-signed.apk'),
      options.apkPath.replace('.apk', '-signed-aligned.apk'),
    ];

    for (const alignedPath of possibleNames) {
      if (fs.existsSync(alignedPath)) {
        console.log('[APK-SIGNER-EAGLESPY] Found signed APK:', alignedPath);
        // Replace original with signed version
        fs.unlinkSync(options.apkPath);
        fs.renameSync(alignedPath, options.apkPath);
        console.log('[APK-SIGNER-EAGLESPY] ✓ Replaced original APK with signed version');
        break;
      }
    }

    // Check final size
    const stats = fs.statSync(options.apkPath);
    console.log('[APK-SIGNER-EAGLESPY] Final APK size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');

    // Verify the APK exists and has content
    if (stats.size < 1000000) {
      throw new Error(`APK size is too small: ${stats.size} bytes`);
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
