import { getDb } from "./db";
import { sql } from "drizzle-orm";

export async function runMigrations() {
  try {
    console.log("🔄 Verificando migrações...");

    const db = await getDb();
    if (!db) {
      console.warn("⚠️ Database não disponível, pulando migrações");
      return;
    }

    // Check if settings table exists
    const result = await db.execute(
      sql`SELECT COUNT(*) as count FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'settings'`
    );

    const tableExists = (result[0] as any).count > 0;

    if (!tableExists) {
      console.log("📝 Criando tabela settings...");

      // Create settings table
      await db.execute(sql`
        CREATE TABLE \`settings\` (
          \`id\` int AUTO_INCREMENT NOT NULL,
          \`userId\` int NOT NULL,
          \`processName\` varchar(255) NOT NULL DEFAULT '_Remote.exe',
          \`modulePath\` text NOT NULL,
          \`hideFromDebugger\` int NOT NULL DEFAULT 0,
          \`stealthInject\` int NOT NULL DEFAULT 0,
          \`hideModule\` int NOT NULL DEFAULT 0,
          \`erasePE\` int NOT NULL DEFAULT 0,
          \`autoInject\` int NOT NULL DEFAULT 0,
          \`closeOnInject\` int NOT NULL DEFAULT 0,
          \`createFakeDebugDirectory\` int NOT NULL DEFAULT 0,
          \`createNewEntryPoint\` int NOT NULL DEFAULT 0,
          \`insertExtraSections\` int NOT NULL DEFAULT 0,
          \`modifyAssemblyCode\` int NOT NULL DEFAULT 0,
          \`modifyImportTable\` int NOT NULL DEFAULT 0,
          \`moveRelocationTable\` int NOT NULL DEFAULT 0,
          \`removeDebugData\` int NOT NULL DEFAULT 0,
          \`removeUselessData\` int NOT NULL DEFAULT 0,
          \`renameSections\` int NOT NULL DEFAULT 0,
          \`scrambleHeaderFields\` int NOT NULL DEFAULT 0,
          \`shiftSectionData\` int NOT NULL DEFAULT 0,
          \`shiftSectionMemory\` int NOT NULL DEFAULT 0,
          \`stripSectionCharacteristics\` int NOT NULL DEFAULT 0,
          \`background1\` varchar(64) NOT NULL DEFAULT 'DodgerBlue',
          \`background2\` varchar(64) NOT NULL DEFAULT 'DeepSkyBlue',
          \`textColor\` varchar(64) NOT NULL DEFAULT 'White',
          \`delay\` int NOT NULL DEFAULT 0,
          \`delayBetween\` int NOT NULL DEFAULT 0,
          \`method\` int NOT NULL DEFAULT 0,
          \`createdAt\` timestamp NOT NULL DEFAULT (now()),
          \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
          CONSTRAINT \`settings_id\` PRIMARY KEY(\`id\`)
        )
      `);

      console.log("✅ Tabela settings criada com sucesso!");
    } else {
      console.log("✅ Tabela settings já existe");
    }
  } catch (error) {
    console.error("❌ Erro ao executar migrações:", error);
    // Don't throw - allow server to start even if migration fails
  }
}
