// songsSlice.js
import {createSlice} from '@reduxjs/toolkit';

interface SearchQueryProps {
    query: string;
    inTitle: boolean;
    inArtistName: boolean;
    inLyrics: boolean;
}

const defaultSearchOptions: SearchQueryProps = {
    query: '',
    inTitle: true,
    inArtistName: true,
    inLyrics: true
}

export const songsSlice = createSlice({
    name: 'songs',
    initialState: {
        songs: [],
        searchOptions: defaultSearchOptions,
        isSearching: false
    },
    reducers: {
        setSongs: (state, action) => {
            state.songs = action.payload;
        },
        setSearchOptions: (state, action) => {
            state.searchOptions = action.payload;
        },
        setIsSearching: (state, action) => {
            state.isSearching = action.payload;
        }
    }
});

// Export actions and reducer
export const {setSongs, setSearchOptions, setIsSearching} = songsSlice.actions;
export default songsSlice.reducer;
