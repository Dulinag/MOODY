import { pool } from '../config/database.js'

const createCommentForUser = async (req, res) => {
    const { user_id, song_id, comment } = req.body; // Assuming comment details are sent in the request body
  
    if (!user_id || !song_id || !comment) {
        return res.status(400).json({ message: 'User ID, song ID, and comment are required' });
    }
  
    const client = await pool.connect();
    try {
        const result = await client.query('INSERT INTO comments (user_id, song_id, comment) VALUES ($1, $2, $3) RETURNING *', [user_id, song_id, comment]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release();
    }
  }

const updateComment = async (req, res) => {
    const comment_id = req.params.comment_id;
    const { user_id, song_id, comment } = req.body; // Assuming the updated comment details are sent in the request body

    if (!user_id || !song_id || !comment) {
        return res.status(400).json({ message: 'User ID, song ID, and comment are required' });
    }

    const client = await pool.connect();
    try {
        const result = await client.query('UPDATE comments SET user_id = $1, song_id = $2, comment = $3 WHERE comment_id = $4 RETURNING *', [user_id, song_id, comment, comment_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

const getCommentById = async (req, res) => {
    const comment_id = req.params.comment_id;
    
    const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM comments WHERE comment_id = $1', [comment_id]);
    
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Comment not found' });
            }
    
            res.json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        } finally {
            client.release();
        }
}


const deleteCommentById = async (req, res) => {
    const comment_id = req.params.comment_id;
  
    const client = await pool.connect();
    try {
        const result = await client.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *', [comment_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release();
    }
}


export default {
    createCommentForUser,
    updateComment,
    getCommentById,
    deleteCommentById
}