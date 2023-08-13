import React, {useContext, useMemo, useState} from "react";
import {Button, TextField} from "@mui/material";
import {setSearchPosition} from "../../store/songsSlice";
import {useDispatch} from "react-redux";
import {SearchContext} from "react-ctrl-f";


const PositionInASong: React.FC = () => {
    const [lineIndex, setLineIndex] = useState<string>('');
    const [wordIndex, setWordIndex] = useState<string>('');
    const dispatch = useDispatch();
    const {searchValue} = useContext(SearchContext);

    useMemo(async () => {

    }, [lineIndex, wordIndex]);

    const dispatchNewSearchPositions = async (line: string, word: string) => {
        if (line && word) {
            await dispatch(
                setSearchPosition(
                    {lineIndex: parseInt(line), wordIndex: parseInt(word)}
                )
            );
        } else {
            await dispatch(
                setSearchPosition(
                    {lineIndex: null, wordIndex: null}
                )
            );
        }
    }

    return (
        <div className={'flex flex-row items-baseline gap-2'}>
            <TextField label={"Line index"} variant={"standard"} value={lineIndex}
                       disabled={Boolean(searchValue)}
                       type={'number'}
                       onChange={async (e) => {
                           await setLineIndex(e.target.value);
                           await dispatchNewSearchPositions(e.target.value, wordIndex)
                       }}/>
            <TextField label={"Word index"} variant={"standard"} value={wordIndex}
                       disabled={Boolean(searchValue)}
                       type={'number'}
                       onChange={async (e) => {
                           await setWordIndex(e.target.value);
                           await dispatchNewSearchPositions(lineIndex, e.target.value)
                       }}/>
        </div>
    )
};

export default PositionInASong;