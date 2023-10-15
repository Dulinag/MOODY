
-- Insert dummy data into artists table

-- Insert data
INSERT INTO users (username, password, created_at, image_url, email)
VALUES 
    ('john_doe', 'password123', NOW(), 'https://example.com/john_doe.jpg', 'john@example.com'),
    ('jane_doe', 'qwerty456', NOW(), 'https://example.com/jane_doe.jpg', 'jane@example.com');


INSERT INTO genres (name)
VALUES 
    ('Rock'),
    ('Pop'),
    ('Hip Hop');

INSERT INTO artists (name, country, genre)
VALUES 
    ('Michael Jackson', 'USA', 'Pop'),
    ('The Beatles', 'UK', 'Rock'),
    ('Jay-Z', 'USA', 'Hip Hop');

INSERT INTO songs (title, genre_id, artist_id, album, image_url, song_url)
VALUES 
    ('Thriller', 1, 1, 'Thriller', 'https://example.com/thriller.jpg', 'https://example.com/thriller.mp3'),
    ('Hey Jude', 2, 2, 'The Beatles (White Album)', 'https://example.com/hey_jude.jpg', 'https://example.com/hey_jude.mp3'),
    ('Empire State of Mind', 3, 3, 'The Blueprint 3', 'https://example.com/empire_state.jpg', 'https://example.com/empire_state.mp3');


INSERT INTO comments (user_id, song_id, comment)
VALUES 
    (1, 1, 'Amazing song!'),
    (2, 1, 'One of my all-time favorites!'),
    (1, 2, 'Classic tune!');

INSERT INTO likes (user_id, comment_id)
VALUES 
    (1, 1),
    (2, 1),
    (1, 3);