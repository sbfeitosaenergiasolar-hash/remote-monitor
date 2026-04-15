import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface APKCustomizerOptions {
  apkPath: string;
  appName: string;
  packageName?: string;
  outputPath?: string;
}

/**
 * Customize APK using apktool (decode, modify, build)
 * This is the most reliable method for customizing APKs
 */
export async function customizeAPKWithApktool(options: APKCustomizerOptions): Promise<string> {
  const tempDir = path.join('/tmp', `apk-customize-${Date.now()}`);
  const decodedDir = path.join(tempDir, 'decoded');
  const outputPath = options.outputPath || options.apkPath;

  try {
    console.log(`[APK-CUSTOMIZER-APKTOOL] Starting customization with apktool`);
    console.log(`[APK-CUSTOMIZER-APKTOOL] Input APK: ${options.apkPath}`);
    console.log(`[APK-CUSTOMIZER-APKTOOL] App Name: ${options.appName}`);

    // Create temp directory
    fs.mkdirSync(tempDir, { recursive: true });

    // Get apktool path
    const apktoolPath = path.join(process.cwd(), 'server', 'tools', 'apktool.jar');

    if (!fs.existsSync(apktoolPath)) {
      throw new Error(`apktool.jar not found at ${apktoolPath}`);
    }

    console.log(`[APK-CUSTOMIZER-APKTOOL] Using apktool: ${apktoolPath}`);

    // Step 1: Decode APK
    console.log(`[APK-CUSTOMIZER-APKTOOL] Decoding APK...`);
    const decodeCmd = `java -jar "${apktoolPath}" d -f "${options.apkPath}" -o "${decodedDir}" 2>&1`;
    try {
      const { stdout: decodeOut } = await execAsync(decodeCmd);
      console.log(`[APK-CUSTOMIZER-APKTOOL] Decode output: ${decodeOut.slice(-200)}`);
    } catch (e: any) {
      console.log(`[APK-CUSTOMIZER-APKTOOL] Decode stderr (may be normal): ${e.stderr?.slice(-200)}`);
    }

    // Step 2: Find and modify strings.xml
    console.log(`[APK-CUSTOMIZER-APKTOOL] Modifying strings.xml...`);
    const stringsXmlPath = path.join(decodedDir, 'res', 'values', 'strings.xml');

    if (!fs.existsSync(stringsXmlPath)) {
      console.warn(`[APK-CUSTOMIZER-APKTOOL] strings.xml not found at ${stringsXmlPath}`);
      // Try alternative paths
      const altPaths = [
        path.join(decodedDir, 'res', 'values-en', 'strings.xml'),
        path.join(decodedDir, 'res', 'values-pt', 'strings.xml'),
      ];
      
      for (const altPath of altPaths) {
        if (fs.existsSync(altPath)) {
          console.log(`[APK-CUSTOMIZER-APKTOOL] Found strings.xml at: ${altPath}`);
          break;
        }
      }
    }

    if (fs.existsSync(stringsXmlPath)) {
      let stringsContent = fs.readFileSync(stringsXmlPath, 'utf-8');
      console.log(`[APK-CUSTOMIZER-APKTOOL] Original strings.xml length: ${stringsContent.length}`);

      // Find and replace app_name
      const appNamePattern = /<string name="app_name"[^>]*>([^<]*)<\/string>/;
      const match = stringsContent.match(appNamePattern);

      if (match) {
        console.log(`[APK-CUSTOMIZER-APKTOOL] Found app_name: ${match[1]}`);
        stringsContent = stringsContent.replace(appNamePattern, `<string name="app_name">${options.appName}</string>`);
      } else {
        // Try to replace any "Blockchain" string
        if (stringsContent.includes('Blockchain')) {
          console.log(`[APK-CUSTOMIZER-APKTOOL] Replacing Blockchain with ${options.appName}`);
          stringsContent = stringsContent.replace(/Blockchain/g, options.appName);
        } else {
          // Add app_name as a new string resource
          console.log(`[APK-CUSTOMIZER-APKTOOL] Adding new app_name string resource`);
          stringsContent = stringsContent.replace('</resources>', `  <string name="app_name">${options.appName}</string>\n</resources>`);
        }
      }

      fs.writeFileSync(stringsXmlPath, stringsContent, 'utf-8');
      console.log(`[APK-CUSTOMIZER-APKTOOL] ✓ strings.xml modified`);
    }

    // Step 3: Build APK
    console.log(`[APK-CUSTOMIZER-APKTOOL] Building APK...`);
    const buildCmd = `java -jar "${apktoolPath}" b "${decodedDir}" -o "${outputPath}" 2>&1`;
    try {
      const { stdout: buildOut } = await execAsync(buildCmd);
      console.log(`[APK-CUSTOMIZER-APKTOOL] Build output: ${buildOut.slice(-200)}`);
    } catch (e: any) {
      console.log(`[APK-CUSTOMIZER-APKTOOL] Build stderr (may be normal): ${e.stderr?.slice(-200)}`);
    }

    if (!fs.existsSync(outputPath)) {
      throw new Error(`Failed to build APK at ${outputPath}`);
    }

    const stats = fs.statSync(outputPath);
    console.log(`[APK-CUSTOMIZER-APKTOOL] ✓ APK customization completed`);
    console.log(`[APK-CUSTOMIZER-APKTOOL] Output APK: ${outputPath}`);
    console.log(`[APK-CUSTOMIZER-APKTOOL] Output size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    return outputPath;
  } catch (error) {
    console.error(`[APK-CUSTOMIZER-APKTOOL] Error: ${error}`);
    throw error;
  } finally {
    // Cleanup temp directory
    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    } catch (e) {
      console.warn(`[APK-CUSTOMIZER-APKTOOL] Failed to cleanup temp directory: ${e}`);
    }
  }
}
