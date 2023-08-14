import {WordPopularity, WordStats} from "../entities/Stats";


const useStats = () => {
    const getWordStats = async () => {
        const response = await fetch(`http://localhost:8000/api/stats/word_stats`);
        const data: WordStats = await response.json();
        return data
    };
    const getWordPopularity = async () => {
        const response = await fetch(`http://localhost:8000/api/stats/popularity`);
        const data: WordPopularity[] = await response.json();
        return data
    };
    return {
        getWordStats,
        getWordPopularity
    }
}


export default useStats;