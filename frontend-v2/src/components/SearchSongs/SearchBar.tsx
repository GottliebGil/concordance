import React, {useEffect, useMemo} from "react";
import {Button, ButtonGroup, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setIsSearching, setSearchOptions, setSongs} from "../../store/songsSlice";
import useSongs from "../../hooks/useSongs";

const SearchBar: React.FC = () => {
    const isSearching = useSelector((state) => state.songs.isSearching);
    const searchOptions = useSelector((state) => state.songs.searchOptions);
    const searchQuery = useMemo(() => searchOptions.query, [searchOptions]);
    const dispatch = useDispatch();
    const {searchSongs, getAllSongs} = useSongs();
    const setSearchMode = async (e) => {
        e.preventDefault();
        await dispatch(setIsSearching(true));
        dispatch(setSongs([]));
    }

    const handleSearch = async (e) => {
        await setSearchMode(e)
        await searchSongs();
    };
    const handleGetAllSongs = async (e) => {
        await setSearchMode(e)
        await getAllSongs();
    }

    useEffect(() => {
        const fetchAll = async () => {
            await dispatch(setIsSearching(true));
            dispatch(setSongs([]));
            await getAllSongs()
        }
        fetchAll();
    }, [])

    const _setSearchOptions = async (value) => dispatch(setSearchOptions(value));

    return (
        <form className={'flex flex-col gap-2'}>
            <div className={"flex flex-row gap-2"}>
                <TextField label={"Search songs"} variant={"outlined"} value={searchQuery}
                           disabled={isSearching}
                           onChange={(e) => _setSearchOptions({...searchOptions, query: e.target.value})}/>
                <div>
                    <FormControlLabel control={
                        <Checkbox checked={searchOptions.inTitle}
                                  disabled={isSearching}
                                  onChange={() => _setSearchOptions({
                                      ...searchOptions,
                                      inTitle: !searchOptions.inTitle
                                  })}
                        />
                    } label="Song name"/>
                    <FormControlLabel control={
                        <Checkbox checked={searchOptions.inArtistName}
                                  disabled={isSearching}
                                  onChange={() => _setSearchOptions({
                                      ...searchOptions,
                                      inArtistName: !searchOptions.inArtistName
                                  })}
                        />
                    } label="Artist name"/>
                    <FormControlLabel control={
                        <Checkbox checked={searchOptions.inLyrics}
                                  disabled={isSearching}
                                  onChange={() => _setSearchOptions({
                                      ...searchOptions,
                                      inLyrics: !searchOptions.inLyrics
                                  })}
                        />
                    } label="Lyrics"/>
                </div>
            </div>
            <ButtonGroup>
                <Button variant={"contained"} onClick={handleGetAllSongs} disabled={isSearching}>
                    Get all songs
                </Button>
                <Button variant={"contained"} type={"submit"} onClick={handleSearch}
                        disabled={isSearching || !searchQuery}>Search
                </Button>
            </ButtonGroup>
        </form>
    )
};

export default SearchBar;