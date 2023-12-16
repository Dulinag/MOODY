import { pool } from '../config/database.js'


const getPlaylists = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM playlists ORDER By id');
        const playlists = result.rows;
        client.release();
        res.send(playlists);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

export default {
    getPlaylists,
}