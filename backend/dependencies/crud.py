from textwrap import dedent
from typing import Optional, List

import asyncpg

from entities.song import Song, Word


async def add_song(song_name: str, artist_name: str, content: str,
                   conn: asyncpg.Connection):
    await conn.execute(
        'SELECT add_song($1, $2, $3)',
        song_name, artist_name, content
    )


async def get_song_lyrics(artist_name: str, song_name: str, conn: asyncpg.Connection) -> str:
    query = dedent("""
WITH line_aggregation AS (
    SELECT  s.id                                           AS song_id,
            s.name                                         AS song_name,
            a.name                                         AS artist_name,
            sw.line_index,
            sw.verse_index,
            string_agg(w.word, ' ' ORDER BY sw.word_index) AS line_text
    FROM songs s
        JOIN song_words sw ON s.id = sw.song_id
        JOIN words w ON w.id = sw.word_id
        JOIN artists a ON s.artist_id = a.id
    WHERE a.name = $1
        AND s.name = $2
    GROUP BY s.id, s.name, a.name, sw.line_index, sw.verse_index
    ORDER BY s.id, sw.line_index
),
verse_aggregation AS (
    SELECT  lg.song_id                                           AS song_id,
            lg.song_name                                         AS song_name,
            lg.artist_name                                         AS artist_name,
            lg.verse_index,
            string_agg(lg.line_text, '\n' ORDER BY lg.verse_index) AS verse_text
    FROM line_aggregation lg
    GROUP BY lg.song_id, lg.song_name, lg.artist_name, lg.verse_index
    ORDER BY lg.song_id, lg.verse_index
)

SELECT 
string_agg(l.verse_text, E'\n\n' ORDER BY l.verse_index) AS lyrics
FROM verse_aggregation l
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


async def get_song_words(song_id: int, conn: asyncpg.Connection) -> List[Word]:
    query = dedent("""
SELECT words.word, song_words.verse_index, song_words.line_index, song_words.word_index
FROM song_words
INNER JOIN songs ON song_words.song_id = songs.id
INNER JOIN artists ON songs.artist_id = artists.id
INNER JOIN words ON song_words.word_id = words.id
WHERE song_words.song_id = $1
ORDER BY song_words.verse_index, song_words.line_index, song_words.word_index;
    """)
    result = await conn.fetch(query, song_id)
    if not result:
        return []
    return [Word(**row) for row in result]


async def search_song(search_query: str, in_title: bool, in_lyrics: bool, in_artist_name: bool,
                      conn: asyncpg.Connection):
    query = dedent("""
WITH song_lyrics AS (
    SELECT
        string_agg(words.word, ' ') AS lyrics,
        song_words.song_id
    FROM song_words
    INNER JOIN words ON song_words.word_id = words.id
        WHERE $2
    GROUP BY song_words.song_id
),
songs_matched_by_lyrics AS (
    SELECT songs.id, artists.name AS artist_name, songs.name
    FROM song_lyrics
    INNER JOIN songs ON song_lyrics.song_id = songs.id
    INNER JOIN artists ON songs.artist_id = artists.id
    WHERE song_lyrics.lyrics ILIKE $1
        
),
songs_matched_by_artist AS (
    SELECT songs.id, artists.name AS artist_name, songs.name
    FROM artists
    INNER JOIN songs ON artists.id = songs.artist_id
    WHERE
        artists.name ILIKE $1
        AND $3
),
songs_matched_by_name AS (
    SELECT songs.id, artists.name AS artist_name, songs.name
    FROM songs
    INNER JOIN artists ON artists.id = songs.artist_id
    WHERE
        songs.name ILIKE $1
        AND $4
)
SELECT * FROM songs_matched_by_artist
UNION DISTINCT 
SELECT * FROM songs_matched_by_name
UNION DISTINCT 
SELECT * FROM songs_matched_by_lyrics
    """)
    results = await conn.fetch(query, f"%{search_query}%", in_lyrics, in_artist_name, in_title)
    return [
        Song(
            id=row['id'],
            name=row['name'],
            artist_name=row['artist_name'],
            content=await get_song_lyrics(row['artist_name'], row['name'], conn)
        ) for row in results
    ]


async def get_all_songs(conn: asyncpg.Connection):
    query = dedent("""
SELECT
    songs.id,
    artists.name AS artist_name,
    songs.name
FROM songs
INNER JOIN artists ON songs.artist_id = artists.id
    """)
    results = await conn.fetch(query)
    return [
        Song(
            id=row['id'],
            name=row['name'],
            artist_name=row['artist_name'],
            content=await get_song_lyrics(row['artist_name'], row['name'], conn)
        ) for row in results
    ]
