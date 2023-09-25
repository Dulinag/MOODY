const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/songs', async (req, res) => {
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

router.post('/songs', async (req, res) => {
  try {
    const { title, artist, genre } = req.body; // Assuming these are the properties of a song
    
    const client = await pool.connect();
    const result = await client.query('INSERT INTO songs (title, artist, genre) VALUES ($1, $2, $3) RETURNING *', [title, artist, genre]);
    const createdSong = result.rows[0];
    client.release();

    console.log('Created Song:', createdSong);

    res.status(201).send(createdSong); // 201 indicates resource created successfully
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/songs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM songs WHERE id = $1', [id]);
    const song = result.rows[0];
    client.release();

    console.log('Song:', song);

    res.send(song);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


router.put('/songs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, artist, genre } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE songs SET title = $1, artist = $2, genre = $3 WHERE id = $4 RETURNING *', [title, artist, genre, id]);
    const updatedSong = result.rows[0];
    client.release();

    console.log('Updated Song:', updatedSong);

    res.send(updatedSong);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/songs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM songs WHERE id = $1 RETURNING *', [id]);
    const deletedSong = result.rows[0];
    client.release();

    console.log('Deleted Song:', deletedSong);

    res.send(deletedSong);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;