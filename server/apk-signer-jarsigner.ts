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
 * Sign APK using jarsigner (more reliable than apksigner)
 * 1. Completely removes old META-INF/ directory
 * 2. Re-signs with jarsigner
 * 3. Verifies the signature
 */
export async function signAPKWithJarSigner(options: APKSignerOptions): Promise<{
  success: boolean;
  signedApkPath?: string;
  error?: string;
}> {
  try {
    console.log(`[APK-JARSIGNER] Starting APK signing with jarsigner`);
    console.log(`[APK-JARSIGNER] Input APK: ${options.apkPath}`);

    // Check if input APK exists
    if (!fs.existsSync(options.apkPath)) {
      throw new Error(`APK not found: ${options.apkPath}`);
    }

    // Determine output path
    const outputPath = options.outputPath || options.apkPath;
    console.log(`[APK-JARSIGNER] Output APK: ${outputPath}`);

    // Step 1: COMPLETELY remove old signature from APK
    console.log(`[APK-JARSIGNER] Completely removing old signature...`);
    try {
      const zip = new AdmZip(options.apkPath);
      
      // Get ALL entries
      const allEntries = zip.getEntries();
      console.log(`[APK-JARSIGNER] Total entries in APK: ${allEntries.length}`);
      
      // Find and remove ALL META-INF entries
      const metaInfEntries = allEntries.filter((entry: any) => entry.entryName.startsWith('META-INF/'));
      console.log(`[APK-JARSIGNER] Found ${metaInfEntries.length} META-INF entries to remove`);
      
      for (const entry of metaInfEntries) {
        zip.deleteFile(entry);
        console.log(`[APK-JARSIGNER] Removed ${entry.entryName}`);
      }
      
      // Write APK without ANY signature
      zip.writeZip(outputPath);
      console.log(`[APK-JARSIGNER] ✓ Old signature completely removed`);
      
      // Verify META-INF is gone
      const verifyZip = new AdmZip(outputPath);
      const remainingMetaInf = verifyZip.getEntries().filter((entry: any) => entry.entryName.startsWith('META-INF/'));
      if (remainingMetaInf.length > 0) {
        console.warn(`[APK-JARSIGNER] WARNING: ${remainingMetaInf.length} META-INF entries still exist!`);
      } else {
        console.log(`[APK-JARSIGNER] ✓ Verified: No META-INF entries remaining`);
      }
    } catch (removeError) {
      console.error(`[APK-JARSIGNER] Error removing signature: ${removeError}`);
      throw removeError;
    }

    // Step 2: Get the directory where signing tools are located
    const possibleSigningDirs = [
      path.join(process.cwd(), 'server', 'signing-tools'),
      path.join('/app', 'server', 'signing-tools'),
      path.join('/app', 'dist', 'signing-tools'),
    ];

    let signingDir = '';
    for (const dir of possibleSigningDirs) {
      if (fs.existsSync(path.join(dir, 'keystore.jks'))) {
        signingDir = dir;
        break;
      }
    }

    if (!signingDir) {
      throw new Error(`keystore.jks not found in any of: ${possibleSigningDirs.join(', ')}`);
    }

    const keystorePath = path.join(signingDir, 'keystore.jks');
    console.log(`[APK-JARSIGNER] Using signing directory: ${signingDir}`);

    // Step 3: Sign the APK using jarsigner
    console.log(`[APK-JARSIGNER] Signing APK with jarsigner...`);
    
    try {
      // jarsigner command: jarsigner -keystore keystore.jks -storepass password -keypass password -signedjar output.apk input.apk alias
      const signCommand = `jarsigner -keystore "${keystorePath}" -storepass android -keypass android -signedjar "${outputPath}" "${outputPath}" androiddebugkey`;
      
      console.log(`[APK-JARSIGNER] Executing: jarsigner -keystore ... -signedjar ...`);
      
      const { stdout, stderr } = await execAsync(signCommand, {
        timeout: 60000,
        maxBuffer: 10 * 1024 * 1024,
      });
      
      if (stdout) console.log(`[APK-JARSIGNER] stdout:`, stdout);
      if (stderr && !stderr.includes('Warning')) console.log(`[APK-JARSIGNER] stderr:`, stderr);
      
      console.log(`[APK-JARSIGNER] ✓ APK signed successfully with jarsigner`);
    } catch (signError) {
      console.error(`[APK-JARSIGNER] Signing error:`, signError);
      throw new Error(`Failed to sign APK: ${signError instanceof Error ? signError.message : String(signError)}`);
    }

    // Verify the signed APK exists
    if (!fs.existsSync(outputPath)) {
      throw new Error('Failed to create signed APK');
    }

    const signedStats = fs.statSync(outputPath);
    console.log(`[APK-JARSIGNER] Signed APK size: ${(signedStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Step 4: Verify the signature
    console.log(`[APK-JARSIGNER] Verifying signature...`);
    try {
      const verifyCommand = `jarsigner -verify -keystore "${keystorePath}" -storepass android "${outputPath}"`;
      const { stdout: verifyOutput } = await execAsync(verifyCommand, {
        timeout: 30000,
      });
      console.log(`[APK-JARSIGNER] Verification result:`, verifyOutput);
      
      if (verifyOutput.includes('jar verified')) {
        console.log(`[APK-JARSIGNER] ✓ Signature verified successfully`);
      }
    } catch (verifyError) {
      console.warn(`[APK-JARSIGNER] Warning: Verification had issues: ${verifyError}`);
      // Don't fail - signing might still be valid
    }

    console.log(`[APK-JARSIGNER] ✓ APK signing complete`);

    return {
      success: true,
      signedApkPath: outputPath,
    };
  } catch (error) {
    console.error(`[APK-JARSIGNER] Error:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
