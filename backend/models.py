from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base


class Song(Base):
    __tablename__ = "songs"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, unique=True)
    song_name = Column(String)
    artist = Column(String)


class Word(Base):
    __tablename__ = "words"
    id = Column(Integer, primary_key=True, index=True)
    word = Column(String, unique=True)


class SongWord(Base):
    __tablename__ = "song_words"
    id = Column(Integer, primary_key=True, index=True)
    song_id = Column(Integer, ForeignKey("songs.id"))
    word_id = Column(Integer, ForeignKey("words.id"))
    line_number = Column(Integer)
    word_number = Column(Integer)
