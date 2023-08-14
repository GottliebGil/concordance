import asyncpg
from fastapi import APIRouter, Depends

import database
from dependencies import stats_db

router = APIRouter()


@router.get("/word_stats")
async def get_stats_words_in_line(
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    stats = await stats_db.get_word_stats(conn)
    return stats


@router.get("/popularity")
async def get_words_popularity(
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    stats = await stats_db.get_words_popularity(conn)
    return stats
