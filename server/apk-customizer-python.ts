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
 * Customize APK using Python and ZIP manipulation
 * No external tools required - uses only Python and standard libraries
 */
export async function customizeAPKWithPython(options: APKCustomizerOptions): Promise<string> {
  const tempDir = path.join('/tmp', `apk-customize-${Date.now()}`);
  const decodedDir = path.join(tempDir, 'decoded');
  const outputPath = options.outputPath || options.apkPath;

  try {
    console.log(`[APK-CUSTOMIZER-PYTHON] Starting customization with Python`);
    console.log(`[APK-CUSTOMIZER-PYTHON] Input APK: ${options.apkPath}`);
    console.log(`[APK-CUSTOMIZER-PYTHON] App Name: ${options.appName}`);

    // Create temp directory
    fs.mkdirSync(tempDir, { recursive: true });
    fs.mkdirSync(decodedDir, { recursive: true });

    // Create Python script for APK customization
    const pythonScript = path.join(tempDir, 'customize_apk.py');
    const pythonCode = `#!/usr/bin/env python3
import zipfile
import os
import sys
import shutil
import xml.etree.ElementTree as ET
from pathlib import Path

def customize_apk(apk_path, output_path, app_name, decoded_dir):
    try:
        print(f"[PYTHON] Extracting APK: {apk_path}")
        
        # Extract APK
        with zipfile.ZipFile(apk_path, 'r') as zip_ref:
            zip_ref.extractall(decoded_dir)
        
        print(f"[PYTHON] APK extracted to: {decoded_dir}")
        
        # Find and modify strings.xml
        strings_xml_paths = [
            os.path.join(decoded_dir, 'res', 'values', 'strings.xml'),
            os.path.join(decoded_dir, 'res', 'values-en', 'strings.xml'),
            os.path.join(decoded_dir, 'res', 'values-pt', 'strings.xml'),
        ]
        
        strings_xml_path = None
        for p in strings_xml_paths:
            if os.path.exists(p):
                strings_xml_path = p
                print(f"[PYTHON] Found strings.xml at: {p}")
                break
        
        if strings_xml_path:
            # Read and modify strings.xml
            with open(strings_xml_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace app_name or Blockchain
            if '<string name="app_name"' in content:
                import re
                content = re.sub(
                    r'<string name="app_name"[^>]*>[^<]*</string>',
                    f'<string name="app_name">{app_name}</string>',
                    content
                )
                print(f"[PYTHON] Replaced app_name in strings.xml")
            elif 'Blockchain' in content:
                content = content.replace('Blockchain', app_name)
                print(f"[PYTHON] Replaced Blockchain with {app_name}")
            
            # Write back
            with open(strings_xml_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"[PYTHON] strings.xml updated")
        else:
            print(f"[PYTHON] WARNING: strings.xml not found")
        
        # Repackage APK
        print(f"[PYTHON] Repackaging APK to: {output_path}")
        
        # Remove old output if exists
        if os.path.exists(output_path):
            os.remove(output_path)
        
        # Create new APK
        with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(decoded_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, decoded_dir)
                    zipf.write(file_path, arcname)
        
        print(f"[PYTHON] APK repackaged successfully")
        print(f"[PYTHON] Output size: {os.path.getsize(output_path) / 1024 / 1024:.2f}MB")
        
        return True
        
    except Exception as e:
        print(f"[PYTHON] Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == '__main__':
    apk_path = sys.argv[1]
    output_path = sys.argv[2]
    app_name = sys.argv[3]
    decoded_dir = sys.argv[4]
    
    success = customize_apk(apk_path, output_path, app_name, decoded_dir)
    sys.exit(0 if success else 1)
`;

    fs.writeFileSync(pythonScript, pythonCode);
    console.log(`[APK-CUSTOMIZER-PYTHON] Python script created at: ${pythonScript}`);

    // Run Python script
    console.log(`[APK-CUSTOMIZER-PYTHON] Running Python customization...`);
    const pythonCmd = `python3 "${pythonScript}" "${options.apkPath}" "${outputPath}" "${options.appName}" "${decodedDir}"`;
    
    try {
      const { stdout, stderr } = await execAsync(pythonCmd);
      console.log(`[APK-CUSTOMIZER-PYTHON] Python output: ${stdout}`);
      if (stderr) {
        console.log(`[APK-CUSTOMIZER-PYTHON] Python stderr: ${stderr}`);
      }
    } catch (e: any) {
      console.error(`[APK-CUSTOMIZER-PYTHON] Python execution error: ${e.message}`);
      console.error(`[APK-CUSTOMIZER-PYTHON] stdout: ${e.stdout}`);
      console.error(`[APK-CUSTOMIZER-PYTHON] stderr: ${e.stderr}`);
      throw e;
    }

    // Verify output
    if (!fs.existsSync(outputPath)) {
      throw new Error(`Failed to create customized APK at ${outputPath}`);
    }

    const stats = fs.statSync(outputPath);
    console.log(`[APK-CUSTOMIZER-PYTHON] ✓ APK customization completed`);
    console.log(`[APK-CUSTOMIZER-PYTHON] Output APK: ${outputPath}`);
    console.log(`[APK-CUSTOMIZER-PYTHON] Output size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    return outputPath;
  } catch (error) {
    console.error(`[APK-CUSTOMIZER-PYTHON] Error: ${error}`);
    throw error;
  } finally {
    // Cleanup temp directory
    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    } catch (e) {
      console.warn(`[APK-CUSTOMIZER-PYTHON] Failed to cleanup temp directory: ${e}`);
    }
  }
}
