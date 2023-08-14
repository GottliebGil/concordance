from pydantic import BaseModel


class Stats(BaseModel):
    minimum: int
    average: int
    maximum: int


class WordStats(BaseModel):
    line: Stats
    verse: Stats
    song: Stats


class WordPopularity(BaseModel):
    bare_word: str
    total_usages: int
    songs_used: int
