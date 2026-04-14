import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface APKSignerOptions {
  apkPath: string;
  outputPath?: string;
}

/**
 * Sign APK with valid Android certificate
 * Uses apksigner.jar to sign the APK with the official certificate
 */
export async function signAPK(options: APKSignerOptions): Promise<{
  success: boolean;
  signedApkPath?: string;
  error?: string;
}> {
  try {
    console.log(`[APK-SIGNER] Starting APK signing`);
    console.log(`[APK-SIGNER] Input APK: ${options.apkPath}`);

    // Check if input APK exists
    if (!fs.existsSync(options.apkPath)) {
      throw new Error(`APK not found: ${options.apkPath}`);
    }

    // Determine output path
    const outputPath = options.outputPath || options.apkPath;
    console.log(`[APK-SIGNER] Output APK: ${outputPath}`);

    // Get the directory where signing tools are located
    const signingDir = path.join(process.cwd(), 'server', 'signing');
    console.log(`[APK-SIGNER] Signing directory: ${signingDir}`);

    // Check if signing tools exist
    const apksignerPath = path.join(signingDir, 'apksigner.jar');
    const keyPath = path.join(signingDir, 'key.pk8');
    const certPath = path.join(signingDir, 'certificate.pem');

    if (!fs.existsSync(apksignerPath)) {
      throw new Error(`apksigner.jar not found at ${apksignerPath}`);
    }

    if (!fs.existsSync(keyPath)) {
      throw new Error(`key.pk8 not found at ${keyPath}`);
    }

    if (!fs.existsSync(certPath)) {
      throw new Error(`certificate.pem not found at ${certPath}`);
    }

    console.log(`[APK-SIGNER] ✓ All signing tools found`);

    // Create a temporary output file if signing in place
    const tempOutputPath = outputPath + '.unsigned';
    const finalOutputPath = outputPath;

    // If we're signing in place, use a temp file first
    if (options.outputPath === undefined) {
      fs.copyFileSync(options.apkPath, tempOutputPath);
      console.log(`[APK-SIGNER] Created temporary file: ${tempOutputPath}`);
    }

    // Sign the APK using apksigner
    console.log(`[APK-SIGNER] Signing APK...`);
    
    try {
      const signCommand = `java -jar "${apksignerPath}" sign --ks-key-alias "android" --ks-pass "pass:" --key "${keyPath}" --cert "${certPath}" --out "${finalOutputPath}" "${options.apkPath}"`;
      
      console.log(`[APK-SIGNER] Executing: java -jar apksigner.jar sign ...`);
      
      await execAsync(signCommand, {
        timeout: 60000,
        maxBuffer: 10 * 1024 * 1024,
      });
      
      console.log(`[APK-SIGNER] ✓ APK signed successfully`);
    } catch (signError) {
      console.error(`[APK-SIGNER] Signing error:`, signError);
      
      // Try alternative signing method if first one fails
      console.log(`[APK-SIGNER] Trying alternative signing method...`);
      
      try {
        // Some versions of apksigner use different syntax
        const altSignCommand = `java -jar "${apksignerPath}" sign --ks-pass pass: --key-pass pass: --key "${keyPath}" --cert "${certPath}" --out "${finalOutputPath}" "${options.apkPath}"`;
        
        await execAsync(altSignCommand, {
          timeout: 60000,
          maxBuffer: 10 * 1024 * 1024,
        });
        
        console.log(`[APK-SIGNER] ✓ APK signed successfully (alternative method)`);
      } catch (altError) {
        console.error(`[APK-SIGNER] Alternative signing also failed:`, altError);
        throw new Error(`Failed to sign APK: ${signError instanceof Error ? signError.message : String(signError)}`);
      }
    }

    // Verify the signed APK exists
    if (!fs.existsSync(finalOutputPath)) {
      throw new Error('Failed to create signed APK');
    }

    const signedStats = fs.statSync(finalOutputPath);
    console.log(`[APK-SIGNER] Signed APK size: ${(signedStats.size / 1024 / 1024).toFixed(2)}MB`);

    // Clean up temp file if it was created
    if (options.outputPath === undefined && fs.existsSync(tempOutputPath)) {
      try {
        fs.unlinkSync(tempOutputPath);
        console.log(`[APK-SIGNER] Cleaned up temporary file`);
      } catch (cleanupError) {
        console.warn(`[APK-SIGNER] Warning: Could not delete temp file:`, cleanupError);
      }
    }

    console.log(`[APK-SIGNER] ✓ APK signing complete`);

    return {
      success: true,
      signedApkPath: finalOutputPath,
    };
  } catch (error) {
    console.error(`[APK-SIGNER] Error:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
