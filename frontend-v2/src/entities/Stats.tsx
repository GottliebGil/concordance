type Stats = {
    minimum: number;
    average: number;
    maximum: number;
};

type WordStats = {
    line: Stats;
    verse: Stats;
    song: Stats;
}
type WordPopularity = {
    bare_word: string;
    total_usages: number;
    songs_used: number;
};

export {Stats, WordStats, WordPopularity};