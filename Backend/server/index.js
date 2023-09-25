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

  app.post('/genres', async (req, res) => {
    const { name } = req.body; // Assuming the genre name is sent in the request body

    if (!name) {
        return res.status(400).json({ message: 'Genre name is required' });
    }

    const client = await pool.connect();
    try {
        const result = await client.query('INSERT INTO genres (name) VALUES ($1) RETURNING *', [name]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release();
    }
});


app.put('/genres/:genre_id', async (req, res) => {
  const genre_id = req.params.genre_id;
  const { name } = req.body; // Assuming the updated genre name is sent in the request body

  if (!name) {
      return res.status(400).json({ message: 'Genre name is required' });
  }

  const client = await pool.connect();
  try {
      const result = await client.query('UPDATE genres SET name = $1 WHERE genre_id = $2 RETURNING *', [name, genre_id]);
      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'Genre not found' });
      }
      res.json(result.rows[0]);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  } finally {
      client.release();
  }
});

app.delete('/genres/:genre_id', async (req, res) => {
  const genre_id = req.params.genre_id;

  const client = await pool.connect();
  try {
      const result = await client.query('DELETE FROM genres WHERE genre_id = $1 RETURNING *', [genre_id]);
      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'Genre not found' });
      }
      res.json({ message: 'Genre deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
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


//comments
app.get('/comments', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM comments');
    const comments = result.rows;
    client.release();

    console.log('Comments:', comments);

    res.send(comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/comments', async (req, res) => {
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
});

app.put('/comments/:comment_id', async (req, res) => {
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
});

app.delete('/comments/:comment_id', async (req, res) => {
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
});


//artists
app.get('/artists', async (req, res) => {
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
});

app.post('/artists', async (req, res) => {
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
});

app.put('/artists/:artist_id', async (req, res) => {
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
});

app.delete('/artists/:artist_id', async (req, res) => {
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
});


//likes

app.get('/likes', async (req, res) => {
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
});

app.post('/likes', async (req, res) => {
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
});

app.delete('/likes/:likes_id', async (req, res) => {
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
});


app.listen(3000, () =>{

    console.log("Server has started on port 3000")
});