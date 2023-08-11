from pydantic import BaseModel


class Song(BaseModel):
    name: str
    content: str
    artist_name: str
