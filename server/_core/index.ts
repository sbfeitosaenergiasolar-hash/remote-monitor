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
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // APK Download Route - serve APK files from public/apks
  app.get("/apks/:filename", (req, res) => {
    const apkPath = path.join(process.cwd(), 'public', 'apks', req.params.filename);
    
    // Verificar se arquivo existe
    if (!fs.existsSync(apkPath)) {
      console.warn(`APK file not found at ${apkPath}`);
      return res.status(404).json({ 
        error: "APK not found",
        message: "O arquivo APK não foi encontrado."
      });
    }
    
    // Configurar headers corretos para download
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
    
    // Fazer download do arquivo
    res.download(apkPath, req.params.filename, (err) => {
      if (err) {
        console.error("APK download error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Erro ao fazer download do APK" });
        }
      }
    });
  });

  // APK Download Route (legacy)
  app.get("/download-apk", (req, res) => {
    const apkPath = process.env.APK_PATH || "./FazTudo-Monitor.apk";
    
    // Verificar se arquivo existe antes de tentar fazer download
    if (!fs.existsSync(apkPath)) {
      console.warn(`APK file not found at ${apkPath}`);
      return res.status(404).json({ 
        error: "APK not found",
        message: "O arquivo APK ainda não foi gerado. Por favor, acesse o painel e clique em 'Build APK'."
      });
    }
    
    // Configurar headers corretos para download
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', 'attachment; filename="FazTudo-Monitor.apk"');
    
    // Fazer download do arquivo
    res.download(apkPath, "FazTudo-Monitor.apk", (err) => {
      if (err) {
        console.error("APK download error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Erro ao fazer download do APK" });
        }
      }
    });
  });

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
