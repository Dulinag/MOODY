const express = require("express");
const app = express();
const cors = require("cors")
const pool = require("./db")

//middlewear

app.use(cors());
app.use(express.json());


//Routes//

//genre get
app.get('/genres', async (req, res) => {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM genres');
      res.json(result.rows);
    } finally {
      client.release();
    }
  });

//user get

  app.get('/users', async (req, res) => {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users');
      res.json(result.rows);
      console.log(result)

    } 
    
    finally {
      client.release();
    }
  });

  app.post('/users', async (req, res) => {
    try {
      const { username, password, image_url, email } = req.body;
      const newUser = await pool.query(
        'INSERT INTO users (username, password, image_url, email) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, password, image_url, email]
      );
  
      res.json(newUser.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

  app.put('/users/:user_id', async (req, res) => {
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
  });
  
  app.delete('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const client = await pool.connect();
    try {
      const result = await client.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [user_id]);
      res.json(result.rows[0]);
    } finally {
      client.release();
    }
  });


  //song routes

  app.get('/songs', async (req, res) => {
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

app.listen(3000, () =>{

    console.log("Server has started on port 3000")
});