
const express = require('express');
const router = express.Router()


const pool = require('../db');

router.use(express.json());



router.get('/', async (req, res) => {
    // Set the Color header for the first request
    if (req.headers['x-first-request']) {
      res.header('Color', 'red');
    }
  
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM songs');
      const songs = result.rows;
      client.release();
  
      console.log('Songs:', songs);
  
      res.send(songs);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports = router;