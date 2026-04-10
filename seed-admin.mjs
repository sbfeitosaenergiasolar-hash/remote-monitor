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

async function seedAdmin() {
  const connection = await pool.getConnection();

  try {
    // Insert admin user with password hash for "Mm102030@@"
    const query = `
      INSERT INTO \`users\` (\`openId\`, \`name\`, \`email\`, \`passwordHash\`, \`loginMethod\`, \`role\`)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        \`name\` = VALUES(\`name\`),
        \`email\` = VALUES(\`email\`),
        \`passwordHash\` = VALUES(\`passwordHash\`),
        \`loginMethod\` = VALUES(\`loginMethod\`),
        \`role\` = VALUES(\`role\`)
    `;

    const values = [
      "admin-openid-123", // openId
      "Admin", // name
      "admin@faztudo.com", // email
      "2adf91de7f65d4bb3c4cb767138e4da8a44f7fccb6e36ce9d86676b4336515cf", // passwordHash (SHA256 of "Mm102030@@")
      "email", // loginMethod
      "admin", // role
    ];

    console.log("Inserting admin user...");
    const [result] = await connection.query(query, values);
    console.log("✓ Admin user inserted/updated:", result);

    // Verify the user was inserted
    const [rows] = await connection.query(
      "SELECT id, email, role FROM `users` WHERE email = ?",
      ["admin@faztudo.com"]
    );
    console.log("✓ Verification - User in database:", rows[0]);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await connection.release();
    await pool.end();
  }
}

seedAdmin();
