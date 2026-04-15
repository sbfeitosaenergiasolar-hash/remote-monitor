import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';

interface APKCustomizerOptions {
  apkPath: string;
  appName: string;
  packageName?: string;
  outputPath?: string;
}

/**
 * Customize APK using Node.js with adm-zip
 * No external tools required - uses only Node.js libraries
 */
export async function customizeAPKWithNodeJS(options: APKCustomizerOptions): Promise<string> {
  const tempDir = path.join('/tmp', `apk-customize-${Date.now()}`);
  const outputPath = options.outputPath || options.apkPath;

  try {
    console.log(`[APK-CUSTOMIZER-NODEJS] Starting customization with Node.js`);
    console.log(`[APK-CUSTOMIZER-NODEJS] Input APK: ${options.apkPath}`);
    console.log(`[APK-CUSTOMIZER-NODEJS] App Name: ${options.appName}`);

    // Create temp directory
    fs.mkdirSync(tempDir, { recursive: true });

    // Extract APK
    console.log(`[APK-CUSTOMIZER-NODEJS] Extracting APK...`);
    const zip = new AdmZip(options.apkPath);
    const extractDir = path.join(tempDir, 'extracted');
    zip.extractAllTo(extractDir, true);
    console.log(`[APK-CUSTOMIZER-NODEJS] APK extracted to: ${extractDir}`);

    // Find strings.xml
    const possiblePaths = [
      path.join(extractDir, 'res', 'values', 'strings.xml'),
      path.join(extractDir, 'res', 'values-en', 'strings.xml'),
      path.join(extractDir, 'res', 'values-pt', 'strings.xml'),
    ];

    let stringsXmlPath: string | null = null;
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        stringsXmlPath = p;
        console.log(`[APK-CUSTOMIZER-NODEJS] Found strings.xml at: ${p}`);
        break;
      }
    }

    if (stringsXmlPath) {
      // Read strings.xml
      const stringsContent = fs.readFileSync(stringsXmlPath, 'utf-8');
      console.log(`[APK-CUSTOMIZER-NODEJS] strings.xml size: ${stringsContent.length} bytes`);

      // Simple string replacement (no XML parsing to avoid issues)
      let modifiedContent = stringsContent;

      // Try to replace app_name
      if (modifiedContent.includes('app_name')) {
        const appNameRegex = /<string name="app_name"[^>]*>[^<]*<\/string>/;
        if (appNameRegex.test(modifiedContent)) {
          modifiedContent = modifiedContent.replace(
            appNameRegex,
            `<string name="app_name">${options.appName}</string>`
          );
          console.log(`[APK-CUSTOMIZER-NODEJS] Replaced app_name in strings.xml`);
        }
      }

      // Try to replace Blockchain
      if (modifiedContent.includes('Blockchain')) {
        modifiedContent = modifiedContent.replace(/Blockchain/g, options.appName);
        console.log(`[APK-CUSTOMIZER-NODEJS] Replaced Blockchain with ${options.appName}`);
      }

      // Write back
      fs.writeFileSync(stringsXmlPath, modifiedContent, 'utf-8');
      console.log(`[APK-CUSTOMIZER-NODEJS] strings.xml updated`);
    } else {
      console.warn(`[APK-CUSTOMIZER-NODEJS] WARNING: strings.xml not found`);
    }

    // Repackage APK
    console.log(`[APK-CUSTOMIZER-NODEJS] Repackaging APK...`);
    
    // Remove old output if exists
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }

    // Create new APK
    const newZip = new AdmZip();
    
    // Add all files from extracted directory
    const addFilesRecursive = (dir: string, zipPath: string = ''): void => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        const arcPath = zipPath ? `${zipPath}/${file}` : file;

        if (stat.isDirectory()) {
          addFilesRecursive(filePath, arcPath);
        } else {
          const fileData = fs.readFileSync(filePath);
          newZip.addFile(arcPath, fileData);
        }
      }
    };

    addFilesRecursive(extractDir);
    newZip.writeZip(outputPath);
    console.log(`[APK-CUSTOMIZER-NODEJS] APK repackaged successfully`);

    // Verify output
    if (!fs.existsSync(outputPath)) {
      throw new Error(`Failed to create customized APK at ${outputPath}`);
    }

    const stats = fs.statSync(outputPath);
    console.log(`[APK-CUSTOMIZER-NODEJS] ✓ APK customization completed`);
    console.log(`[APK-CUSTOMIZER-NODEJS] Output APK: ${outputPath}`);
    console.log(`[APK-CUSTOMIZER-NODEJS] Output size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    return outputPath;
  } catch (error) {
    console.error(`[APK-CUSTOMIZER-NODEJS] Error: ${error}`);
    throw error;
  } finally {
    // Cleanup temp directory
    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    } catch (e) {
      console.warn(`[APK-CUSTOMIZER-NODEJS] Failed to cleanup temp directory: ${e}`);
    }
  }
}
