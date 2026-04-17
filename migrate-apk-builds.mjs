import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL não está definida!');
    process.exit(1);
  }

  console.log('📦 Conectando ao banco de dados...');
  
  try {
    const connection = await mysql.createConnection(databaseUrl);
    console.log('✅ Conectado ao banco de dados!');

    // Ler arquivo SQL
    const sqlPath = path.join(__dirname, 'drizzle/migrations/0002_create_apk_builds_table.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');
    
    console.log('📝 Executando migração SQL...');
    
    // Executar cada comando SQL separadamente
    const commands = sql.split(';').filter(cmd => cmd.trim());
    
    for (const command of commands) {
      if (command.trim()) {
        console.log(`  → ${command.trim().substring(0, 50)}...`);
        await connection.execute(command);
      }
    }
    
    console.log('✅ Migração concluída com sucesso!');
    
    // Verificar se tabela foi criada
    const [tables] = await connection.execute(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'apkBuilds'"
    );
    
    if (tables.length > 0) {
      console.log('✅ Tabela apkBuilds criada com sucesso!');
    } else {
      console.error('❌ Tabela apkBuilds não foi criada!');
    }
    
    await connection.end();
  } catch (error) {
    console.error('❌ Erro ao executar migração:', error.message);
    process.exit(1);
  }
}

runMigration();
