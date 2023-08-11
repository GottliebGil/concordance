-- setup.sql

CREATE TABLE artists
(
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE songs
(
    id        SERIAL PRIMARY KEY,
    name      TEXT                            NOT NULL,
    artist_id INTEGER REFERENCES artists (id) NOT NULL
);


CREATE TABLE words
(
    id   SERIAL PRIMARY KEY,
    word TEXT NOT NULL UNIQUE
);

-- Create song_words table to associate songs with their words
CREATE TABLE song_words
(
    id         SERIAL PRIMARY KEY,
    song_id    INTEGER REFERENCES songs (id) ON DELETE CASCADE,
    word_id    INTEGER REFERENCES words (id) ON DELETE CASCADE,
    line_index INTEGER NOT NULL, -- which line of the song
    word_index INTEGER NOT NULL  -- which word in the line
);

-- Create word_groups table
CREATE TABLE groups
(
    id         SERIAL PRIMARY KEY,
    group_name TEXT NOT NULL UNIQUE
);

-- Create word_group_assignments table to associate words with groups
CREATE TABLE word_group_assignments
(
    id       SERIAL PRIMARY KEY,
    word_id  INTEGER REFERENCES words (id) ON DELETE CASCADE,
    group_id INTEGER REFERENCES groups (id) ON DELETE CASCADE
);

-- Stored procedure to insert a song and its words
CREATE OR REPLACE FUNCTION add_song(
    p_song_name TEXT,
    p_artist_name TEXT,
    p_song_content TEXT
)
RETURNS VOID AS
$$
DECLARE
    v_artist_id INTEGER;
    v_song_id INTEGER;
    word_id INTEGER;
    line_index INTEGER := 1; -- initialize line counter
    word_position INTEGER;
    line_content TEXT;
    word_content TEXT;
BEGIN
    -- Check if the artist already exists
    SELECT id INTO v_artist_id FROM artists WHERE name = p_artist_name;

    -- If the artist doesn't exist, insert the artist
    IF v_artist_id IS NULL THEN
        INSERT INTO artists (name) VALUES (p_artist_name) RETURNING id INTO v_artist_id;
    END IF;

    -- Insert the song and get its ID
    INSERT INTO songs (name, artist_id) VALUES (p_song_name, v_artist_id) RETURNING id INTO v_song_id;

    FOR line_content IN SELECT regexp_split_to_table(p_song_content, E'\n')
    LOOP
        word_position := 1; -- reset word counter for new line
        -- Process each word in the line
        FOR word_content IN SELECT regexp_split_to_table(line_content, E'\\s+')
        LOOP
            INSERT INTO words (word) VALUES (word_content)
            ON CONFLICT (word) DO UPDATE SET word = word_content RETURNING id INTO word_id;

            INSERT INTO song_words (song_id, word_id, line_index, word_index) VALUES (v_song_id, word_id, line_index, word_position);
            word_position := word_position + 1;
        END LOOP;
        line_index := line_index + 1; -- move to next line
    END LOOP;
END;
$$
LANGUAGE plpgsql;
