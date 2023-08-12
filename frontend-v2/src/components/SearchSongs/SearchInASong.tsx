import React, {useContext} from "react";
import {Button, TextField} from "@mui/material";
import {SearchContext, SearchEventContext} from "react-ctrl-f";


const SearchInASong: React.FC = () => {
    const {searchValue, activeCount, totalCount} = useContext(SearchContext);
    const {onSearchChange, onPrev, onNext} = useContext(SearchEventContext);
    return (
        <div className={'flex flex-row items-baseline gap-2'}>
            <TextField label={"Search in song"} variant={"standard"} value={searchValue}
                       onChange={onSearchChange}/>
            <Button
                disabled={!searchValue}
                onClick={() => onPrev(100)}>Prev
            </Button>
            <span className={!searchValue ? 'opacity-50' : ''}>
                      {activeCount}/{totalCount}
                    </span>
            <Button
                disabled={!searchValue}
                onClick={() => onNext(100)}>Next
            </Button>
        </div>
    )
};

export default SearchInASong;