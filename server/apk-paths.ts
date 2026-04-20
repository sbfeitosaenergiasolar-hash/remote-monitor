import path from 'path';
import fs from 'fs';

/**
 * Get the APK directory path - unified for both dev and production
 * In production, Railway mounts the app at /app
 * In development, it's relative to process.cwd()
 */
export function getApksDir(): string {
  // In production (Railway), use /app/public/apks
  // In development, use process.cwd()/public/apks
  const apksDir = process.env.NODE_ENV === 'production' 
    ? '/app/public/apks'
    : path.join(process.cwd(), 'public', 'apks');
  
  // Ensure directory exists
  if (!fs.existsSync(apksDir)) {
    fs.mkdirSync(apksDir, { recursive: true });
    console.log(`[APK] Created directory: ${apksDir}`);
  }
  
  return apksDir;
}

/**
 * Get the full path to an APK file
 */
export function getApkFilePath(filename: string): string {
  return path.join(getApksDir(), filename);
}

/**
 * Log APK directory info for debugging
 */
export function logApkDirInfo(): void {
  const apksDir = getApksDir();
  console.log(`[APK] APK Directory: ${apksDir}`);
  console.log(`[APK] NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`[APK] process.cwd(): ${process.cwd()}`);
  console.log(`[APK] Directory exists: ${fs.existsSync(apksDir)}`);
  
  try {
    const files = fs.readdirSync(apksDir);
    console.log(`[APK] Files in directory: ${files.length}`);
    files.forEach(file => {
      const filepath = path.join(apksDir, file);
      const stats = fs.statSync(filepath);
      console.log(`[APK]   - ${file} (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);
    });
  } catch (error) {
    console.error(`[APK] Error reading directory:`, error);
  }
}
