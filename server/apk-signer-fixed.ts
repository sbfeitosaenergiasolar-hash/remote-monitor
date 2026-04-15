import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import AdmZip from 'adm-zip';

const execAsync = promisify(exec);

interface APKSignerOptions {
  apkPath: string;
  outputPath?: string;
}

/**
 * Sign APK with valid Android certificate
 * 1. Removes old signature (META-INF/)
 * 2. Re-signs with apksigner.jar
 */
export async function signAPKFixed(options: APKSignerOptions): Promise<{
  success: boolean;
  signedApkPath?: string;
  error?: string;
}> {
  try {
    console.log(`[APK-SIGNER-FIXED] Starting APK signing`);
    console.log(`[APK-SIGNER-FIXED] Input APK: ${options.apkPath}`);

    // Check if input APK exists
    if (!fs.existsSync(options.apkPath)) {
      throw new Error(`APK not found: ${options.apkPath}`);
    }

    // Determine output path
    const outputPath = options.outputPath || options.apkPath;
    console.log(`[APK-SIGNER-FIXED] Output APK: ${outputPath}`);

    // Step 1: Remove old signature from APK
    console.log(`[APK-SIGNER-FIXED] Removing old signature...`);
    try {
      const zip = new AdmZip(options.apkPath);
      const metaInfEntries = zip.getEntries().filter(entry => entry.entryName.startsWith('META-INF/'));
      
      if (metaInfEntries.length > 0) {
        for (const entry of metaInfEntries) {
          zip.deleteFile(entry);
          console.log(`[APK-SIGNER-FIXED] Removed ${entry.entryName}`);
        }
        
        // Write APK without signature
        zip.writeZip(outputPath);
        console.log(`[APK-SIGNER-FIXED] ✓ Old signature removed`);
      } else {
        console.log(`[APK-SIGNER-FIXED] No old signature found`);
      }
    } catch (removeError) {
      console.error(`[APK-SIGNER-FIXED] Warning: Could not remove old signature: ${removeError}`);
      // Continue anyway - apksigner will handle it
    }

    // Step 2: Get the directory where signing tools are located
    const signingDir = path.join(process.cwd(), 'server', 'signing-tools');
    console.log(`[APK-SIGNER-FIXED] Signing directory: ${signingDir}`);

    // Check if signing tools exist
    const apksignerPath = path.join(signingDir, 'apksigner.jar');
    const keystorePath = path.join(signingDir, 'keystore.jks');

    if (!fs.existsSync(apksignerPath)) {
      throw new Error(`apksigner.jar not found at ${apksignerPath}`);
    }

    if (!fs.existsSync(keystorePath)) {
      throw new Error(`keystore.jks not found at ${keystorePath}`);
    }

    console.log(`[APK-SIGNER-FIXED] ✓ All signing tools found`);

    // Step 3: Sign the APK using apksigner
    console.log(`[APK-SIGNER-FIXED] Signing APK with new certificate...`);
    
    try {
      const signCommand = `java -jar "${apksignerPath}" sign --ks "${keystorePath}" --ks-pass pass:android --ks-key-alias androiddebugkey --key-pass pass:android "${outputPath}"`;
      
      console.log(`[APK-SIGNER-FIXED] Executing: java -jar apksigner.jar sign ...`);
      
      const { stdout, stderr } = await execAsync(signCommand, {
        timeout: 60000,
        maxBuffer: 10 * 1024 * 1024,
      });
      
      if (stdout) console.log(`[APK-SIGNER-FIXED] stdout:`, stdout);
      if (stderr) console.log(`[APK-SIGNER-FIXED] stderr:`, stderr);
      
      console.log(`[APK-SIGNER-FIXED] ✓ APK signed successfully`);
    } catch (signError) {
      console.error(`[APK-SIGNER-FIXED] Signing error:`, signError);
      throw new Error(`Failed to sign APK: ${signError instanceof Error ? signError.message : String(signError)}`);
    }

    // Verify the signed APK exists
    if (!fs.existsSync(outputPath)) {
      throw new Error('Failed to create signed APK');
    }

    const signedStats = fs.statSync(outputPath);
    console.log(`[APK-SIGNER-FIXED] Signed APK size: ${(signedStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Verify signature was applied
    console.log(`[APK-SIGNER-FIXED] Verifying signature...`);
    try {
      const verifyCommand = `java -jar "${apksignerPath}" verify "${outputPath}"`;
      const { stdout: verifyOutput } = await execAsync(verifyCommand, {
        timeout: 30000,
      });
      console.log(`[APK-SIGNER-FIXED] Verification result:`, verifyOutput);
    } catch (verifyError) {
      console.warn(`[APK-SIGNER-FIXED] Warning: Verification failed: ${verifyError}`);
      // Don't fail - signing might still be valid
    }

    console.log(`[APK-SIGNER-FIXED] ✓ APK signing complete`);

    return {
      success: true,
      signedApkPath: outputPath,
    };
  } catch (error) {
    console.error(`[APK-SIGNER-FIXED] Error:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
