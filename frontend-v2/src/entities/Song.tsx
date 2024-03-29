type Song = {
    id: number;
    name: string;
    artist_name: string;
    content: string;
};

type WordPosition = {
    song_name: string;
    artist_name: string;
    appearance: string;
    verse_index: number;
    line_index: number;
    word_index: number;
}
type SongWord = {
    id: number;
    appearance: string;
    bare_word: string;
    verse_index: number;
    line_index: number;
    word_index: number;
};

export {Song, SongWord, WordPosition};