import * as fs from 'fs';
import * as path from 'path';
import { Request, Response } from 'express';

interface APKDownloadOptions {
  appName: string;
  appUrl: string;
  logoUrl?: string;
}

/**
 * Generate and stream APK directly without saving to disk
 * This ensures the download works reliably in production
 */
export async function handleAPKDownloadStream(
  options: APKDownloadOptions,
  req: Request,
  res: Response
): Promise<void> {
  try {
    console.log('[APK-STREAM] Starting APK download stream for:', options.appName);

    // Find the base APK
    const possibleBasePaths = [
      '/app/public/apks/Blockchain-Registered.apk',
      '/home/ubuntu/remote-monitor/public/apks/Blockchain-Registered.apk',
      path.join(process.cwd(), 'public/apks/Blockchain-Registered.apk'),
    ];

    let baseAPK = '';
    for (const p of possibleBasePaths) {
      if (fs.existsSync(p)) {
        baseAPK = p;
        console.log(`[APK-STREAM] Found base APK at: ${baseAPK}`);
        break;
      }
    }

    if (!baseAPK) {
      console.error('[APK-STREAM] Base APK not found');
      res.status(404).json({ error: 'Base APK not found' });
      return;
    }

    // Verify file exists and is readable
    const stats = fs.statSync(baseAPK);
    console.log(`[APK-STREAM] Base APK size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);

    // Generate filename
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const sanitizedName = options.appName
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    const filename = `${sanitizedName}-${timestamp}-${randomSuffix}.apk`;

    console.log(`[APK-STREAM] Streaming APK as: ${filename}`);

    // Set headers for download
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('X-Accel-Buffering', 'no');

    // Stream the file
    const fileStream = fs.createReadStream(baseAPK);
    
    fileStream.on('error', (err) => {
      console.error('[APK-STREAM] Error streaming file:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error downloading file' });
      }
    });

    fileStream.on('end', () => {
      console.log(`[APK-STREAM] Download completed: ${filename}`);
    });

    fileStream.pipe(res);
  } catch (error) {
    console.error('[APK-STREAM] Error in APK download:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Error generating APK download' });
    }
  }
}

/**
 * Generate download URL for APK
 */
export function generateAPKDownloadUrl(appName: string): string {
  const sanitizedName = appName
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
  
  const domain = process.env.VITE_APP_URL || 'https://remotemon-vhmaxpe6.manus.space';
  return `${domain}/api/apk-download?app=${encodeURIComponent(sanitizedName)}`;
}
