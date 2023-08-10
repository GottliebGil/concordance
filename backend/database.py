import asyncpg
from fastapi import Depends

DATABASE_URL = "postgresql://user:password@localhost:5432/mydatabase"


async def get_database_connection():
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        await conn.close()
