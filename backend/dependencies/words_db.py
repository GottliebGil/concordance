from textwrap import dedent
from typing import Optional, List

import asyncpg

from entities.song import Song, SongWord, WordPosition


async def get_word_positions(word: str, conn: asyncpg.Connection) -> List[WordPosition]:
    query = dedent("""
SELECT
    artists.name AS artist_name,
    songs.name AS song_name,
    song_words.appearance,
    song_words.verse_index,
    song_words.line_index,
    song_words.word_index
FROM song_words
INNER JOIN songs ON song_words.song_id = songs.id
INNER JOIN artists ON songs.artist_id = artists.id
INNER JOIN words ON song_words.word_id = words.id
WHERE words.bare_word ILIKE $1
ORDER BY song_words.verse_index, song_words.line_index, song_words.word_index;
    """)
    result = await conn.fetch(query, word)
    if not result:
        return []
    return [WordPosition(**row) for row in result]
