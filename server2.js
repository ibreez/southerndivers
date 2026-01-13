import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

// Initial data
const INITIAL_DATA = {
  courses: [
    {
      id: uuidv4(),
      title: 'Beginner Diver',
      level: 'Open Water',
      description: 'Perfect for first-time divers. Learn the fundamentals of scuba diving in a safe, controlled environment.',
      duration: '3-4 Days',
      maxDepth: '18m',
      price: '$450',
      includes: JSON.stringify(['Theory Sessions', 'Pool Training', 'Open Water Dives', 'PADI Certification']),
    },
    {
      id: uuidv4(),
      title: 'Advanced Diver',
      level: 'Advanced Open Water',
      description: 'Enhance your skills with specialty dives including deep diving, navigation, and night diving.',
      duration: '2-3 Days',
      maxDepth: '30m',
      price: '$350',
      includes: JSON.stringify(['5 Adventure Dives', 'Deep Dive', 'Navigation Dive', 'PADI Certification']),
    },
    {
      id: uuidv4(),
      title: 'Professional Diver',
      level: 'Divemaster',
      description: 'Take the first step in your diving career. Become a certified diving professional.',
      duration: '2-4 Weeks',
      maxDepth: '40m',
      price: '$1,200',
      includes: JSON.stringify(['Leadership Training', 'Dive Theory', 'Practical Assessment', 'PADI Certification']),
    },
  ],
  excursions: [
    {
      id: uuidv4(),
      title: 'Reef Dive Adventure',
      location: 'Gan House Reef',
      duration: '2-3 Hours',
      price: '$75',
      description: 'Explore vibrant coral gardens teeming with tropical fish, octopus, and moray eels.',
      image: 'https://images.unsplash.com/photo-1637308105868-a09e02c74a87?w=600&h=400&fit=crop',
    },
    {
      id: uuidv4(),
      title: 'Manta Point Experience',
      location: 'Manta Point',
      duration: '3-4 Hours',
      price: '$120',
      description: 'Swim alongside majestic manta rays at their famous cleaning station.',
      image: 'https://images.unsplash.com/photo-1623468020653-b0682380e56b?w=600&h=400&fit=crop',
    },
    {
      id: uuidv4(),
      title: 'Night Dive Expedition',
      location: 'Maradhoo Reef',
      duration: '2 Hours',
      price: '$90',
      description: 'Witness the reef come alive at night with bioluminescent creatures and nocturnal hunters.',
      image: 'https://images.unsplash.com/photo-1682919266273-ce10dbeece41?w=600&h=400&fit=crop',
    },
    {
      id: uuidv4(),
      title: 'Wreck Diving',
      location: 'British Loyalty Wreck',
      duration: '3-4 Hours',
      price: '$110',
      description: 'Explore the historic WWII tanker wreck, home to schools of barracuda and lionfish.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
    },
    {
      id: uuidv4(),
      title: 'Shark Point Safari',
      location: 'Shark Point',
      duration: '3 Hours',
      price: '$100',
      description: 'Encounter grey reef sharks, nurse sharks, and other pelagic species in their natural habitat.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    },
    {
      id: uuidv4(),
      title: 'Turtle Sanctuary Dive',
      location: 'Turtle Beach',
      duration: '2-3 Hours',
      price: '$85',
      description: 'Dive with green and hawksbill turtles in their protected feeding grounds.',
      image: 'https://images.unsplash.com/photo-1586281139831-ad877c2d3ff7?w=600&h=400&fit=crop',
    },
  ],
  packages: [
    {
      id: uuidv4(),
      name: 'Beginner Package',
      price: '$599',
      popular: false,
      description: 'Perfect for first-time divers',
      features: JSON.stringify(['Open Water Course', '4 Guided Dives', 'Equipment Rental', 'Underwater Photos', 'PADI Certification']),
    },
    {
      id: uuidv4(),
      name: 'Adventure Package',
      price: '$899',
      popular: true,
      description: 'Most popular choice',
      features: JSON.stringify(['Advanced Course', '8 Guided Dives', 'Equipment Rental', 'Underwater Photos & Videos', 'Night Dive Experience', 'Manta Point Visit', 'PADI Certification']),
    },
    {
      id: uuidv4(),
      name: 'Pro Package',
      price: '$1,499',
      popular: false,
      description: 'For serious divers',
      features: JSON.stringify(['Divemaster Course', '15 Guided Dives', 'Premium Equipment', 'Professional Photo Package', 'All Specialty Dives', 'Wreck & Night Dives', 'Marine Conservation Workshop', 'PADI Certification']),
    },
  ],
  gallery: [
    { id: uuidv4(), type: 'photo', alt: 'Underwater coral reef', url: 'https://images.unsplash.com/photo-1637308105868-a09e02c74a87?w=600&h=400&fit=crop' },
    { id: uuidv4(), type: 'photo', alt: 'Diver with sea turtle', url: 'https://images.unsplash.com/photo-1586281139831-ad877c2d3ff7?w=600&h=400&fit=crop' },
    { id: uuidv4(), type: 'photo', alt: 'School of tropical fish', url: 'https://images.unsplash.com/photo-1701691796571-48cf3e302b57?w=600&h=400&fit=crop' },
    { id: uuidv4(), type: 'photo', alt: 'Manta ray closeup', url: 'https://images.unsplash.com/photo-1623468020653-b0682380e56b?w=600&h=400&fit=crop' },
    { id: uuidv4(), type: 'photo', alt: 'Diving group underwater', url: 'https://images.unsplash.com/photo-1699435558233-baf4214e7432?w=600&h=400&fit=crop' },
    { id: uuidv4(), type: 'photo', alt: 'Colorful marine life', url: 'https://images.unsplash.com/photo-1701968145515-1202e898baaa?w=600&h=400&fit=crop' },
    { id: uuidv4(), type: 'photo', alt: 'Sunset boat dive', url: 'https://images.unsplash.com/photo-1697635884187-ea419ad6912f?w=600&h=400&fit=crop' },
    { id: uuidv4(), type: 'photo', alt: 'Night dive bioluminescence', url: 'https://images.unsplash.com/photo-1682919266273-ce10dbeece41?w=600&h=400&fit=crop' },
  ],
  reviews: [
    {
      id: uuidv4(),
      name: 'Sarah Johnson',
      country: 'United States',
      rating: 5,
      text: 'Absolutely incredible experience! The instructors were professional, patient, and made me feel safe throughout.',
      course: 'Open Water Course',
    },
    {
      id: uuidv4(),
      name: 'Marco Rossi',
      country: 'Italy',
      rating: 5,
      text: 'Best diving center in the Maldives! The equipment was top-notch, and seeing manta rays up close was a dream come true.',
      course: 'Advanced Course',
    },
    {
      id: uuidv4(),
      name: 'Yuki Tanaka',
      country: 'Japan',
      rating: 5,
      text: 'Professional team, beautiful dive sites, and excellent organization. The night dive was magical!',
      course: 'Night Dive Experience',
    },
  ],
  team: [
    { id: uuidv4(), name: 'Ahmed "Sharky" Rasheed', role: 'Lead Instructor', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
    { id: uuidv4(), name: 'Elena Costa', role: 'Marine Biologist', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
    { id: uuidv4(), name: 'Mike Williams', role: 'Divemaster', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
  ],
  services: [
    { id: uuidv4(), name: 'Beginner Courses', description: 'Start your journey' },
    { id: uuidv4(), name: 'Advanced Training', description: 'Level up skills' },
    { id: uuidv4(), name: 'Professional Certification', description: 'Go pro' },
    { id: uuidv4(), name: 'Equipment Rental', description: 'Top gear' },
    { id: uuidv4(), name: 'Guided Dives', description: 'Explore safely' },
  ],
};

// Create database if not exists
const tempConnection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
});
await tempConnection.execute('CREATE DATABASE IF NOT EXISTS `diving_center`');
await tempConnection.end();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'diving_center',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize database tables
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();

    // Create tables
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS courses (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        level VARCHAR(100),
        description TEXT,
        duration VARCHAR(50),
        maxDepth VARCHAR(50),
        price VARCHAR(50),
        includes JSON
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS excursions (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        duration VARCHAR(50),
        price VARCHAR(50),
        description TEXT,
        image TEXT
      )
    `);

    // Add image column if not exists (for existing tables)
    try {
      await connection.execute(`ALTER TABLE excursions ADD COLUMN image TEXT`);
    } catch (error) {
      // Column might already exist, ignore
      console.log('Column image already exists or error:', error.message);
    }

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS packages (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(50),
        popular BOOLEAN DEFAULT FALSE,
        description TEXT,
        features JSON
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS gallery (
        id VARCHAR(36) PRIMARY KEY,
        type VARCHAR(50),
        alt VARCHAR(255),
        url TEXT
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        country VARCHAR(100),
        rating INT,
        text TEXT,
        course VARCHAR(255)
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS team (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        image TEXT
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin (
        id VARCHAR(36) PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);

    connection.release();
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// API Routes
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.execute('SELECT * FROM admin WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const admin = rows[0];
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/:resource', async (req, res) => {
  try {
    const { resource } = req.params;
    if (resource === 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const [rows] = await pool.execute(`SELECT * FROM ${resource}`);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/:resource', async (req, res) => {
  try {
    const { resource } = req.params;
    if (resource === 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const data = req.body;

    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const [result] = await pool.execute(
      `INSERT INTO ${resource} (${columns}) VALUES (${placeholders})`,
      values
    );

    res.json({ id: result.insertId, ...data });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/:resource/:id', async (req, res) => {
  try {
    const { resource, id } = req.params;
    if (resource === 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    const data = req.body;

    const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];

    await pool.execute(`UPDATE ${resource} SET ${updates} WHERE id = ?`, values);

    res.json({ id, ...data });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/:resource/:id', async (req, res) => {
  try {
    const { resource, id } = req.params;
    if (resource === 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    await pool.execute(`DELETE FROM ${resource} WHERE id = ?`, [id]);

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Temporary route to alter table
app.post('/api/alter-excursions', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.execute(`ALTER TABLE excursions ADD COLUMN IF NOT EXISTS image TEXT`);
    connection.release();
    res.json({ message: 'Table altered successfully' });
  } catch (error) {
    console.error('Error altering table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Temporary route to populate data
app.post('/api/populate', async (req, res) => {
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
      const bcrypt = await import('bcrypt');
      const hashedPassword = await bcrypt.hash('admin', 10);
      await connection.execute(
        `INSERT INTO admin (id, username, password) VALUES (?, ?, ?)`,
        [uuidv4(), 'admin', hashedPassword]
      );
    }

    connection.release();
    res.json({ message: 'Database populated successfully' });
  } catch (error) {
    console.error('Error populating database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
