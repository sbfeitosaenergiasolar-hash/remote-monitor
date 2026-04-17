import mysql from "mysql2/promise";
import { ENV } from "./env";

export async function runMigrations() {
  try {
    console.log("[Migrations] Iniciando migrações...");

    if (!process.env.DATABASE_URL) {
      console.warn("[Migrations] DATABASE_URL não configurado, pulando migrações");
      return;
    }

    // Parse DATABASE_URL
    const url = new URL(process.env.DATABASE_URL);
    const connection = await mysql.createConnection({
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      port: url.port ? parseInt(url.port) : 3306,
      ssl: { rejectUnauthorized: false },
    });

    // Criar tabela apkBuilds
    const createApkBuildsTable = `
      CREATE TABLE IF NOT EXISTS apkBuilds (
        id int AUTO_INCREMENT PRIMARY KEY,
        userId int NOT NULL,
        appName varchar(255) NOT NULL,
        appUrl text NOT NULL,
        logoUrl text,
        protectFromUninstall int NOT NULL DEFAULT 1,
        downloadUrl text NOT NULL,
        githubReleaseUrl text,
        filename varchar(255) NOT NULL,
        fileSize int,
        status ENUM('building', 'success', 'failed') NOT NULL DEFAULT 'building',
        errorMessage text,
        createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(createApkBuildsTable);
    console.log("[Migrations] ✅ Tabela apkBuilds criada/verificada");

    // Criar índice
    const createIndex = `
      CREATE INDEX IF NOT EXISTS apkBuilds_userId_idx ON apkBuilds(userId)
    `;

    await connection.execute(createIndex);
    console.log("[Migrations] ✅ Índice apkBuilds_userId_idx criado/verificado");

    await connection.end();
    console.log("[Migrations] ✅ Todas as migrações concluídas!");
  } catch (error) {
    console.error("[Migrations] ❌ Erro ao executar migrações:", error);
    // Não lançar erro para não quebrar o servidor
  }
}
