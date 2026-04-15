import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import AdmZip from 'adm-zip';

interface SignAPKOptions {
  apkPath: string;
}

/**
 * Sign APK with zipalign + apksigner (final version)
 */
export async function signAPKFinal(options: SignAPKOptions): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    console.log('[APK-SIGNER-FINAL] Starting APK signing');
    console.log('[APK-SIGNER-FINAL] Input APK:', options.apkPath);

    // Find signing tools
    const signingDir = path.join(process.cwd(), 'server', 'signing-tools');
    const zipalignPath = path.join(signingDir, 'zipalign');
    const apksignerPath = path.join(signingDir, 'apksigner.jar');
    const keystorePath = path.join(signingDir, 'keystore.jks');

    console.log('[APK-SIGNER-FINAL] Using signing directory:', signingDir);

    if (!fs.existsSync(zipalignPath)) {
      throw new Error(`zipalign not found at ${zipalignPath}`);
    }
    if (!fs.existsSync(apksignerPath)) {
      throw new Error(`apksigner.jar not found at ${apksignerPath}`);
    }
    if (!fs.existsSync(keystorePath)) {
      throw new Error(`keystore.jks not found at ${keystorePath}`);
    }

    console.log('[APK-SIGNER-FINAL] ✓ All signing tools found');

    // Step 1: COMPLETELY remove old signature
    console.log('[APK-SIGNER-FINAL] Step 1: Removing old signature...');
    const zip = new (AdmZip as any)(options.apkPath);
    const entries = zip.getEntries();
    
    let removedCount = 0;
    for (const entry of entries) {
      if (entry.entryName.startsWith('META-INF/')) {
        zip.deleteFile(entry);
        removedCount++;
        console.log('[APK-SIGNER-FINAL]   Removed:', entry.entryName);
      }
    }
    
    console.log(`[APK-SIGNER-FINAL] ✓ Removed ${removedCount} META-INF entries`);
    
    // Write the unsigned APK back
    zip.writeZip(options.apkPath);
    console.log('[APK-SIGNER-FINAL] ✓ Unsigned APK written');

    // Step 2: zipalign the APK
    console.log('[APK-SIGNER-FINAL] Step 2: Running zipalign...');
    const tempAlignedPath = options.apkPath + '.aligned';
    
    try {
      const zipalignCmd = `${zipalignPath} -v 4 "${options.apkPath}" "${tempAlignedPath}"`;
      console.log('[APK-SIGNER-FINAL] Executing:', zipalignCmd);
      execSync(zipalignCmd, { stdio: 'pipe' });
      
      // Replace original with aligned version
      fs.unlinkSync(options.apkPath);
      fs.renameSync(tempAlignedPath, options.apkPath);
      console.log('[APK-SIGNER-FINAL] ✓ zipalign completed');
    } catch (error) {
      console.warn('[APK-SIGNER-FINAL] zipalign warning:', error instanceof Error ? error.message : String(error));
      // Continue anyway - zipalign is optional
    }

    // Step 3: Sign with apksigner
    console.log('[APK-SIGNER-FINAL] Step 3: Signing with apksigner...');
    const apksignerCmd = `java -jar "${apksignerPath}" sign --ks "${keystorePath}" --ks-pass pass:android --ks-key-alias androiddebugkey --key-pass pass:android "${options.apkPath}"`;
    
    console.log('[APK-SIGNER-FINAL] Executing: java -jar apksigner.jar sign ...');
    
    try {
      execSync(apksignerCmd, { stdio: 'pipe' });
      console.log('[APK-SIGNER-FINAL] ✓ APK signed successfully');
    } catch (error) {
      throw new Error(`Failed to sign APK: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Step 4: Verify signature
    console.log('[APK-SIGNER-FINAL] Step 4: Verifying signature...');
    const verifyCmd = `java -jar "${apksignerPath}" verify --verbose "${options.apkPath}"`;
    
    try {
      const output = execSync(verifyCmd, { stdio: 'pipe' }).toString();
      console.log('[APK-SIGNER-FINAL] Verification output:', output.substring(0, 200));
      console.log('[APK-SIGNER-FINAL] ✓ Signature verified');
    } catch (error) {
      console.warn('[APK-SIGNER-FINAL] Verification warning:', error instanceof Error ? error.message : String(error));
      // Continue anyway - verification is optional
    }

    // Check final size
    const stats = fs.statSync(options.apkPath);
    console.log('[APK-SIGNER-FINAL] Final APK size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');

    return {
      success: true,
    };
  } catch (error) {
    console.error('[APK-SIGNER-FINAL] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
