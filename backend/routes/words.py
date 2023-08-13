import asyncpg
from fastapi import APIRouter, Depends

import database
from dependencies import words_db

router = APIRouter()


@router.get("/{word}/")
async def get_word_positions(
        word: str,
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    words = await words_db.get_word_positions(word, conn)
    return words
