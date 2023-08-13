from typing import List

import asyncpg
from fastapi import APIRouter, Depends, HTTPException

import database
from entities.groups import Group, GroupCreate, WordAdd, WordRemove
from dependencies import songs_db, groups_db

router = APIRouter()


@router.get("/", response_model=List[Group])
async def list_groups(conn: asyncpg.Connection = Depends(database.get_database_connection)):
    groups = await groups_db.fetch_groups(conn)
    return groups


@router.post("/")
async def create_group(
        group: GroupCreate,
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    group_id = await groups_db.create_new_group(group.name, conn)
    return {"id": group_id, "name": group.name, "words": []}


@router.get("/{group_id}/words/")
async def get_group_words(
        group_id: int,
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    words = await groups_db.get_words_in_group(group_id, conn)
    if not words:
        raise HTTPException(status_code=400, detail="Unable to add word to group.")
    return words if words[0] else []


@router.get("/{group_id}/words/new")
async def get_words_not_in_the_group(
        group_id: int,
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    words = await groups_db.get_words_not_in_group(group_id, conn)
    if not words:
        raise HTTPException(status_code=400, detail="Unable to add word to group.")
    return words if words[0] else []


@router.post("/{group_id}/words/")
async def add_word_to_group(
        group_id: int,
        word_data: WordAdd,
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    word_id = await groups_db.add_word_to_specific_group(group_id, word_data.word, conn)
    if not word_id:
        raise HTTPException(status_code=400, detail="Unable to add word to group.")
    return {"word_id": word_id}


@router.delete("/{group_id}/words/")
async def remove_word_from_group(
        group_id: int,
        word_data: WordRemove,
        conn: asyncpg.Connection = Depends(database.get_database_connection)
):
    success = await groups_db.remove_word_from_specific_group(group_id, word_data.word, conn)
    if not success:
        raise HTTPException(status_code=400, detail="Unable to remove word from group.")
    return {"status": "word removed successfully"}
