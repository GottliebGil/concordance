from textwrap import dedent
from typing import Optional

import asyncpg

from entities.song import Song


async def add_song(song_name: str, artist_name: str, content: str,
                   conn: asyncpg.Connection):
    await conn.execute(
        'SELECT add_song($1, $2, $3)',
        song_name, artist_name, content
    )


async def get_song_lyrics(artist_name: str, song_name: str, conn: asyncpg.Connection) -> str:
    query = dedent("""
WITH line_aggregation AS (SELECT s.id                                           AS song_id,
                                 s.name                                         AS song_name,
                                 a.name                                         AS artist_name,
                                 sw.line_index,
                                 string_agg(w.word, ' ' ORDER BY sw.word_index) AS line_text
                          FROM songs s
                                   JOIN song_words sw ON s.id = sw.song_id
                                   JOIN words w ON w.id = sw.word_id
                                   JOIN artists a ON s.artist_id = a.id
                          WHERE a.name = $1
                                AND s.name = $2
                          GROUP BY s.id, s.name, a.name, sw.line_index
                          ORDER BY s.id, sw.line_index)

SELECT 
       string_agg(l.line_text, E'\n' ORDER BY l.line_index) AS lyrics
FROM line_aggregation l
         JOIN songs s
              ON l.song_id = s.id
         JOIN artists a ON s.artist_id = a.id
GROUP BY l.song_id, s.name, a.name
ORDER BY l.song_id;
    """)
    result = await conn.fetch(query, artist_name, song_name)
    if not result:
        return ""
    return result[0]['lyrics']


async def search_song(search_query: str, conn: asyncpg.Connection):
    query = dedent("""
WITH song_lyrics AS (
    SELECT
        string_agg(words.word, ' ') AS lyrics,
        song_words.song_id
    FROM song_words
    INNER JOIN words ON song_words.word_id = words.id
    GROUP BY song_words.song_id
),
songs_matched_by_lyrics AS (
    SELECT artists.name AS artist_name, songs.name
    FROM song_lyrics
    INNER JOIN songs ON song_lyrics.song_id = songs.id
    INNER JOIN artists ON songs.artist_id = artists.id
    WHERE song_lyrics.lyrics ILIKE $1
),
songs_matched_by_artist AS (
    SELECT artists.name AS artist_name, songs.name
    FROM artists
    INNER JOIN songs ON artists.id = songs.artist_id
    WHERE artists.name ILIKE $1
),
songs_matched_by_name AS (
    SELECT artists.name AS artist_name, songs.name
    FROM songs
    INNER JOIN artists ON artists.id = songs.artist_id
    WHERE songs.name ILIKE $1
)
SELECT * FROM songs_matched_by_artist
UNION DISTINCT 
SELECT * FROM songs_matched_by_name
UNION DISTINCT 
SELECT * FROM songs_matched_by_lyrics
    """)
    results = await conn.fetch(query, f"%{search_query}%")
    return [
        Song(
            name=row['name'],
            artist_name=row['artist_name'],
            content=await get_song_lyrics(row['artist_name'], row['name'], conn)
        ) for row in results
    ]


async def get_all_songs(conn: asyncpg.Connection):
    query = dedent("""
SELECT
    artists.name AS artist_name,
    songs.name
FROM songs
INNER JOIN artists ON songs.artist_id = artists.id
    """)
    results = await conn.fetch(query)
    return [
        Song(
            name=row['name'],
            artist_name=row['artist_name'],
            content=await get_song_lyrics(row['artist_name'], row['name'], conn)
        ) for row in results
    ]
