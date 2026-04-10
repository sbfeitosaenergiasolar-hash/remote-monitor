import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const url = new URL(DATABASE_URL);

const pool = mysql.createPool({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: {
    rejectUnauthorized: false,
  },
});

const migrations = [
  `CREATE TABLE IF NOT EXISTS \`users\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`openId\` varchar(64) NOT NULL,
	\`name\` text,
	\`email\` varchar(320),
	\`passwordHash\` varchar(255),
	\`loginMethod\` varchar(64),
	\`role\` enum('user','admin') NOT NULL DEFAULT 'user',
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	\`lastSignedIn\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`users_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`users_openId_unique\` UNIQUE(\`openId\`)
);`,
];

async function runMigrations() {
  const connection = await pool.getConnection();

  try {
    for (const migration of migrations) {
      console.log("Running migration...");
      await connection.query(migration);
      console.log("✓ Migration completed");
    }

    console.log("All migrations completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await connection.release();
    await pool.end();
  }
}

runMigrations();
