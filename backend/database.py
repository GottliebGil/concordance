from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import DeclarativeBase
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:password@localhost:5432/mydatabase"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = DeclarativeBase()
