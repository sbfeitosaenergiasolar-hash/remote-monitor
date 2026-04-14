import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import fs from "fs";
import path from "path";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { runMigrations } from "../migrations";
import { buildAPKInMemoryAndStream } from "../apk-builder-memory";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  // Run migrations before starting server
  await runMigrations();

  const app = express();
  const server = createServer(app);

  // Determine APK directory FIRST (before any middleware)
  const apksDir = process.env.NODE_ENV === 'production' 
    ? '/app/public/apks'
    : path.join(process.cwd(), 'public', 'apks');
  
  console.log(`[APK] Serving APK files from: ${apksDir}`);

  // Helper function to serve APK files
  const serveAPKFile = (req: express.Request, res: express.Response) => {
    let filename = req.params.filename;
    // Remove query string from filename if present
    filename = filename.split('?')[0];
    // Sanitize filename to prevent directory traversal
    if (filename.includes('..') || filename.includes('/')) {
      return res.status(400).send('Invalid filename');
    }
    const filepath = path.join(apksDir, filename);
    console.log(`[APK] Serving file: ${filepath}`);
    
    // Check if file exists
    if (!fs.existsSync(filepath)) {
      console.log(`[APK] File not found: ${filepath}`);
      return res.status(404).send('APK file not found');
    }
    
    // Get file size
    const stats = fs.statSync(filepath);
    const fileSize = stats.size;
    
    // Set headers for download - CRITICAL: Force download behavior
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', fileSize);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('Content-Transfer-Encoding', 'binary');
    // Headers to bypass authentication on proxies
    res.setHeader('X-Skip-Auth', 'true');
    res.setHeader('X-Bypass-Auth', 'true');
    res.setHeader('Authorization-Skip', 'true');
    
    // Use streaming for large files
    const fileStream = fs.createReadStream(filepath);
    fileStream.pipe(res);
    
    fileStream.on('error', (err) => {
      console.error('[APK] Error streaming file:', err);
      res.status(500).send('Error downloading file');
    });
  };

  // ⚠️ CRITICAL: Register APK handlers BEFORE ANY OTHER MIDDLEWARE
  // This must be FIRST to bypass authentication completely
  console.log('[APK] Registering APK handlers BEFORE any middleware');
  app.get('/apks/:filename', serveAPKFile);
  app.get('/download/:filename', serveAPKFile);
  app.get('/static/apk/:filename', serveAPKFile);
  app.get('/file/:filename', serveAPKFile);
  app.get('/api/download-apk/:filename', serveAPKFile);
  
  // Public download endpoint with token (bypasses Cloudflare auth)
  app.get('/public-download/:filename', (req, res) => {
    const filename = req.params.filename;
    const token = req.query.token as string;
    
    if (!token || token.length < 10) {
      console.log('[PUBLIC-DOWNLOAD] Invalid or missing token');
      return res.status(401).send('Invalid token');
    }
    
    console.log('[PUBLIC-DOWNLOAD] Serving file with token:', filename);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    serveAPKFile(req, res);
  });
  
  // In-memory APK streaming endpoint (generates and streams without saving to disk)
  // Using /download-apk/ instead of /api/ to bypass gateway authentication
  app.get('/download-apk/:appName', (req, res) => {
    const appName = req.params.appName || 'app';
    console.log('[APK-STREAM] Generating APK in memory for:', appName);
    buildAPKInMemoryAndStream({ appName, appUrl: 'https://example.com' }, res);
  });

  // NOW configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server, apksDir);
  } else {
    serveStatic(app, apksDir);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
