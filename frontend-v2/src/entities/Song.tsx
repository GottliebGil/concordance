type Song = {
    id: number;
    name: string;
    artist_name: string;
    content: string;
};

type WordPosition = {
    song_name: string;
    artist_name: string;
    word: string;
    verse_index: number;
    line_index: number;
    word_index: number;
}
type SongWord = {
    id: number;
    word: string;
    verse_index: number;
    line_index: number;
    word_index: number;
};

export {Song, SongWord, WordPosition};