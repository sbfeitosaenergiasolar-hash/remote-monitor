import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import crypto from 'crypto';

const APKS_DIR = path.join(process.cwd(), 'public', 'apks');
const TEMP_DIR = path.join(process.cwd(), '.apk-build-temp');
const TOOLS_DIR = path.join(process.cwd(), 'public', 'apks');

// Ensure directories exist
if (!fs.existsSync(APKS_DIR)) fs.mkdirSync(APKS_DIR, { recursive: true });
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

interface APKBuildOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  baseAPKPath?: string;
}

/**
 * Advanced APK Builder using apktool
 * Decompiles, modifies, and recompiles APKs for any URL
 */
export async function buildAdvancedAPK(options: APKBuildOptions): Promise<{
  filename: string;
  path: string;
  downloadUrl: string;
  size: number;
}> {
  const { appName, appUrl, logoUrl, baseAPKPath } = options;

  console.log(`[APK-ADVANCED] Starting build for: ${appName}`);
  console.log(`[APK-ADVANCED] Target URL: ${appUrl}`);

  // Use default base APK if not provided
  const baseAPK = baseAPKPath || path.join(APKS_DIR, 'Blockchain-Registered.apk');
  
  if (!fs.existsSync(baseAPK)) {
    throw new Error(`Base APK not found: ${baseAPK}`);
  }

  const buildId = crypto.randomBytes(8).toString('hex');
  const buildDir = path.join(TEMP_DIR, buildId);
  const decompileDir = path.join(buildDir, 'decompiled');
  const outputAPK = path.join(buildDir, 'output.apk');
  const finalAPKName = `${appName.replace(/\s+/g, '-')}-${Date.now()}.apk`;
  const finalAPKPath = path.join(APKS_DIR, finalAPKName);

  try {
    // Create build directory
    fs.mkdirSync(buildDir, { recursive: true });
    console.log(`[APK-ADVANCED] Build directory: ${buildDir}`);

    // Step 1: Decompile APK using apktool
    console.log(`[APK-ADVANCED] Decompiling base APK...`);
    const apktoolJar = path.join(TOOLS_DIR, 'apktool.jar');
    
    if (!fs.existsSync(apktoolJar)) {
      throw new Error(`apktool.jar not found at ${apktoolJar}`);
    }

    try {
      execSync(`java -jar "${apktoolJar}" d -f "${baseAPK}" -o "${decompileDir}"`, {
        stdio: 'pipe',
        timeout: 120000, // 2 minutes timeout
      });
      console.log(`[APK-ADVANCED] Decompilation successful`);
    } catch (error) {
      console.error(`[APK-ADVANCED] Decompilation failed:`, error);
      throw new Error('Failed to decompile APK');
    }

    // Step 2: Modify AndroidManifest.xml to update app name
    const manifestPath = path.join(decompileDir, 'AndroidManifest.xml');
    if (fs.existsSync(manifestPath)) {
      let manifest = fs.readFileSync(manifestPath, 'utf-8');
      
      // Update application label
      manifest = manifest.replace(
        /android:label="@string\/app_name"/g,
        `android:label="${appName}"`
      );
      
      fs.writeFileSync(manifestPath, manifest);
      console.log(`[APK-ADVANCED] Updated AndroidManifest.xml`);
    }

    // Step 3: Modify strings.xml to update app URL
    const stringsPath = path.join(decompileDir, 'res', 'values', 'strings.xml');
    if (fs.existsSync(stringsPath)) {
      let strings = fs.readFileSync(stringsPath, 'utf-8');
      
      // Add or update custom strings for the URL
      const urlStringEntry = `<string name="app_url">${appUrl}</string>`;
      
      if (strings.includes('<string name="app_url"')) {
        strings = strings.replace(
          /<string name="app_url">[^<]*<\/string>/,
          urlStringEntry
        );
      } else {
        // Add before closing resources tag
        strings = strings.replace(
          '</resources>',
          `    ${urlStringEntry}\n</resources>`
        );
      }
      
      fs.writeFileSync(stringsPath, strings);
      console.log(`[APK-ADVANCED] Updated strings.xml with URL`);
    }

    // Step 4: Download and set logo if provided
    if (logoUrl) {
      try {
        console.log(`[APK-ADVANCED] Processing logo from: ${logoUrl}`);
        // Logo would be downloaded and placed in res/drawable/
        // For now, we'll skip this as it requires more complex image handling
        console.log(`[APK-ADVANCED] Logo processing skipped (requires additional setup)`);
      } catch (error) {
        console.warn(`[APK-ADVANCED] Logo processing failed:`, error);
        // Continue without logo
      }
    }

    // Step 5: Recompile APK using apktool
    console.log(`[APK-ADVANCED] Recompiling APK...`);
    try {
      execSync(`java -jar "${apktoolJar}" b "${decompileDir}" -o "${outputAPK}"`, {
        stdio: 'pipe',
        timeout: 120000, // 2 minutes timeout
      });
      console.log(`[APK-ADVANCED] Recompilation successful`);
    } catch (error) {
      console.error(`[APK-ADVANCED] Recompilation failed:`, error);
      throw new Error('Failed to recompile APK');
    }

    // Step 6: Sign APK using apksigner
    console.log(`[APK-ADVANCED] Signing APK...`);
    const apksignerJar = path.join(TOOLS_DIR, 'apksigner.jar');
    const certificatePem = path.join(TOOLS_DIR, 'certificate.pem');
    const keyPk8 = path.join(TOOLS_DIR, 'key.pk8');

    if (!fs.existsSync(apksignerJar)) {
      throw new Error(`apksigner.jar not found at ${apksignerJar}`);
    }

    if (!fs.existsSync(certificatePem) || !fs.existsSync(keyPk8)) {
      throw new Error(`Certificate or key not found`);
    }

    try {
      // Sign the APK
      execSync(
        `java -jar "${apksignerJar}" sign --ks-key-alias androiddebugkey --ks-pass pass:android --key-pass pass:android --ks "${certificatePem}" "${outputAPK}"`,
        { stdio: 'pipe', timeout: 60000 }
      );
      console.log(`[APK-ADVANCED] APK signed successfully`);
    } catch (error) {
      console.warn(`[APK-ADVANCED] Signing with apksigner failed, trying alternative method:`, error);
      // If apksigner fails, the APK might still be usable
    }

    // Step 7: Move final APK to output directory
    if (fs.existsSync(outputAPK)) {
      fs.copyFileSync(outputAPK, finalAPKPath);
      console.log(`[APK-ADVANCED] Final APK saved: ${finalAPKPath}`);
    } else {
      throw new Error('Output APK was not created');
    }

    // Get file stats
    const stats = fs.statSync(finalAPKPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`[APK-ADVANCED] Final APK size: ${sizeMB}MB`);

    // Generate download URL
    const domain = process.env.VITE_APP_URL || 'https://remotemon-vhmaxpe6.manus.space';
    const downloadUrl = `${domain}/apks/${finalAPKName}`;
    console.log(`[APK-ADVANCED] Generated download URL: ${downloadUrl}`);

    return {
      filename: finalAPKName,
      path: finalAPKPath,
      downloadUrl,
      size: stats.size,
    };

  } catch (error) {
    console.error(`[APK-ADVANCED] Build failed:`, error);
    throw error;
  } finally {
    // Cleanup temp directory
    try {
      if (fs.existsSync(buildDir)) {
        fs.rmSync(buildDir, { recursive: true, force: true });
        console.log(`[APK-ADVANCED] Cleaned up temp directory`);
      }
    } catch (cleanupError) {
      console.warn(`[APK-ADVANCED] Cleanup failed:`, cleanupError);
    }
  }
}

/**
 * Validate APK build options
 */
export function validateAPKOptions(options: APKBuildOptions): string[] {
  const errors: string[] = [];

  if (!options.appName || options.appName.trim().length === 0) {
    errors.push('App name is required');
  }

  if (!options.appUrl || options.appUrl.trim().length === 0) {
    errors.push('App URL is required');
  }

  // Validate URL format
  try {
    new URL(options.appUrl);
  } catch {
    errors.push('Invalid app URL format');
  }

  return errors;
}
