from typing import List

import asyncpg
from fastapi import APIRouter, Depends
from pydantic import BaseModel

import database
from dependencies import words_db

router = APIRouter()


class GetWordsPositionsRequest(BaseModel):
    words: List[str]


@router.post("/get_many")
async def get_words_positions(
        request: GetWordsPositionsRequest,
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    positions = {}
    for word in request.words:
        positions[word] = await words_db.get_word_positions(word, conn)
    return positions
