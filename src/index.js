const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(express.json());

// Create a pool (connection to PostgreSQL)
const pool = new Pool({
  user: 'postgres',
  host: 'postgres', // matches service name in docker-compose
  database: 'userdb',
  password: 'password123',
  port: 5432,
});

// Create users table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
  );
`);

app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

app.post('/users', async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    'INSERT INTO users(name) VALUES($1) RETURNING *',
    [name]
  );
  res.status(201).json(result.rows[0]);
});

app.listen(port, () => {
  console.log(`🚀 API running at http://localhost:${port}`);
});
