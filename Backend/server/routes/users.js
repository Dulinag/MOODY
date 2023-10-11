const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');



const pool = require('../db');


router.use(express.json());


router.get('/', async (req, res) => {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users');
      res.json(result.rows);
      console.log(result)

    } 
    
    finally {
      client.release();
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { username, password, image_url, email } = req.body;
      const newUser = await pool.query(
        'INSERT INTO users (username, password, image_url, email) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, password, image_url, email]
      );
  
      res.json(newUser.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

  router.put('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { username, password, image_url, email } = req.body;
    const client = await pool.connect();
    try {
      const result = await client.query(
        'UPDATE users SET username = $1, password = $2, image_url = $3, email = $4 WHERE user_id = $5 RETURNING *',
        [username, password, image_url, email, user_id]
      );
      res.json(result.rows[0]);
    } finally {
      client.release();
    }
  });
  
  router.delete('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const client = await pool.connect();
    try {
      const result = await client.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [user_id]);
      res.json(result.rows[0]);
    } finally {
      client.release();
    }
  });

  router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
      res.json(result.rows[0]);
    } finally {
      client.release();
    }
  });
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    let client;
  
    try {
      client = await pool.connect();
  
      const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
  
      console.log('Result:', result.rows);
  
      if (result.rows.length === 0) {
        console.log('Invalid email');
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const user = result.rows[0];
  
      // Compare the passwords directly (for learning purposes)
      if (password !== user.password) {
        client.release();
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      client.release();
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });




  
  


  module.exports = router;