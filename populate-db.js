import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { INITIAL_DATA } from './src/lib/data.js';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const populateDatabase = async () => {
  try {
    const connection = await pool.getConnection();

    // Clear existing data
    for (const table of Object.keys(INITIAL_DATA)) {
      await connection.execute(`DELETE FROM ${table}`);
    }

    // Insert data
    for (const [table, items] of Object.entries(INITIAL_DATA)) {
      for (const item of items) {
        const columns = Object.keys(item).join(', ');
        const placeholders = Object.keys(item).map(() => '?').join(', ');
        const values = Object.values(item);

        await connection.execute(
          `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
          values
        );
      }
    }

    // Insert admin user if not exists
    const [existingAdmin] = await connection.execute('SELECT * FROM admin WHERE username = ?', ['admin']);
    if (existingAdmin.length === 0) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await connection.execute(
        `INSERT INTO admin (id, username, password) VALUES (?, ?, ?)`,
        [uuidv4(), 'admin', hashedPassword]
      );
    }

    connection.release();
    console.log('Database populated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
};

populateDatabase();
