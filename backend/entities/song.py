from typing import List

from pydantic import BaseModel


class Word(BaseModel):
    word: str
    verse_index: int
    line_index: int
    word_index: int


class Song(BaseModel):
    id: int
    name: str
    content: str
    artist_name: str
