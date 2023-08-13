import React, {useMemo} from "react";
import {Button, Checkbox, FormControlLabel, TextField, Tooltip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setIsSearching, setSearchOptions, setSongs} from "../../store/songsSlice";
import useSongs from "../../hooks/useSongs";
import {SongWord} from "../../entities/Song";

interface LyricsWithPositionsProps {
    songWords: SongWord[][];
}

const LyricsWithPositions: React.FC = ({songWords}: LyricsWithPositionsProps) => {
    const searchPositions = useSelector((state) => state.songs.searchPosition)
    const getBackground = (line: number, word: number) => {
        if (!searchPositions) return '';
        const shouldColour = line === searchPositions.lineIndex && word === searchPositions.wordIndex;
        if (shouldColour) return 'bg-orange-400';
        return '';
    }
    return (
        <div className={'flex flex-col gap-2'}>
            {songWords.map((verse, index) => (
                <div key={`verse-${index}`} className={'flex flex-col gap-0'}>
                    {
                        verse.map((line, index) => (
                            <div key={`line-${index}`} className={'flex flex-row flex-wrap gap-1'}>
                                {
                                    line.map(word => (
                                        <span
                                            key={`Verse ${word.verse_index}, Line ${word.line_index}, Word ${word.word_index}`}>
                                            <Tooltip
                                                classes={
                                                    {'popper': 'select-none'}
                                                }
                                                title={`Verse ${word.verse_index}, Line ${word.line_index}, Word ${word.word_index}`}>
                                            <span
                                                className={`hover:text-slate-400 ${getBackground(word.line_index, word.word_index)}`}>
                                                {word.appearance}
                                            </span>
                                        </Tooltip>
                                        </span>

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