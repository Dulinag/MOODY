import { pool } from './database.js'
import './dotenv.js'
import { songData } from '../data/songs.js'
import { playlistData } from '../data/playlists.js'

const createUsersTable = async () => {
    const createQuery = `
    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        password TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        image_url VARCHAR(255),
        email VARCHAR(100) UNIQUE 
    );
    `;

    try {
        const res = await pool.query(createQuery);
        console.log('🎉 users table created successfully');
    } catch (e) {
        console.error('⚠️ error creating users table', e);
    }
};

const createSongsTable = async () => {
    const createQuery = `
    CREATE TABLE IF NOT EXISTS songs (
        song_id SERIAL PRIMARY KEY,
        title VARCHAR(100),
        artist_id INT,
        image_url VARCHAR(255),
        song_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
    );
    `;

    try {
        const res = await pool.query(createQuery);
        console.log('🎉 songs table created successfully');
    } catch (e) {
        console.error('⚠️ error creating songs table', e);
    }
};

const seedSongsTable = async () => {
    try {
        await createSongsTable()
        await createUsersTable()

        for (const song of songData) {
            const insertQuery = {
                text: 'INSERT INTO songs (song_id, title, artist_id, image_url, song_url) VALUES ($1, $2, $3, $4, $5)',
                values: [
                    song.song_id,
                    song.title,
                    song.artist_id,
                    song.image_url,
                    song.song_url,
                ]
            };

            const res = await pool.query(insertQuery);
            console.log(`✅ ${song.title} added successfully`);
        }
    } catch (err) {
        console.error('⚠️ error seeding songs table', err);
    }
};

const createPlaylistTable = async () => {
    const createQuery = `
    CREATE TABLE IF NOT EXISTS playlists (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_by VARCHAR(255) NOT NULL,
        songs INTEGER[]
    );
    `;

        //need to change sql to relate to user later
        //created_by INTEGER NOT NULL REFERENCES users(user_id),
    try {
        const res = await pool.query(createQuery);
        console.log('🎉 playlists table created successfully');
    } catch (e) {
        console.error('⚠️ error creating playlists table', e);
    }
};

const seedPlaylistsTable = async () => {
    try {
        await createPlaylistTable()

        for (const playlist of playlistData) {
            const insertQuery = {
                text: 'INSERT INTO playlists (id, name, created_by, songs) VALUES ($1, $2, $3, $4)',
                values: [
                    playlist.playlist_id,
                    playlist.name,
                    playlist.created_by,
                    playlist.songs
                ]
            };

            const res = await pool.query(insertQuery);
            console.log(`✅ ${playlist.name} added successfully`);
        }
    } catch (err) {
        console.error('⚠️ error seeding songs table', err);
    }
};

seedPlaylistsTable()
seedSongsTable()