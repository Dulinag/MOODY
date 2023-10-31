import { pool } from '../config/database.js'

const getSongs = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM songs ORDER BY song_id ASC');
      res.status(200).json(result.rows)
    } catch (err) {
      console.error(err);
      res.status(409).send({ error: err.message });
    }
  }

const createSongs = async (req, res) => {
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
}

const getSongById = async (req, res) => {
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
}

const updateSongById = async (req, res) => {
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
}

const deleteSongById =  async (req, res) => {
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
}


export default {
    getSongs,
    createSongs,
    getSongById,
    updateSongById,
    deleteSongById
}