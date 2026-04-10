import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

async function checkUsers() {
  try {
    console.log('🔄 Connecting to database...');
    
    const url = new URL(DATABASE_URL);
    const connection = await mysql.createConnection({
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      ssl: {},
    });

    console.log('✅ Connected!');

    // Check users table
    const [users] = await connection.query('SELECT id, email, passwordHash, role FROM `users`');
    console.log('\n📋 Users in database:');
    console.table(users);

    // Check if admin exists
    const [adminUsers] = await connection.query('SELECT * FROM `users` WHERE email = ?', ['admin@faztudo.com']);
    if (adminUsers.length > 0) {
      console.log('\n✅ Admin user found!');
      console.log(adminUsers[0]);
    } else {
      console.log('\n❌ Admin user NOT found! Inserting...');
      await connection.query(
        'INSERT INTO `users` (`openId`, `email`, `passwordHash`, `loginMethod`, `role`, `name`, `createdAt`, `updatedAt`, `lastSignedIn`) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())',
        ['admin-user-001', 'admin@faztudo.com', '2adf91de7f65d4bb3c4cb767138e4da8a44f7fccb6e36ce9d86676b4336515cf', 'email', 'admin', 'Admin User']
      );
      console.log('✅ Admin user inserted!');
    }

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkUsers();
