import React, {useMemo} from "react";
import {Button, Checkbox, FormControlLabel, TextField, Tooltip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setIsSearching, setSearchOptions, setSongs} from "../../store/songsSlice";
import useSongs from "../../hooks/useSongs";
import {Word} from "../../entities/Song";

interface LyricsWithPositionsProps {
    songWords: Word[][];
}

const LyricsWithPositions: React.FC = ({songWords}: LyricsWithPositionsProps) => {
    const searchPositions = useSelector((state) => state.songs.searchPosition)
    const shouldColour = (line: number, word: number) => {
        if (!searchPositions) return false;
        return line === searchPositions.lineIndex && word === searchPositions.wordIndex;
    }
    return (
        <div className={'flex flex-col gap-2'}>
            {songWords.map(verse => (
                <div className={'flex flex-col gap-0'}>
                    {
                        verse.map(line => (
                            <div className={'flex flex-row flex-wrap gap-1'}>
                                {
                                    line.map(word => (
                                        <Tooltip
                                            title={`Verse ${word.verse_index}, Line ${word.line_index}, Word ${word.word_index}`}>
                                            <span className={'hover:text-slate-400'}>
                                                {word.word}
                                            </span>
                                        </Tooltip>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            ))}
        </div>
    )
};

export default LyricsWithPositions;