from typing import List

from pydantic import BaseModel


class SongWord(BaseModel):
    word: str
    verse_index: int
    line_index: int
    word_index: int


class WordPosition(BaseModel):
    artist_name: str
    song_name: str
    word: str
    verse_index: int
    line_index: int
    word_index: int


class Song(BaseModel):
    id: int
    name: str
    content: str
    artist_name: str
