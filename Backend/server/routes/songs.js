
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


  router.post('/', async (req, res) => {
    try {
      const { title, genre_id, artist_id, album, image_url } = req.body;
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO songs (title, genre_id, artist_id, album, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, genre_id, artist_id, album, image_url]
      );
      const newSong = result.rows[0];
      client.release();
      res.status(201).json(newSong);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM songs WHERE song_id = $1', [id]);
      const song = result.rows[0];
      client.release();
      if (!song) {
        return res.status(404).send('Song not found');
      }
      res.json(song);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, genre_id, artist_id, album, image_url } = req.body;
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE songs SET title = $1, genre_id = $2, artist_id = $3, album = $4, image_url = $5 WHERE song_id = $6 RETURNING *',
        [title, genre_id, artist_id, album, image_url, id]
      );
      const updatedSong = result.rows[0];
      client.release();
      if (!updatedSong) {
        return res.status(404).send('Song not found');
      }
      res.json(updatedSong);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const client = await pool.connect();
      const result = await client.query('DELETE FROM songs WHERE song_id = $1 RETURNING *', [id]);
      const deletedSong = result.rows[0];
      client.release();
      if (!deletedSong) {
        return res.status(404).send('Song not found');
      }
      res.json(deletedSong);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  

  module.exports = router;