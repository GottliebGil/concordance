import asyncpg

DATABASE_URL = "postgresql://localhost:5432/concordance"


async def get_database_connection():
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        await conn.close()
