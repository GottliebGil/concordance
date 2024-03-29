from pydantic import BaseModel
from typing import List


class Group(BaseModel):
    id: int
    name: str
    words: List[str]  # List of words associated with this group


class GroupCreate(BaseModel):
    name: str


class WordAdd(BaseModel):
    word: str


class WordRemove(BaseModel):
    word: str
