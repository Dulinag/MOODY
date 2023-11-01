import { pool } from '../config/database.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.ACESSS_TOKEN_SECRET; // Load access token secret from environment variables

const createUser = async (req, res) => {
    try {
        const { username, password, image_url, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const newUser = await pool.query(
        'INSERT INTO users (username, password, image_url, email) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, hashedPassword, image_url, email]
        );

        res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const updateUser = async (req, res) => {
    const { user_id } = req.params;
    const { username, password, image_url, email } = req.body;
    const client = await pool.connect();
    try {
      const result = await client.query(
        'UPDATE users SET username = $1, password = $2, image_url = $3, email = $4 WHERE user_id = $5 RETURNING *',
        [username, password, image_url, email, user_id]
      );
      res.json(result.rows[0]);
    } finally {
      client.release();
    }
}

const deleteUser = async (req, res) => {
    const { user_id } = req.params;
    const client = await pool.connect();
    try {
        const result = await client.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [user_id]);
        res.json(result.rows[0]);
    } finally {
        client.release();
    }
}

const getUserById = async (req, res) => {
    const { user_id } = req.params;
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        res.json(result.rows[0]);
    } finally {
        client.release();
    }
}


const userLogin = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        const client = await pool.connect();

        let result;

        // Check if the input is an email address
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);

        if (isEmail) {
            result = await client.query('SELECT * FROM users WHERE email = $1', [emailOrUsername]);
        } else {
            result = await client.query('SELECT * FROM users WHERE username = $1', [emailOrUsername]);
        }

        if (result.rows.length === 0) {
            client.release();
            return res.status(401).json({ message: 'Invalid email or username or password' });
        }

        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            client.release();
            return res.status(401).json({ message: 'Invalid email or username or password' });
        }

        const token = jwt.sign({ userId: user.id }, accessTokenSecret, { expiresIn: '1h' });

        client.release();
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    userLogin

}