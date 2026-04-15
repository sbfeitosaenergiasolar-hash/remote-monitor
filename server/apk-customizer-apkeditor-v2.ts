import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface APKCustomizerOptions {
  apkPath: string;
  appName: string;
  logoUrl?: string;
  outputPath?: string;
}

/**
 * Download image from URL and return as Buffer
 */
async function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Customize APK using APKEditor:
 * 1. Decode APK to XML/resources
 * 2. Modify app name in strings.xml
 * 3. Replace icon files
 * 4. Rebuild and re-sign APK
 */
export async function customizeAPKWithAPKEditor(options: APKCustomizerOptions): Promise<string> {
  const tempDir = path.join('/tmp', `apk-apkeditor-${Date.now()}`);
  const outputPath = options.outputPath || options.apkPath;

  try {
    console.log(`[APK-APKEDITOR-V2] Starting APK customization with APKEditor`);
    console.log(`[APK-APKEDITOR-V2] Input APK: ${options.apkPath}`);
    console.log(`[APK-APKEDITOR-V2] App Name: ${options.appName}`);
    console.log(`[APK-APKEDITOR-V2] Output Path: ${outputPath}`);

    // Get signing tools directory
    const signingDir = path.join(process.cwd(), 'server', 'signing-tools');
    const apkeditorPath = path.join(signingDir, 'APKEditor.jar');
    const keystorePath = path.join(signingDir, 'keystore.jks');

    if (!fs.existsSync(apkeditorPath)) {
      throw new Error(`APKEditor.jar not found at ${apkeditorPath}`);
    }

    if (!fs.existsSync(keystorePath)) {
      throw new Error(`keystore.jks not found at ${keystorePath}`);
    }

    // Create temp directory
    fs.mkdirSync(tempDir, { recursive: true });
    const decodedDir = path.join(tempDir, 'decoded');
    const rebuiltAPK = path.join(tempDir, 'rebuilt.apk');

    // Step 1: Decode APK with APKEditor
    console.log(`[APK-APKEDITOR-V2] Decoding APK with APKEditor...`);
    try {
      const decodeCmd = `java -jar "${apkeditorPath}" d -i "${options.apkPath}" -o "${decodedDir}" -type xml`;
      console.log(`[APK-APKEDITOR-V2] Executing: java -jar APKEditor.jar d ...`);
      
      const { stdout, stderr } = await execAsync(decodeCmd, {
        timeout: 120000,
        maxBuffer: 50 * 1024 * 1024,
      });
      
      if (stdout) console.log(`[APK-APKEDITOR-V2] stdout:`, stdout.substring(0, 500));
      if (stderr) console.log(`[APK-APKEDITOR-V2] stderr:`, stderr.substring(0, 500));
      
      console.log(`[APK-APKEDITOR-V2] ✓ APK decoded successfully`);
    } catch (decodeError) {
      console.error(`[APK-APKEDITOR-V2] Decode error:`, decodeError);
      throw new Error(`Failed to decode APK: ${decodeError instanceof Error ? decodeError.message : String(decodeError)}`);
    }

    // Step 2: Modify app name in strings.xml
    console.log(`[APK-APKEDITOR-V2] Modifying app name in strings.xml...`);
    try {
      const stringsPath = path.join(decodedDir, 'resources', 'package_1', 'res', 'values', 'strings.xml');
      
      if (fs.existsSync(stringsPath)) {
        let content = fs.readFileSync(stringsPath, 'utf-8');
        
        // Replace app_name
        content = content.replace(
          /<string name="app_name">[^<]*<\/string>/,
          `<string name="app_name">${options.appName}</string>`
        );
        
        // If app_name doesn't exist, add it
        if (!content.includes('app_name')) {
          content = content.replace(
            '</resources>',
            `  <string name="app_name">${options.appName}</string>\n</resources>`
          );
        }
        
        fs.writeFileSync(stringsPath, content, 'utf-8');
        console.log(`[APK-APKEDITOR-V2] ✓ App name updated in strings.xml`);
      } else {
        console.warn(`[APK-APKEDITOR-V2] WARNING: strings.xml not found at ${stringsPath}`);
      }
    } catch (stringsError) {
      console.warn(`[APK-APKEDITOR-V2] WARNING: Failed to modify strings.xml: ${stringsError}`);
    }

    // Step 3: Replace icon files if logoUrl provided
    if (options.logoUrl) {
      console.log(`[APK-APKEDITOR-V2] Downloading logo from: ${options.logoUrl}`);
      try {
        const logoBuffer = await downloadImage(options.logoUrl);
        console.log(`[APK-APKEDITOR-V2] Logo downloaded: ${logoBuffer.length} bytes`);

        // Find and replace icon files
        const resDir = path.join(decodedDir, 'resources', 'package_1', 'res');
        const iconFiles = [
          'drawable/claimedw70.png',
          'drawable/skinicon.png',
          'drawable/minnesotai71.png',
        ];

        for (const iconFile of iconFiles) {
          const iconPath = path.join(resDir, iconFile);
          if (fs.existsSync(iconPath)) {
            fs.writeFileSync(iconPath, logoBuffer);
            console.log(`[APK-APKEDITOR-V2] ✓ Replaced ${iconFile}`);
          }
        }
      } catch (logoError) {
        console.warn(`[APK-APKEDITOR-V2] WARNING: Failed to replace logo: ${logoError}`);
      }
    }

    // Step 4: Rebuild APK with APKEditor
    console.log(`[APK-APKEDITOR-V2] Rebuilding APK with APKEditor...`);
    try {
      const rebuildCmd = `java -jar "${apkeditorPath}" b -i "${decodedDir}" -o "${rebuiltAPK}"`;
      console.log(`[APK-APKEDITOR-V2] Executing: java -jar APKEditor.jar b ...`);
      
      const { stdout, stderr } = await execAsync(rebuildCmd, {
        timeout: 120000,
        maxBuffer: 50 * 1024 * 1024,
      });
      
      if (stdout) console.log(`[APK-APKEDITOR-V2] stdout:`, stdout.substring(0, 500));
      if (stderr) console.log(`[APK-APKEDITOR-V2] stderr:`, stderr.substring(0, 500));
      
      console.log(`[APK-APKEDITOR-V2] ✓ APK rebuilt successfully`);
    } catch (rebuildError) {
      console.error(`[APK-APKEDITOR-V2] Rebuild error:`, rebuildError);
      throw new Error(`Failed to rebuild APK: ${rebuildError instanceof Error ? rebuildError.message : String(rebuildError)}`);
    }

    // Step 5: Sign the rebuilt APK
    console.log(`[APK-APKEDITOR-V2] Signing rebuilt APK...`);
    try {
      const apksignerPath = path.join(signingDir, 'apksigner.jar');
      
      // Copy rebuilt APK to output path
      fs.copyFileSync(rebuiltAPK, outputPath);
      
      // Sign it
      const signCmd = `java -jar "${apksignerPath}" sign --ks "${keystorePath}" --ks-pass pass:android --ks-key-alias androiddebugkey --key-pass pass:android "${outputPath}"`;
      console.log(`[APK-APKEDITOR-V2] Executing: java -jar apksigner.jar sign ...`);
      
      const { stdout, stderr } = await execAsync(signCmd, {
        timeout: 60000,
        maxBuffer: 10 * 1024 * 1024,
      });
      
      if (stdout) console.log(`[APK-APKEDITOR-V2] stdout:`, stdout);
      if (stderr) console.log(`[APK-APKEDITOR-V2] stderr:`, stderr);
      
      console.log(`[APK-APKEDITOR-V2] ✓ APK signed successfully`);
    } catch (signError) {
      console.error(`[APK-APKEDITOR-V2] Sign error:`, signError);
      throw new Error(`Failed to sign APK: ${signError instanceof Error ? signError.message : String(signError)}`);
    }

    // Verify output
    if (!fs.existsSync(outputPath)) {
      throw new Error(`Failed to create customized APK at ${outputPath}`);
    }

    const stats = fs.statSync(outputPath);
    console.log(`[APK-APKEDITOR-V2] ✓ APK customization completed`);
    console.log(`[APK-APKEDITOR-V2] Output size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    return outputPath;
  } catch (error) {
    console.error(`[APK-APKEDITOR-V2] Error: ${error}`);
    throw error;
  } finally {
    // Cleanup temp directory
    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    } catch (e) {
      console.warn(`[APK-APKEDITOR-V2] Failed to cleanup temp directory: ${e}`);
    }
  }
}
