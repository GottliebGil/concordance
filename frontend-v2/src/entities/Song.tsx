type Song = {
    id: number;
    name: string;
    artist_name: string;
    content: string;
};
type SongWord = {
    id: number;
    word: string;
    verse_index: number;
    line_index: number;
    word_index: number;
};

export {Song, SongWord};