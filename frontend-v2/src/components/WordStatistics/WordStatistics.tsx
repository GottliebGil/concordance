import React, {useEffect, useState} from 'react';
import useStats from "../../hooks/useStats";
import {WordPopularity, WordStats, Stats} from "../../entities/Stats";
import {Typography} from "@mui/material";
import WordPopularityTable from "../infrastructure/WordPopularityTable";

type SingleWordStatisticsProps = {
    stats: Stats
    unit: string
};

const SingleWordStatistics: React.FC = ({stats, unit}: SingleWordStatisticsProps) => (
    <div>
        <b>Every {unit}</b> has at least {stats.minimum} words, on average {stats.average} words and no more
        than {stats.maximum} words.
    </div>
)


const WordStatistics: React.FC = () => {
    const [wordStats, setWordStats] = useState<WordStats | undefined>();
    const [wordPopularity, setWordPopularity] = useState<WordPopularity[]>([])
    const {getWordStats, getWordPopularity} = useStats();
    useEffect(() => {
        const fetchStats = async () => {
            const result = await getWordStats();
            setWordStats(result);
        }
        const fetchPopularity = async () => {
            const result = await getWordPopularity();
            setWordPopularity(result);
        }
        fetchStats();
        fetchPopularity();
    }, []);

    return (
        <div>
            {
                wordStats && wordPopularity && (
                    <div>
                        <Typography variant={"h6"}>Word Statistics</Typography>
                        <SingleWordStatistics
                            stats={wordStats.line}
                            unit={"line"}/>
                        <SingleWordStatistics
                            stats={wordStats.verse}
                            unit={"verse"}/>
                        <SingleWordStatistics
                            stats={wordStats.song}
                            unit={"song"}/>
                        <Typography variant={"h6"}>Word Popularity</Typography>
                        <WordPopularityTable wordPopularity={wordPopularity}/>
                    </div>
                )
            }
        </div>
    )
};

export default WordStatistics;
