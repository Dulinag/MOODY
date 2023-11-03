import { pool } from '../config/database.js'

const getArtistById = async (req, res) => {
    const artist_id = req.params.id;
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM artists WHERE artist_id = $1', [artist_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

const getArtists = async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM artists');
      const artists = result.rows;
      client.release();
  
      console.log('Artists:', artists);
  
      res.send(artists);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

const createArtist = async (req, res) => {
    const { name, country, genre } = req.body; // Assuming artist details are sent in the request body
    if (!name || !country || !genre) {
        return res.status(400).json({ message: 'Name, country, and genre are required' });
    }
    const client = await pool.connect();
    try {
        const result = await client.query('INSERT INTO artists (name, country, genre) VALUES ($1, $2, $3) RETURNING *', [name, country, genre]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

const updateArtistsById = async (req, res) => {
    const artist_id = req.params.artist_id;
    const { name, country, genre } = req.body; // Assuming the updated artist details are sent in the request body
    
    if (!name || !country || !genre) {
        return res.status(400).json({ message: 'Name, country, and genre are required' });
    }
    
    const client = await pool.connect();
    try {
        const result = await client.query('UPDATE artists SET name = $1, country = $2, genre = $3 WHERE artist_id = $4 RETURNING *', [name, country, genre, artist_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

const deleteArtistsById = async (req, res) => {
    const artist_id = req.params.artist_id;
  
    const client = await pool.connect();
    try {
        const result = await client.query('DELETE FROM artists WHERE artist_id = $1 RETURNING *', [artist_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.json({ message: 'Artist deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release();
    }
  }


export default {
    getArtistById,
    getArtists,
    createArtist,
    updateArtistsById,
    deleteArtistsById
  }