import React, {useContext, useState} from "react";
import {Button, TextField} from "@mui/material";
import {setSearchPosition} from "../../store/songsSlice";
import {useDispatch} from "react-redux";
import {SearchContext} from "react-ctrl-f";


const PositionInASong: React.FC = () => {
    const [lineIndex, setLineIndex] = useState<number | undefined>(undefined);
    const [wordIndex, setWordIndex] = useState<number | undefined>(undefined);
    const dispatch = useDispatch();
    const {searchValue} = useContext(SearchContext);

    const _handleGo = async () => {
        await dispatch(setSearchPosition({lineIndex, wordIndex}));
    }
    return (
        <div className={'flex flex-row items-baseline gap-2'}>
            <TextField label={"Line index"} variant={"standard"} value={lineIndex}
                       disabled={searchValue}
                       onChange={(e) => setLineIndex(e.target.value)}/>
            <TextField label={"Word index"} variant={"standard"} value={wordIndex}
                       disabled={searchValue}
                       onChange={(e) => setWordIndex(e.target.value)}/>
            <Button
                disabled={!lineIndex || !wordIndex || searchValue}
                onClick={_handleGo}>Go
            </Button>
        </div>
    )
};

export default PositionInASong;