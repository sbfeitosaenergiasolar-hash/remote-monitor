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
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Serve APK files directly from public/apks - MUST be before all other middleware
  const apksDir = process.env.NODE_ENV === 'production' 
    ? '/app/public/apks'
    : path.join(process.cwd(), 'public', 'apks');
  
  console.log(`[APK] Serving APK files from: ${apksDir}`);
  
  app.use('/apks', (req, res, next) => {
    console.log(`[APK] Request to /apks${req.path}`);
    next();
  });
  
  app.use('/apks', express.static(apksDir, {
    setHeaders: (res, filePath) => {
      console.log(`[APK] Serving file: ${filePath}`);
      res.setHeader('Content-Type', 'application/vnd.android.package-archive');
      res.setHeader('Content-Disposition', `attachment; filename="${filePath.split('/').pop()}"`);
    }
  }));



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
    await setupVite(app, server);
  } else {
    serveStatic(app);
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
