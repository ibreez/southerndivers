import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    { id: uuidv4(), type: 'photo', alt: 'Underwater coral reef', url: 'https://images.unsplash.com/photo-1637308105868-a09e02c74a87?w=600&h=400&fit=crop', categories: JSON.stringify(['coral gardens', 'marine life']) },
    { id: uuidv4(), type: 'photo', alt: 'Diver with sea turtle', url: 'https://images.unsplash.com/photo-1586281139831-ad877c2d3ff7?w=600&h=400&fit=crop', categories: JSON.stringify(['sea turtles', 'marine life']) },
    { id: uuidv4(), type: 'photo', alt: 'School of tropical fish', url: 'https://images.unsplash.com/photo-1701691796571-48cf3e302b57?w=600&h=400&fit=crop', categories: JSON.stringify(['coral gardens', 'marine life']) },
    { id: uuidv4(), type: 'photo', alt: 'Manta ray closeup', url: 'https://images.unsplash.com/photo-1623468020653-b0682380e56b?w=600&h=400&fit=crop', categories: JSON.stringify(['manta rays', 'marine life']) },
    { id: uuidv4(), type: 'photo', alt: 'Diving group underwater', url: 'https://images.unsplash.com/photo-1699435558233-baf4214e7432?w=600&h=400&fit=crop', categories: JSON.stringify(['coral gardens', 'dive']) },
    { id: uuidv4(), type: 'photo', alt: 'Colorful marine life', url: 'https://images.unsplash.com/photo-1701968145515-1202e898baaa?w=600&h=400&fit=crop', categories: JSON.stringify(['coral gardens', 'marine life']) },
    { id: uuidv4(), type: 'photo', alt: 'Sunset boat dive', url: 'https://images.unsplash.com/photo-1697635884187-ea419ad6912f?w=600&h=400&fit=crop', categories: JSON.stringify(['coral gardens', 'dive']) },
    { id: uuidv4(), type: 'photo', alt: 'Night dive bioluminescence', url: 'https://images.unsplash.com/photo-1682919266273-ce10dbeece41?w=600&h=400&fit=crop', categories: JSON.stringify(['coral gardens', 'dive']) },
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
//const tempConnection = await mysql.createConnection({
 // host: process.env.DB_HOST || 'localhost',
//  user: process.env.DB_USER || 'root',
//  password: process.env.DB_PASSWORD || '',
//});
//await tempConnection.execute('CREATE DATABASE IF NOT EXISTS `diving_center`');
//await tempConnection.end();

const app = express();
const PORT = process.env.PORT || 5000;



// Middleware
app.use(cors());
app.use(express.json());

// Serve React build
const reactDistPath = path.join(__dirname, 'dist');
app.use(express.static(reactDistPath));


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
        url TEXT,
        categories JSON
      )
    `);

    // Add categories column if not exists (for existing tables)
    try {
      await connection.execute(`ALTER TABLE gallery ADD COLUMN categories JSON`);
    } catch (error) {
      // Column might already exist, ignore
      console.log('Column categories already exists or error:', error.message);
    }

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


// SPA fallback: return index.html for all unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(reactDistPath, 'index.html'));
});


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

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Check database connection
    const dbConnection = await pool.getConnection();
    const dbStatus = 'healthy';

    // Check server status
    const serverStatus = 'running';
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const timestamp = new Date().toISOString();

    // Check database tables
    let tableCount = 0;
    try {
      const [tables] = await dbConnection.query('SHOW TABLES');
      tableCount = tables ? tables.length : 0;
    } catch (tableError) {
      console.log('Could not fetch tables:', tableError.message);
    }

    dbConnection.release();

    res.json({
      status: 'healthy',
      timestamp: timestamp,
      server: {
        status: serverStatus,
        uptime: `${Math.floor(uptime / 60)} minutes`,
        memory: {
          rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
          heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
          heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`
        }
      },
      database: {
        status: dbStatus,
        connectionPool: {
          totalConnections: pool._allConnections ? pool._allConnections.length : 0,
          freeConnections: pool._freeConnections ? pool._freeConnections.length : 0,
          pendingAcquires: pool._pendingAcquires ? pool._pendingAcquires.length : 0
        },
        tables: tableCount
      },
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch
      }
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
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

    // Generate ID if missing
    if (!data.id) {
      data.id = uuidv4();
    }

    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const [result] = await pool.execute(
      `INSERT INTO ${resource} (${columns}) VALUES (${placeholders})`,
      values
    );

    res.json({ id: data.id, ...data });
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

    let query;
    let values;

    if (id && id.trim() !== '') {
      // Normal update by id
      const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
      query = `UPDATE ${resource} SET ${updates} WHERE id = ?`;
      values = [...Object.values(data), id];
    } else {
      // Special case for gallery: update by url and alt if id is empty
      if (resource === 'gallery' && data.url && data.alt) {
        const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
        query = `UPDATE ${resource} SET ${updates} WHERE url = ? AND alt = ?`;
        values = [...Object.values(data), data.url, data.alt];
      } else {
        return res.status(400).json({ error: 'Cannot update item without valid ID or unique fields' });
      }
    }

    const [result] = await pool.execute(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ id: id || data.id, ...data });
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

// Enrollment endpoint with email notification
app.post('/api/enroll', async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;

    // Create email content
    const emailContent = `
      <h2>New Enrollment Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Course:</strong> ${course}</p>
      <p><strong>Message:</strong> ${message || 'No additional message'}</p>
    `;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Southern Maldives Dive Center" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Enrollment Request for ${course}`,
      html: emailContent,
    });

    res.json({ message: 'Enrollment request sent successfully' });
  } catch (error) {
    console.error('Error sending enrollment email:', error);
    res.status(500).json({ error: 'Failed to send enrollment request' });
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

// Temporary route to fix empty IDs in gallery
app.post('/api/fix-gallery-ids', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Get all gallery items with empty or null ids
    const [rows] = await connection.execute('SELECT * FROM gallery WHERE id = "" OR id IS NULL');

    for (const item of rows) {
      const newId = uuidv4();
      await connection.execute('UPDATE gallery SET id = ? WHERE url = ? AND alt = ?', [newId, item.url, item.alt]);
    }

    connection.release();
    res.json({ message: `Fixed ${rows.length} gallery items with empty IDs` });
  } catch (error) {
    console.error('Error fixing gallery IDs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Temporary route to migrate category to categories
app.post('/api/migrate-gallery-categories', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Get all gallery items
    const [rows] = await connection.execute('SELECT * FROM gallery');

    let migratedCount = 0;
    for (const item of rows) {
      if (item.category && !item.categories) {
        // Convert single category to categories array
        const categories = JSON.stringify([item.category]);
        await connection.execute('UPDATE gallery SET categories = ?, category = NULL WHERE id = ?', [categories, item.id]);
        migratedCount++;
      }
    }

    connection.release();
    res.json({ message: `Migrated ${migratedCount} gallery items from category to categories` });
  } catch (error) {
    console.error('Error migrating gallery categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
