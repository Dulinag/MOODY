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


export default {
    getSongs
}