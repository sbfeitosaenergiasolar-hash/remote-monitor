import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

async function runMigrations() {
  try {
    console.log('🔄 Connecting to database...');
    
    // Parse DATABASE_URL
    const url = new URL(DATABASE_URL);
    const connection = await mysql.createConnection({
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0,
      ssl: {},
    });

    console.log('✅ Connected!');
    console.log('🔄 Running migrations...');

    // Read and execute migration files
    const migrationsDir = './drizzle';
    const migrationFiles = [
      '0000_steep_vanisher.sql',
      '0001_blushing_fat_cobra.sql',
      '0002_lying_retro_girl.sql',
      '0003_giant_imperial_guard.sql',
      '0004_magenta_starhawk.sql',
      '0005_lame_chronomancer.sql',
    ];

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      if (!fs.existsSync(filePath)) {
        console.log(`⏭️  Skipping ${file} (not found)`);
        continue;
      }

      const sql = fs.readFileSync(filePath, 'utf-8');
      
      // Split by statement-breakpoint and execute each statement
      const statements = sql.split('--> statement-breakpoint').map(s => s.trim()).filter(s => s);
      
      for (const statement of statements) {
        try {
          console.log(`  ⚙️  Executing: ${statement.substring(0, 50)}...`);
          await connection.query(statement);
        } catch (err) {
          // Ignore "already exists" errors
          if (err.code === 'ER_TABLE_EXISTS_ERROR' || err.code === 'ER_DUP_KEYNAME' || err.code === 'ER_CANT_DROP_FIELD_OR_KEY') {
            console.log(`  ⚠️  Skipped (already exists): ${err.message.substring(0, 50)}`);
          } else {
            console.error(`  ❌ Error: ${err.message}`);
            throw err;
          }
        }
      }
      
      console.log(`✅ ${file} completed`);
    }

    // Insert admin user
    console.log('🔄 Inserting admin user...');
    try {
      await connection.query(
        'INSERT IGNORE INTO `users` (`openId`, `email`, `passwordHash`, `loginMethod`, `role`, `name`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())',
        ['admin-user-001', 'admin@faztudo.com', '2adf91de7f65d4bb3c4cb767138e4da8a44f7fccb6e36ce9d86676b4336515cf', 'email', 'admin', 'Admin User']
      );
      console.log('✅ Admin user inserted');
    } catch (err) {
      console.error('❌ Error inserting admin user:', err.message);
    }

    // Verify
    console.log('🔄 Verifying...');
    const [users] = await connection.query('SELECT COUNT(*) as count FROM `users`');
    console.log(`✅ Total users: ${users[0].count}`);

    await connection.end();
    console.log('✅ All migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigrations();
