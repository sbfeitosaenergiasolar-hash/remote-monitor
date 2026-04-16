import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: express.Express, server: Server, apksDir?: string) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  // Register APK handler BEFORE Vite middleware to prevent interception
  if (apksDir) {
    console.log(`[APK] Registering /apks/ handler for directory: ${apksDir}`);
    app.get('/apks/:filename', (req, res) => {
      const filename = req.params.filename;
      // Sanitize filename to prevent directory traversal
      if (filename.includes('..') || filename.includes('/')) {
        console.warn(`[APK] Invalid filename attempt: ${filename}`);
        return res.status(400).send('Invalid filename');
      }
      const apkPath = path.join(apksDir, filename);
      
      console.log(`[APK] Request for: ${filename}`);
      console.log(`[APK] Full path: ${apkPath}`);
      console.log(`[APK] File exists: ${fs.existsSync(apkPath)}`);
      
      if (!fs.existsSync(apkPath)) {
        console.warn(`[APK] File not found: ${apkPath}`);
        return res.status(404).send('APK not found');
      }
      
      console.log(`[APK] Serving file: ${apkPath}`);
      res.setHeader('Content-Type', 'application/vnd.android.package-archive');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      // Headers to bypass Cloudflare/proxy authentication
      res.setHeader('X-Skip-Auth', 'true');
      res.setHeader('X-Bypass-Auth', 'true');
      res.setHeader('Authorization-Skip', 'true');
      res.setHeader('X-Accel-Buffering', 'no');
      
      res.sendFile(apkPath);
    });
  }

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    
    // Skip this middleware for /apks/ routes - they should be handled by the static handler
    if (url.startsWith('/apks/')) {
      console.log(`[APK] Skipping Vite middleware for: ${url}`);
      return next();
    }

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express, apksDir?: string) {
  // Use process.cwd() as fallback if import.meta.dirname is undefined
  const baseDir = import.meta.dirname || process.cwd();
  
  // Try multiple possible paths for dist/public - prioritize dist/public over source public
  const possiblePaths = [
    path.resolve(process.cwd(), "dist/public"),   // /app/dist/public (using cwd) - FIRST PRIORITY
    path.resolve(baseDir, "dist/public"),         // /app/dist/public (if baseDir is /app)
    path.resolve(baseDir, "../../dist/public"),   // /app/dist/public (if baseDir is /app/dist/server/_core)
    path.resolve(baseDir, "../../../dist/public"), // /app/dist/public (if baseDir is /app/dist/server/_core/...)
    path.resolve(baseDir, "../public"),           // /app/dist/public (if baseDir is /app/dist)
    path.resolve(process.cwd(), "public"),        // /app/public (fallback to source public)
  ];
  
  let distPath = possiblePaths[0];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      distPath = p;
      break;
    }
  }
  
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory. Tried: ${possiblePaths.join(", ")}. baseDir: ${baseDir}, NODE_ENV: ${process.env.NODE_ENV}`
    );
  } else {
    console.log(`[Static] Serving from: ${distPath}`);
  }

  // APK handlers already registered in index.ts BEFORE this function is called
  // Register APK handlers for production (as fallback)
  if (apksDir) {
    // Handle /apks/:filename
    app.get('/apks/:filename', (req, res) => {
      const filename = req.params.filename;
      const apkPath = path.join(apksDir, filename);
      
      console.log(`[APK] Request for: ${filename}`);
      console.log(`[APK] Full path: ${apkPath}`);
      console.log(`[APK] File exists: ${fs.existsSync(apkPath)}`);
      
      if (!fs.existsSync(apkPath)) {
        console.warn(`[APK] File not found: ${apkPath}`);
        return res.status(404).json({ error: 'APK not found' });
      }
      
      console.log(`[APK] Serving file: ${apkPath}`);
      res.setHeader('Content-Type', 'application/vnd.android.package-archive');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      res.sendFile(apkPath);
    });
    
    // Handle /api/download-apk/:filename
    app.get('/api/download-apk/:filename', (req, res) => {
      const filename = req.params.filename;
      // Sanitize filename to prevent directory traversal
      if (filename.includes('..') || filename.includes('/')) {
        return res.status(400).send('Invalid filename');
      }
      const apkPath = path.join(apksDir, filename);
      
      console.log(`[APK] Request for: ${filename}`);
      console.log(`[APK] Full path: ${apkPath}`);
      console.log(`[APK] File exists: ${fs.existsSync(apkPath)}`);
      
      if (!fs.existsSync(apkPath)) {
        console.warn(`[APK] File not found: ${apkPath}`);
        return res.status(404).send('APK file not found');
      }
      
      console.log(`[APK] Serving file: ${apkPath}`);
      res.setHeader('Content-Type', 'application/vnd.android.package-archive');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('X-Accel-Buffering', 'no');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      
      res.sendFile(apkPath);
    });
    
    // Handle /download/:filename (simpler endpoint for Railway compatibility)
    app.get('/download/:filename', (req, res) => {
      const filename = req.params.filename;
      // Sanitize filename to prevent directory traversal
      if (filename.includes('..') || filename.includes('/')) {
        return res.status(400).send('Invalid filename');
      }
      const apkPath = path.join(apksDir, filename);
      
      console.log(`[APK-DOWNLOAD] Request for: ${filename}`);
      console.log(`[APK-DOWNLOAD] Full path: ${apkPath}`);
      console.log(`[APK-DOWNLOAD] File exists: ${fs.existsSync(apkPath)}`);
      
      if (!fs.existsSync(apkPath)) {
        console.warn(`[APK-DOWNLOAD] File not found: ${apkPath}`);
        return res.status(404).send('APK file not found');
      }
      
      console.log(`[APK-DOWNLOAD] Serving file: ${apkPath}`);
      res.setHeader('Content-Type', 'application/vnd.android.package-archive');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('X-Accel-Buffering', 'no');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      
      res.sendFile(apkPath);
    });
  }

  // CRITICAL: Serve static files BEFORE SPA fallback
  // This prevents /apks/* and other static files from being caught by the SPA fallback
  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist (but NOT for /apks, /api/download-apk, /api/apk-download, or /download routes)
  app.use("*", (req, res) => {
    // Skip index.html fallback for /apks, /api/download-apk, /api/apk-download, and /download routes
    if (req.originalUrl.startsWith('/apks/') || req.originalUrl.startsWith('/api/download-apk/') || req.originalUrl.startsWith('/api/apk-download/') || req.originalUrl.startsWith('/download/')) {
      return res.status(404).json({ error: 'APK not found' });
    }
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) {
      console.error(`index.html not found at ${indexPath}`);
      return res.status(404).send("index.html not found");
    }
    res.sendFile(indexPath);
  });
}
