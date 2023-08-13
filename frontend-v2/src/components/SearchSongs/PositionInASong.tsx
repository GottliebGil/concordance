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
        await dispatch(
            setSearchPosition(
                {lineIndex: parseInt(lineIndex), wordIndex: parseInt(wordIndex)}
            )
        );
    }, [lineIndex, wordIndex]);
    return (
        <div className={'flex flex-row items-baseline gap-2'}>
            <TextField label={"Line index"} variant={"standard"} value={lineIndex}
                       disabled={searchValue}
                       type={'number'}
                       onChange={(e) => setLineIndex(e.target.value)}/>
            <TextField label={"Word index"} variant={"standard"} value={wordIndex}
                       disabled={searchValue}
                       type={'number'}
                       onChange={(e) => setWordIndex(e.target.value)}/>
        </div>
    )
};

export default PositionInASong;