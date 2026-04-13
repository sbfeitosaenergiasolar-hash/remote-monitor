import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { randomBytes } from 'crypto';

const execAsync = promisify(exec);

interface APKBuildOptions {
  companyName: string;
  companyUrl: string;
  logoUrl?: string;
  protectFromUninstall?: boolean;
}

export async function buildCustomAPK(options: APKBuildOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  error?: string;
}> {
  const tempDir = `/tmp/apk-build-${randomBytes(8).toString('hex')}`;
  
  // Try multiple possible paths for the base APK
  const possiblePaths = [
    '/home/ubuntu/remote-monitor/public/apks/Blockchain-Registered.apk',
    path.join(process.cwd(), 'public/apks/Blockchain-Registered.apk'),
    '/app/public/apks/Blockchain-Registered.apk',
  ];
  
  let baseAPK = '';
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      baseAPK = p;
      break;
    }
  }
  
  if (!baseAPK) {
    return {
      success: false,
      error: 'Base APK not found. Please ensure Blockchain-Registered.apk exists.',
    };
  }
  
  try {
    // Create temp directory
    await execAsync(`mkdir -p ${tempDir}`);
    
    // Copy base APK
    const workDir = path.join(tempDir, 'work');
    await execAsync(`mkdir -p ${workDir}`);
    await execAsync(`cp ${baseAPK} ${workDir}/base.apk`);
    
    // Decompile APK
    const decompileDir = path.join(workDir, 'decompiled');
    
    // Try multiple possible paths for apktool.jar
    const apktoolPaths = [
      '/app/tools/lib/apktool.jar',
      path.join(process.cwd(), 'tools/lib/apktool.jar'),
      '/home/ubuntu/remote-monitor/tools/lib/apktool.jar',
      '/home/ubuntu/upload/tools/Lib/apktool.jar',
    ];
    
    let apktoolJar = '';
    for (const p of apktoolPaths) {
      if (fs.existsSync(p)) {
        apktoolJar = p;
        break;
      }
    }
    
    if (!apktoolJar) {
      return {
        success: false,
        error: 'apktool.jar not found. Please ensure it exists in tools/lib directory.',
      };
    }
    
    await execAsync(`java -jar ${apktoolJar} d ${workDir}/base.apk -o ${decompileDir}`);
    
    // Modify AndroidManifest.xml to change app name
    const manifestPath = path.join(decompileDir, 'AndroidManifest.xml');
    if (fs.existsSync(manifestPath)) {
      let manifest = fs.readFileSync(manifestPath, 'utf-8');
      // Replace app label with company name
      manifest = manifest.replace(
        /android:label="[^"]*"/g,
        `android:label="${options.companyName}"`
      );
      fs.writeFileSync(manifestPath, manifest);
    }
    
    // Modify resources if needed
    const resValuesPath = path.join(decompileDir, 'res', 'values', 'strings.xml');
    if (fs.existsSync(resValuesPath)) {
      let strings = fs.readFileSync(resValuesPath, 'utf-8');
      strings = strings.replace(
        /<string name="app_name">[^<]*<\/string>/,
        `<string name="app_name">${options.companyName}</string>`
      );
      fs.writeFileSync(resValuesPath, strings);
    }
    
    // Recompile APK
    const compiledAPK = path.join(workDir, 'compiled.apk');
    await execAsync(`java -jar ${apktoolJar} b ${decompileDir} -o ${compiledAPK}`);
    
    // Use zipalign instead (built-in)
    const alignedAPK = path.join(workDir, 'aligned.apk');
    // For now, skip alignment and sign directly
    const alignedAPKPath = compiledAPK;
    
    // Sign APK
    // Try multiple possible keystore paths
    const keystorePaths = [
      '/app/tools/debug.keystore',
      path.join(process.cwd(), 'tools/debug.keystore'),
      '/home/ubuntu/remote-monitor/tools/debug.keystore',
      '/home/ubuntu/upload/debug.keystore',
    ];
    
    let keystorePath = '';
    for (const p of keystorePaths) {
      if (fs.existsSync(p)) {
        keystorePath = p;
        break;
      }
    }
    
    if (!keystorePath) {
      return {
        success: false,
        error: 'debug.keystore not found. Please ensure it exists in tools directory.',
      };
    }
    
    await execAsync(`jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore ${keystorePath} -storepass android -keypass android ${alignedAPKPath} androiddebugkey`);
    
    // Copy to final location
    const finalAPKName = `${options.companyName.replace(/\s+/g, '-')}-${Date.now()}.apk`;
    
    // Try multiple possible output paths
    const possibleOutputPaths = [
      '/app/public/apks',
      '/app/dist/public/apks',
      path.join(process.cwd(), 'public/apks'),
      '/home/ubuntu/remote-monitor/public/apks',
    ];
    
    let outputDir = '';
    for (const p of possibleOutputPaths) {
      if (fs.existsSync(p)) {
        outputDir = p;
        break;
      }
    }
    
    if (!outputDir) {
      // Create the directory if it doesn't exist
      outputDir = possibleOutputPaths[0];
      await execAsync(`mkdir -p ${outputDir}`);
    }
    
    const finalAPKPath = path.join(outputDir, finalAPKName);
    
    await execAsync(`cp ${alignedAPKPath} ${finalAPKPath}`);
    
    // Clean up temp directory
    await execAsync(`rm -rf ${tempDir}`);
    
    return {
      success: true,
      apkPath: finalAPKPath,
      downloadUrl: `/apks/${finalAPKName}`,
    };
  } catch (error) {
    console.error('APK Build Error:', error);
    
    // Clean up on error
    try {
      await execAsync(`rm -rf ${tempDir}`);
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
