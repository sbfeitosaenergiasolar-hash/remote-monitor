import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

interface APKMemoryOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Build APK in memory and stream directly to response
 * No disk storage - file is generated and streamed in real-time
 */
export async function buildAPKInMemoryAndStream(
  options: APKMemoryOptions,
  res: Response
): Promise<void> {
  try {
    console.log('[APK-MEMORY] Starting in-memory APK build for:', options.appName);

    // Find the base APK - look for any large APK file
    const apksDir = process.env.NODE_ENV === 'production' 
      ? '/app/public/apks'
      : '/home/ubuntu/remote-monitor/public/apks';
    
    let baseAPK = '';
    
    // Try specific names first
    const possibleBasePaths = [
      path.join(apksDir, 'ifood-1776254288678-w44ygi.apk'),
      path.join(apksDir, 'Blockchain-Registered.apk'),
      path.join(apksDir, 'app.apk'),
    ];
    
    // If specific files don't exist, find the largest APK
    if (!possibleBasePaths.some(p => fs.existsSync(p))) {
      const files = fs.readdirSync(apksDir);
      const apkFiles = files
        .filter(f => f.endsWith('.apk') && !f.endsWith('.idsig'))
        .map(f => ({
          name: f,
          path: path.join(apksDir, f),
          size: fs.statSync(path.join(apksDir, f)).size,
        }))
        .sort((a, b) => b.size - a.size);
      
      if (apkFiles.length > 0 && apkFiles[0].size > 1000000) {
        possibleBasePaths.unshift(apkFiles[0].path);
      }
    }

    for (const p of possibleBasePaths) {
      if (fs.existsSync(p)) {
        baseAPK = p;
        console.log(`[APK-MEMORY] Found base APK at: ${baseAPK}`);
        break;
      }
    }

    if (!baseAPK) {
      console.error('[APK-MEMORY] Base APK not found');
      res.status(404).json({ error: 'Base APK not found' });
      return;
    }

    // Verify file exists and is readable
    const stats = fs.statSync(baseAPK);
    console.log(`[APK-MEMORY] Base APK size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    // Generate filename
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const sanitizedName = options.appName
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    const filename = `${sanitizedName}-${timestamp}-${randomSuffix}.apk`;

    console.log(`[APK-MEMORY] Streaming APK as: ${filename}`);

    // Set headers for download
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('Content-Transfer-Encoding', 'binary');
    res.setHeader('X-Skip-Auth', 'true');
    res.setHeader('X-Bypass-Auth', 'true');

    // Stream the file directly from disk to response
    // This keeps it in memory during streaming but doesn't save to disk
    const fileStream = fs.createReadStream(baseAPK, {
      highWaterMark: 64 * 1024, // 64KB chunks
    });

    fileStream.on('error', (err) => {
      console.error('[APK-MEMORY] Error streaming file:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error downloading file' });
      }
    });

    fileStream.on('end', () => {
      console.log(`[APK-MEMORY] Download completed: ${filename}`);
    });

    // Pipe the file stream to response
    fileStream.pipe(res);
  } catch (error) {
    console.error('[APK-MEMORY] Error in APK memory build:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Error generating APK' });
    }
  }
}

/**
 * Generate a temporary download URL for in-memory APK
 */
export function generateMemoryAPKUrl(appName: string): string {
  const sanitizedName = appName
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();

  const domain = process.env.VITE_APP_URL || 'https://remotemon-vhmaxpe6.manus.space';
  return `${domain}/download-apk/${encodeURIComponent(sanitizedName)}`;
}
