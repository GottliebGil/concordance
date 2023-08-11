from fastapi import APIRouter, HTTPException, Depends
import asyncpg
from pydantic import BaseModel

import crud
import database

router = APIRouter()


class AddSongRequest(BaseModel):
    file_name: str
    song_name: str
    artist_name: str
    content: str


@router.post("/add_song")
async def add_song(
        request: AddSongRequest,
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    try:
        await conn.execute(
            'SELECT add_song($1, $2, $3, $4)',
            request.file_name, request.song_name, request.artist_name, request.content
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"message": "Song added successfully!"}

# Add other song-related routes here...
