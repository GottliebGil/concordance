from fastapi import APIRouter, HTTPException, Depends
import asyncpg
from pydantic import BaseModel

from dependencies import songs_db
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
    if songs_db.get_song(request.artist_name, request.song_name, conn):
        raise HTTPException(
            status_code=400,
            detail="A song with the same name already exists"
        )
    await songs_db.add_song(
        request.song_name, request.artist_name, request.content, conn
    )
    return {"message": "Song added successfully!"}


@router.get("/search")
async def search_songs(
        q: str,
        in_title: bool = True,
        in_lyrics: bool = True,
        in_artist_name: bool = True,
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    songs = await songs_db.search_song(q, in_title, in_lyrics, in_artist_name, conn)
    return songs


@router.get("/")
async def get_all_songs(
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    songs = await songs_db.get_all_songs(conn)
    return songs


@router.get("/words")
async def get_song_words(
        song_id: int,
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    words = await songs_db.get_song_words(song_id, conn)
    words_to_verses = []
    current_verse = []
    current_line = []
    prev_verse = 1
    prev_line = 1
    for index, word in enumerate(words):
        if word.line_index > prev_line:
            current_verse.append(current_line)
            current_line = []
            prev_line = word.line_index
        if word.verse_index > prev_verse:
            words_to_verses.append(current_verse)
            current_verse = []
            prev_verse = word.verse_index
        current_line.append(word)
    words_to_verses.append(current_verse)
    return words_to_verses
