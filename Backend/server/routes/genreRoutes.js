const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/genres', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM genres');
    res.json(result.rows);
  } finally {
    client.release();
  }
});

module.exports = router;
