import { pool } from '../config/database.js'


const getLikes = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM likes');
        const likes = result.rows;
        client.release();

        console.log('Likes:', likes);

        res.send(likes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

const createLikes = async (req, res) => {
    const { user_id, comment_id } = req.body; // Assuming user_id and comment_id are sent in the request body
  
    if (!user_id || !comment_id) {
        return res.status(400).json({ message: 'User ID and Comment ID are required' });
    }
  
    const client = await pool.connect();
    try {
        const result = await client.query('INSERT INTO likes (user_id, comment_id) VALUES ($1, $2) RETURNING *', [user_id, comment_id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

const deleteLikeById = async (req, res) => {
    const likes_id = req.params.likes_id;
  
    const client = await pool.connect();
    try {
        const result = await client.query('DELETE FROM likes WHERE likes_id = $1 RETURNING *', [likes_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Like not found' });
        }
        res.json({ message: 'Like deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

export default {
    getLikes,
    createLikes,
    deleteLikeById
}