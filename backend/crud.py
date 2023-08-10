from sqlalchemy.orm import Session
from models import Song, Word, SongWord


def insert_song(session: Session, filename: str, song_name: str, artist: str, content: str):
    # Insert the song metadata
    song = Song(filename=filename, song_name=song_name, artist=artist)
    session.add(song)
    session.flush()  # so that we get the song id

    # Split content into lines and words
    for line_number, line in enumerate(content.split("\n")):
        for word_number, word_text in enumerate(line.split(" ")):
            # Check if word exists
            word = session.query(Word).filter_by(word=word_text).first()
            if not word:
                word = Word(word=word_text)
                session.add(word)
                session.flush()

            song_word = SongWord(
                song_id=song.id,
                word_id=word.id,
                line_number=line_number + 1,
                word_number=word_number + 1
            )
            session.add(song_word)


def search_songs(session: Session, query: str):
    # This will be a simple search, can be enhanced further with LIKE queries or text search
    return session.query(Song).filter(
        (Song.song_name.contains(query)) |
        (Song.artist.contains(query))
    ).all()


def get_word_context(session: Session, word_id: int):
    contexts = []

    song_words = session.query(SongWord).filter_by(word_id=word_id).all()
    for song_word in song_words:
        before = session.query(SongWord).filter(
            SongWord.song_id == song_word.song_id,
            SongWord.line_number == song_word.line_number - 1
        ).first()

        after = session.query(SongWord).filter(
            SongWord.song_id == song_word.song_id,
            SongWord.line_number == song_word.line_number + 1
        ).first()

        context = {
            "current": song_word,
            "before": before,
            "after": after
        }
        contexts.append(context)

    return contexts
