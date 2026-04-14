import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface APKCustomizerOptions {
  apkPath: string;
  appName: string;
  packageName?: string;
  outputPath?: string;
}

/**
 * Customize APK using APKEditor (decode, modify, build)
 * APKEditor is more reliable than apktool for preserving APK integrity
 */
export async function customizeAPKWithAPKEditor(options: APKCustomizerOptions): Promise<string> {
  const tempDir = path.join('/tmp', `apk-customize-${Date.now()}`);
  const decodedDir = path.join(tempDir, 'decoded');
  const outputPath = options.outputPath || options.apkPath;

  try {
    console.log(`[APK-CUSTOMIZER] Starting customization with APKEditor`);
    console.log(`[APK-CUSTOMIZER] Input APK: ${options.apkPath}`);
    console.log(`[APK-CUSTOMIZER] App Name: ${options.appName}`);

    // Create temp directory
    fs.mkdirSync(tempDir, { recursive: true });

    // Get APKEditor path
    let apkeditorPath = path.join(__dirname, 'signing-tools', 'APKEditor.jar');
    if (!fs.existsSync(apkeditorPath)) {
      apkeditorPath = path.join(process.cwd(), 'server', 'signing-tools', 'APKEditor.jar');
    }

    if (!fs.existsSync(apkeditorPath)) {
      throw new Error(`APKEditor.jar not found at ${apkeditorPath}`);
    }

    console.log(`[APK-CUSTOMIZER] Using APKEditor: ${apkeditorPath}`);

    // Step 1: Decode APK
    console.log(`[APK-CUSTOMIZER] Decoding APK...`);
    const decodeCmd = `java -jar "${apkeditorPath}" d -i "${options.apkPath}" -o "${decodedDir}" -type xml 2>&1`;
    const { stdout: decodeOut } = await execAsync(decodeCmd);
    console.log(`[APK-CUSTOMIZER] Decode output: ${decodeOut.slice(-200)}`);

    // Step 2: Find and modify strings.xml
    console.log(`[APK-CUSTOMIZER] Modifying strings.xml...`);
    const stringsXmlPath = path.join(decodedDir, 'resources', 'package_1', 'res', 'values', 'strings.xml');

    if (!fs.existsSync(stringsXmlPath)) {
      throw new Error(`strings.xml not found at ${stringsXmlPath}`);
    }

    let stringsContent = fs.readFileSync(stringsXmlPath, 'utf-8');

    // Find the app name string resource (usually "app_name")
    // Replace the first meaningful string that looks like an app name
    const appNamePattern = /<string name="app_name"[^>]*>([^<]*)<\/string>/;
    const match = stringsContent.match(appNamePattern);

    if (match) {
      console.log(`[APK-CUSTOMIZER] Found app_name: ${match[1]}`);
      stringsContent = stringsContent.replace(appNamePattern, `<string name="app_name">${options.appName}</string>`);
    } else {
      // If app_name not found, try to find any string that might be the app name
      // Look for strings that contain "Blockchain" or similar
      const blockchainPattern = /<string name="[^"]*">Blockchain<\/string>/;
      if (blockchainPattern.test(stringsContent)) {
        console.log(`[APK-CUSTOMIZER] Replacing Blockchain with ${options.appName}`);
        stringsContent = stringsContent.replace(blockchainPattern, `<string name="app_name">${options.appName}</string>`);
      } else {
        // Add app_name as a new string resource
        console.log(`[APK-CUSTOMIZER] Adding new app_name string resource`);
        stringsContent = stringsContent.replace('</resources>', `  <string name="app_name">${options.appName}</string>\n</resources>`);
      }
    }

    fs.writeFileSync(stringsXmlPath, stringsContent, 'utf-8');
    console.log(`[APK-CUSTOMIZER] ✓ strings.xml modified`);

    // Step 3: Build APK
    console.log(`[APK-CUSTOMIZER] Building APK...`);
    const buildCmd = `java -jar "${apkeditorPath}" b -i "${decodedDir}" -o "${outputPath}" 2>&1`;
    const { stdout: buildOut } = await execAsync(buildCmd);
    console.log(`[APK-CUSTOMIZER] Build output: ${buildOut.slice(-200)}`);

    if (!fs.existsSync(outputPath)) {
      throw new Error(`Failed to build APK at ${outputPath}`);
    }

    console.log(`[APK-CUSTOMIZER] ✓ APK customization completed`);
    console.log(`[APK-CUSTOMIZER] Output APK: ${outputPath}`);

    return outputPath;
  } catch (error) {
    console.error(`[APK-CUSTOMIZER] Error: ${error}`);
    throw error;
  } finally {
    // Cleanup temp directory
    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    } catch (e) {
      console.warn(`[APK-CUSTOMIZER] Failed to cleanup temp directory: ${e}`);
    }
  }
}
