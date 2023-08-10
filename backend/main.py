from fastapi import FastAPI
from database import SessionLocal, engine
import models
import crud

app = FastAPI()

models.Base.metadata.create_all(bind=engine)


@app.post("/add_song")
def add_song(filename: str, song_name: str, artist: str, content: str):
    session = SessionLocal()
    try:
        crud.insert_song(session, filename, song_name, artist, content)
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()
    return {"message": "Song added successfully!"}
