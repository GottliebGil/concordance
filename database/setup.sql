-- setup.sql

-- Create songs table
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL UNIQUE,
    song_name TEXT NOT NULL,
    artist TEXT NOT NULL
);

-- Create words table
CREATE TABLE words (
    id SERIAL PRIMARY KEY,
    word TEXT NOT NULL UNIQUE
);

-- Create song_words table to associate songs with their words
CREATE TABLE song_words (
    id SERIAL PRIMARY KEY,
    song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE,
    word_id INTEGER REFERENCES words(id) ON DELETE CASCADE,
    line_index INTEGER NOT NULL,    -- which line of the song
    word_index INTEGER NOT NULL     -- which word in the line
);

-- Create word_groups table
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    group_name TEXT NOT NULL UNIQUE
);

-- Create word_group_assignments table to associate words with groups
CREATE TABLE word_group_assignments (
    id SERIAL PRIMARY KEY,
    word_id INTEGER REFERENCES words(id) ON DELETE CASCADE,
    group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE
);

-- Stored procedure to insert a song and its words
-CREATE OR REPLACE FUNCTION add_song(
    p_song_filename TEXT,
    p_song_name TEXT,
    p_song_artist TEXT,
    p_song_content TEXT
)
RETURNS void LANGUAGE plpgsql AS $$
DECLARE
    song_id INTEGER;
    word_id INTEGER;
    line_index INTEGER := 1; -- initialize line counter
    word_position INTEGER;
    line_content TEXT;
    word_content TEXT;
BEGIN
    -- Insert song metadata
    INSERT INTO songs (filename, song_name, artist) VALUES (p_song_filename, p_song_name, p_song_artist) RETURNING id INTO song_id;

    -- Process song content line by line
    FOR line_content IN SELECT regexp_split_to_table(p_song_content, E'\n')
    LOOP
        word_position := 1; -- reset word counter for new line
        -- Process each word in the line
        FOR word_content IN SELECT regexp_split_to_table(line_content, E'\\s+')
        LOOP
            INSERT INTO words (word) VALUES (word_content)
            ON CONFLICT (word) DO UPDATE SET word = word_content RETURNING id INTO word_id;

            INSERT INTO song_words (song_id, word_id, line_index, word_index) VALUES (song_id, word_id, line_index, word_position);
            word_position := word_position + 1;
        END LOOP;
        line_index := line_index + 1; -- move to next line
    END LOOP;
END;
$$;

