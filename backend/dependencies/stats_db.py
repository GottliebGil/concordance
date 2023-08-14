from textwrap import dedent
from typing import Optional, List

import asyncpg

from entities.song import Song, SongWord, WordPosition
from entities.stats import Stats, WordStats, WordPopularity


async def get_word_stats_in_line(conn: asyncpg.Connection) -> Stats:
    query = dedent("""
    with w as (select song_id, line_index, count(*) as words_in_line
               from song_words
               group by song_id, line_index
               order by line_index)
    select min(words_in_line), avg(words_in_line), max(words_in_line)
    from w
        """)
    result = await conn.fetchrow(query)
    return Stats(minimum=result['min'], average=result['avg'], maximum=result['max'])


async def get_word_stats_in_verse(conn: asyncpg.Connection) -> Stats:
    query = dedent("""
    with w as (select song_id, count(*) as words_in_verse
               from song_words
               group by song_id, verse_index
               order by verse_index)
    select min(words_in_verse), avg(words_in_verse), max(words_in_verse)
    from w
        """)
    result = await conn.fetchrow(query)
    return Stats(minimum=result['min'], average=result['avg'], maximum=result['max'])


async def get_word_stats_in_song(conn: asyncpg.Connection) -> Stats:
    query = dedent("""
    with w as (select song_id, count(*) as words_in_song
               from song_words
               group by song_id
               order by song_id)
    select min(words_in_song), avg(words_in_song), max(words_in_song)
    from w
        """)
    result = await conn.fetchrow(query)
    return Stats(minimum=result['min'], average=result['avg'], maximum=result['max'])


async def get_word_stats(conn: asyncpg.Connection) -> WordStats:
    return WordStats(
        line=await get_word_stats_in_line(conn),
        verse=await get_word_stats_in_verse(conn),
        song=await get_word_stats_in_song(conn)
    )


async def get_words_popularity(conn: asyncpg.Connection) -> List[WordPopularity]:
    query = dedent("""
        select words.bare_word,
               count(distinct song_words.id) as   total_usages,
               count(distinct song_words.song_id) songs_used
        from song_words
                 inner join words on song_words.word_id = words.id
        group by words.bare_word
        order by total_usages desc
            """)
    result = await conn.fetch(query)
    return [
        WordPopularity(bare_word=row['bare_word'],
                       total_usages=row['total_usages'],
                       songs_used=row['songs_used']) for row in result
    ]
