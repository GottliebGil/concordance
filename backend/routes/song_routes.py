from fastapi import APIRouter, HTTPException, Depends
import asyncpg
import crud
import database

router = APIRouter()


@router.post("/add_song")
async def add_song(
    filename: str,
    song_name: str,
    artist: str,
    content: str,
    conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    try:
        await conn.execute(
            'SELECT add_song($1, $2, $3, $4)',
            filename, song_name, artist, content
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"message": "Song added successfully!"}

# Add other song-related routes here...
