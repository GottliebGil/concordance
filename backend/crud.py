async def insert_song(connection, filename: str, song_name: str, artist: str, content: str):
    song_query = """
        INSERT INTO songs (filename, song_name, artist) VALUES ($1, $2, $3) RETURNING id;
    """
    song_id = await connection.fetchval(song_query, filename, song_name, artist)

    for line_number, line in enumerate(content.split("\n")):
        for word_number, word_text in enumerate(line.split(" ")):
            word_query = """
                INSERT INTO words (word) VALUES ($1) ON CONFLICT (word) DO NOTHING RETURNING id;
            """
            word_id = await connection.fetchval(word_query, word_text)

            song_word_query = """
                INSERT INTO song_words (song_id, word_id, line_number, word_number)
                VALUES ($1, $2, $3, $4);
            """
            await connection.execute(song_word_query, song_id, word_id, line_number + 1, word_number + 1)
