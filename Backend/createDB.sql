CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    image_url VARCHAR(255),
    email VARCHAR(100) UNIQUE 
);

CREATE TABLE songs (
    song_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    genre_id INT,
    artist_id INT,
    album VARCHAR(100),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);

CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE
);


CREATE TABLE artists (
    artist_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    country VARCHAR(50),
    genre VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INT,
    song_id INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_idid),
    FOREIGN KEY (song_id) REFERENCES songs(song_id)
);

CREATE TABLE likes (
    lies_id SERIAL PRIMARY KEY,
    user_id INT,
    comment_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id)
);
