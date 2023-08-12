import Song from "../entities/Song";
import {setIsSearching, setSongs} from "../store/songsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";

const dispatch = useDispatch();

const searchSongs = async () => {
    const searchQuery = useMemo(() => searchOptions.query, [searchOptions]);
    const searchOptions = useSelector((state) => state.songs.searchOptions);
    try {
        const response = await fetch(`http://localhost:8000/api/songs/search?` + new URLSearchParams({
            "q": searchQuery,
            "in_title": searchOptions.inTitle.toString(),
            "in_lyrics": searchOptions.inLyrics.toString(),
            "in_artist_name": searchOptions.inArtistName.toString()
        }));
        const data: Song[] = await response.json();
        dispatch(setSongs(data));
    } catch (err) {
        console.log('Error fetching songs');
    } finally {
        dispatch(setIsSearching(false));
    }
};

const getAllSongs = async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/songs`);
        const data: Song[] = await response.json();
        dispatch(setSongs(data));
    } catch (err) {
        console.log('Error fetching songs');
    } finally {
        await dispatch(setIsSearching(false));
    }
}

export {searchSongs, getAllSongs};