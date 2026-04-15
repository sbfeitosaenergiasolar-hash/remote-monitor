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
 * Customize APK by modifying resources.arsc directly
 * This method replaces "Blockchain" with the app name in the compiled resources
 */
export async function customizeAPKFinal(options: APKCustomizerOptions): Promise<string> {
  const tempDir = path.join('/tmp', `apk-customize-final-${Date.now()}`);
  const outputPath = options.outputPath || options.apkPath;

  try {
    console.log(`[APK-CUSTOMIZER-FINAL] Starting customization`);
    console.log(`[APK-CUSTOMIZER-FINAL] Input APK: ${options.apkPath}`);
    console.log(`[APK-CUSTOMIZER-FINAL] App Name: ${options.appName}`);

    // Create temp directory
    fs.mkdirSync(tempDir, { recursive: true });

    // Extract APK
    console.log(`[APK-CUSTOMIZER-FINAL] Extracting APK...`);
    const zip = new AdmZip(options.apkPath);
    const extractDir = path.join(tempDir, 'extracted');
    zip.extractAllTo(extractDir, true);
    console.log(`[APK-CUSTOMIZER-FINAL] APK extracted to: ${extractDir}`);

    // Find and modify resources.arsc
    const resourcesPath = path.join(extractDir, 'resources.arsc');
    if (fs.existsSync(resourcesPath)) {
      console.log(`[APK-CUSTOMIZER-FINAL] Found resources.arsc`);
      
      // Read resources.arsc as binary
      let resourcesBuffer = fs.readFileSync(resourcesPath);
      console.log(`[APK-CUSTOMIZER-FINAL] resources.arsc size: ${resourcesBuffer.length} bytes`);

      // Replace "Blockchain" with app name in the binary file
      // Note: We need to be careful with the replacement to maintain binary structure
      const blockchainBuffer = Buffer.from('Blockchain', 'utf-8');
      const appNameBuffer = Buffer.from(options.appName, 'utf-8');

      // Only replace if lengths match or if app name is shorter/equal
      if (appNameBuffer.length <= blockchainBuffer.length) {
        console.log(`[APK-CUSTOMIZER-FINAL] Replacing "Blockchain" (${blockchainBuffer.length} bytes) with "${options.appName}" (${appNameBuffer.length} bytes)`);
        
        // Pad app name with nulls if needed
        const paddedAppName = Buffer.alloc(blockchainBuffer.length);
        appNameBuffer.copy(paddedAppName);
        
        // Replace all occurrences
        let offset = 0;
        let replacements = 0;
        while ((offset = resourcesBuffer.indexOf(blockchainBuffer, offset)) !== -1) {
          paddedAppName.copy(resourcesBuffer, offset);
          offset += blockchainBuffer.length;
          replacements++;
        }
        
        console.log(`[APK-CUSTOMIZER-FINAL] Made ${replacements} replacements in resources.arsc`);
        
        // Write back
        fs.writeFileSync(resourcesPath, resourcesBuffer);
        console.log(`[APK-CUSTOMIZER-FINAL] resources.arsc updated`);
      } else {
        console.warn(`[APK-CUSTOMIZER-FINAL] WARNING: App name is longer than "Blockchain", skipping replacement`);
      }
    } else {
      console.warn(`[APK-CUSTOMIZER-FINAL] WARNING: resources.arsc not found`);
    }

    // Also try to find and modify strings.xml if it exists
    const possibleStringsPaths = [
      path.join(extractDir, 'res', 'values', 'strings.xml'),
      path.join(extractDir, 'res', 'values-en', 'strings.xml'),
      path.join(extractDir, 'res', 'values-pt', 'strings.xml'),
    ];

    for (const stringsPath of possibleStringsPaths) {
      if (fs.existsSync(stringsPath)) {
        console.log(`[APK-CUSTOMIZER-FINAL] Found strings.xml at: ${stringsPath}`);
        
        let stringsContent = fs.readFileSync(stringsPath, 'utf-8');
        
        // Replace app_name
        if (stringsContent.includes('app_name')) {
          const appNameRegex = /<string name="app_name"[^>]*>[^<]*<\/string>/;
          if (appNameRegex.test(stringsContent)) {
            stringsContent = stringsContent.replace(
              appNameRegex,
              `<string name="app_name">${options.appName}</string>`
            );
            console.log(`[APK-CUSTOMIZER-FINAL] Replaced app_name in strings.xml`);
          }
        }
        
        // Replace Blockchain
        if (stringsContent.includes('Blockchain')) {
          stringsContent = stringsContent.replace(/Blockchain/g, options.appName);
          console.log(`[APK-CUSTOMIZER-FINAL] Replaced Blockchain in strings.xml`);
        }
        
        fs.writeFileSync(stringsPath, stringsContent, 'utf-8');
        console.log(`[APK-CUSTOMIZER-FINAL] strings.xml updated`);
      }
    }

    // Repackage APK
    console.log(`[APK-CUSTOMIZER-FINAL] Repackaging APK...`);
    
    // Remove old output if exists
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }

    // Create new APK
    const newZip = new AdmZip();
    
    // Add all files from extracted directory, preserving structure
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
    console.log(`[APK-CUSTOMIZER-FINAL] APK repackaged successfully`);

    // Verify output
    if (!fs.existsSync(outputPath)) {
      throw new Error(`Failed to create customized APK at ${outputPath}`);
    }

    const stats = fs.statSync(outputPath);
    console.log(`[APK-CUSTOMIZER-FINAL] ✓ APK customization completed`);
    console.log(`[APK-CUSTOMIZER-FINAL] Output APK: ${outputPath}`);
    console.log(`[APK-CUSTOMIZER-FINAL] Output size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    return outputPath;
  } catch (error) {
    console.error(`[APK-CUSTOMIZER-FINAL] Error: ${error}`);
    throw error;
  } finally {
    // Cleanup temp directory
    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    } catch (e) {
      console.warn(`[APK-CUSTOMIZER-FINAL] Failed to cleanup temp directory: ${e}`);
    }
  }
}
