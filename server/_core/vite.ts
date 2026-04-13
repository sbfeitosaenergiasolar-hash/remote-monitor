import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: express.Express, server: Server) {
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

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

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

export function serveStatic(app: Express) {
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

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) {
      console.error(`index.html not found at ${indexPath}`);
      return res.status(404).send("index.html not found");
    }
    res.sendFile(indexPath);
  });
}
