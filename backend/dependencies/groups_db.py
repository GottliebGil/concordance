from textwrap import dedent
from typing import List
import asyncpg
from entities.groups import Group


async def fetch_groups(conn: asyncpg.Connection) -> List[Group]:
    rows = await conn.fetch(
        dedent('''
            SELECT g.id AS group_id, g.name AS group_name, array_agg(w.word) AS words
            FROM groups g
            LEFT JOIN word_group_assignments gw ON g.id = gw.group_id
            LEFT JOIN words w ON gw.word_id = w.id
            GROUP BY g.id, g.name
        ''')
    )

    return [Group(id=row['group_id'], name=row['group_name'], words=row['words'] if row['words'][0] else []) for row in rows]


async def create_new_group(group_name: str, conn: asyncpg.Connection) -> int:
    group_id = await conn.fetchval(
        'INSERT INTO groups (name) VALUES ($1) RETURNING id',
        group_name
    )
    return group_id


async def add_word_to_specific_group(group_id: int, word: str, conn: asyncpg.Connection) -> int:
    word_id = await conn.fetch("SELECT id FROM words WHERE word = $1", word)
    if not word_id:
        word_id = await conn.fetchval(
            'INSERT INTO words (word) VALUES ($1) RETURNING id',
            word
        )
    await conn.execute(
        'INSERT INTO word_group_assignments (group_id, word_id) VALUES ($1, $2)',
        group_id, word_id
    )
    return word_id


async def remove_word_from_specific_group(group_id: int, word: str, conn: asyncpg.Connection) -> bool:
    word_id = await conn.fetch("SELECT id FROM words WHERE word = $1", word)
    if not word_id:
        return False
    result = await conn.execute(
        'DELETE FROM word_group_assignments WHERE group_id = $1 AND word_id = $2',
        group_id, word_id
    )
    return result == 'DELETE 1'
