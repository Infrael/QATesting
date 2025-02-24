require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Middleware
app.use(bodyParser.json());

// Create users table
(async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            title VARCHAR(50),
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    await pool.query(createTableQuery);
    console.log('Users table is ready');
})();

// Register user
app.post('/register', async (req, res) => {
    try {
        const { username, email, title, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (username, email, title, password) VALUES ($1, $2, $3, $4) RETURNING id, username, email, title, created_at',
            [username, email, title, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login user
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) return res.status(400).json({ error: 'Invalid username or password' });

        const user = result.rows[0];
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) return res.status(400).json({ error: 'Invalid username or password' });

        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Authentication middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Update user email and title by ID
app.put('/user/:id', authenticate, async (req, res) => {
    try {
        const { email, title } = req.body;
        const userId = req.user.userId;
        const updateUserId = parseInt(req.params.id);

        // Check if the user is updating their own profile
        if (userId !== updateUserId) {
            return res.status(403).json({ error: 'You can only update your own profile' });
        }

        const result = await pool.query(
            'UPDATE users SET email = $1, title = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING id, username, email, title, updated_at',
            [email, title, updateUserId]
        );

        if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });

        res.json({ message: 'User updated successfully', user: result.rows[0] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});