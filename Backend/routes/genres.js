// const express = require('express');
// const router = express.Router()


// const pool = require('../db');

// router.use(express.json());


// router.get('/:genre_id', async (req, res) => {
//     const genre_id = req.params.genre_id;

//     const client = await pool.connect();
//     try {
//         const result = await client.query('SELECT * FROM genres WHERE genre_id = $1', [genre_id]);

//         if (result.rows.length === 0) {
//             return res.status(404).json({ message: 'Genre not found' });
//         }

//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     } finally {
//         client.release();
//     }
// });


// router.get('/', async (req, res) => {
//     const client = await pool.connect();
//     try {
//       const result = await client.query('SELECT * FROM genres');
//       res.json(result.rows);
//     } finally {
//       client.release();
//     }
//   });

//   router.post('/', async (req, res) => {
//     const { name } = req.body; // Assuming the genre name is sent in the request body

//     if (!name) {
//         return res.status(400).json({ message: 'Genre name is required' });
//     }

//     const client = await pool.connect();
//     try {
//         const result = await client.query('INSERT INTO genres (name) VALUES ($1) RETURNING *', [name]);
//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     } finally {
//         client.release();
//     }
// });


// router.put('/:genre_id', async (req, res) => {
//   const genre_id = req.params.genre_id;
//   const { name } = req.body; // Assuming the updated genre name is sent in the request body

//   if (!name) {
//       return res.status(400).json({ message: 'Genre name is required' });
//   }





//   const client = await pool.connect();
//   try {
//       const result = await client.query('UPDATE genres SET name = $1 WHERE genre_id = $2 RETURNING *', [name, genre_id]);
//       if (result.rows.length === 0) {
//           return res.status(404).json({ message: 'Genre not found' });
//       }
//       res.json(result.rows[0]);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//   } finally {
//       client.release();
//   }
// });

// router.delete('/:genre_id', async (req, res) => {
//   const genre_id = req.params.genre_id;

//   const client = await pool.connect();
//   try {
//       const result = await client.query('DELETE FROM genres WHERE genre_id = $1 RETURNING *', [genre_id]);
//       if (result.rows.length === 0) {
//           return res.status(404).json({ message: 'Genre not found' });
//       }
//       res.json({ message: 'Genre deleted successfully' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//   } finally {
//       client.release();
//   }
// });

// module.exports = router;