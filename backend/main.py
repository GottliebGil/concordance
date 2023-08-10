from fastapi import FastAPI, HTTPException, Depends
import crud
import database
import asyncpg

app = FastAPI()


@app.post("/add_song")
async def add_song(
        filename: str,
        song_name: str,
        artist: str,
        content: str,
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    try:
        await crud.insert_song(conn, filename, song_name, artist, content)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"message": "Song added successfully!"}
