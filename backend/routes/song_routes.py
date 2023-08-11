from fastapi import APIRouter, HTTPException, Depends
import asyncpg
from pydantic import BaseModel

from dependencies import crud
import database

router = APIRouter()


class AddSongRequest(BaseModel):
    file_name: str
    song_name: str
    artist_name: str
    content: str


@router.post("/add")
async def add_song(
        request: AddSongRequest,
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    separated_file_name = request.file_name.split(" - ")
    try:
        if not request.artist_name or not request.song_name:
            request.artist_name = separated_file_name[0]
            request.song_name = separated_file_name[1].split(".")[0]
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="If the song and artist names aren't passed, the file format must be 'ARTIST_NAME - SONG_NAME'"
        )
    await crud.add_song(
        request.song_name, request.artist_name, request.content, conn
    )
    return {"message": "Song added successfully!"}


@router.get("/search")
async def search_songs(
        q: str, conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    songs = await crud.search_song(q, conn)
    return songs
