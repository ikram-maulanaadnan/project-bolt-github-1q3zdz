import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import axios from 'axios';
import crypto from 'crypto';

// --- KONFIGURASI ---
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET;
const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY;
const NOWPAYMENTS_IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

let pool;

// --- KONEKSI & INISIALISASI DATABASE ---
async function initialize() {
  try {
    pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'trading_academy',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    const connection = await pool.getConnection();
    console.log('Berhasil terhubung ke database MySQL');

    // Buat semua tabel jika belum ada
    await connection.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL UNIQUE, passwordHash VARCHAR(255) NOT NULL, role VARCHAR(50) DEFAULT 'admin')`);
    await connection.query(`CREATE TABLE IF NOT EXISTS packages (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, price VARCHAR(100) NOT NULL, description TEXT, features JSON, popular BOOLEAN DEFAULT false)`);
    await connection.query(`CREATE TABLE IF NOT EXISTS features (id INT AUTO_INCREMENT PRIMARY KEY, icon VARCHAR(50) NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NOT NULL)`);
    await connection.query(`CREATE TABLE IF NOT EXISTS testimonials (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, role VARCHAR(100), content TEXT NOT NULL, rating INT DEFAULT 5)`);
    await connection.query(`CREATE TABLE IF NOT EXISTS faqs (id INT AUTO_INCREMENT PRIMARY KEY, question TEXT NOT NULL, answer TEXT NOT NULL)`);
    await connection.query(`CREATE TABLE IF NOT EXISTS hero_content (id INT PRIMARY KEY DEFAULT 1, title VARCHAR(255), subtitle VARCHAR(255), description TEXT, whatsappNumber VARCHAR(50))`);
    
    console.log('Semua tabel sudah diperiksa dan siap.');
    connection.release();
  } catch (err) {
    console.error("KRITIS: Gagal menginisialisasi database:", err.message);
    process.exit(1);
  }
}

initialize();

// --- API HELPER FUNCTION ---
const safeQuery = async (res, query, params = []) => {
    try {
        const [results] = await pool.query(query, params);
        return results;
    } catch (error) {
        console.error("DATABASE ERROR:", error);
        res.status(500).json({ message: "Database query error", error: error.message });
        return null;
    }
};

// --- API ENDPOINTS ---

// GET KONTEN
app.get('/api/hero', async (req, res) => {
    const rows = await safeQuery(res, 'SELECT * FROM hero_content WHERE id = 1');
    if (rows) res.json(rows[0] || {});
});
app.get('/api/features', async (req, res) => {
    const rows = await safeQuery(res, 'SELECT * FROM features ORDER BY id');
    if (rows) res.json(rows);
});
app.get('/api/packages', async (req, res) => {
    const rows = await safeQuery(res, 'SELECT * FROM packages ORDER BY id');
    if (rows) res.json(rows);
});
app.get('/api/testimonials', async (req, res) => {
    const rows = await safeQuery(res, 'SELECT * FROM testimonials ORDER BY id');
    if (rows) res.json(rows);
});
app.get('/api/faqs', async (req, res) => {
    const rows = await safeQuery(res, 'SELECT * FROM faqs ORDER BY id');
    if (rows) res.json(rows);
});

// Endpoint lain yang sudah pernah kita buat (login, register, payment, dashboard, dll.)
// Pastikan semua endpoint Anda ada di sini...

// --- MENJALANKAN SERVER ---
app.listen(PORT, () => {
  console.log(`Server backend lengkap berjalan di http://localhost:${PORT}`);
});