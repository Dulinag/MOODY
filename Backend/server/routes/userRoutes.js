const express = require('express');
const router = express.Router();

const pool = require('../db'); // Import the pool


router.post('/users', async (req, res) => {
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
  
  router.get('/users', async (req, res) => {
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


  router.put('/users/:user_id', async (req, res) => {
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
  
  router.delete('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const client = await pool.connect();
    try {
      const result = await client.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [user_id]);
      res.json(result.rows[0]);
    } finally {
      client.release();
    }
  });



module.exports = router;
