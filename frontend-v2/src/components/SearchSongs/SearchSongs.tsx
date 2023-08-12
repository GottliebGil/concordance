import React, {useContext, useMemo, useState} from 'react';
import Song from '../../entities/Song'
import {
    MatchText, SearchProvider, SearchContext,
    SearchEventContext
} from 'react-ctrl-f';

import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    List,
    ListItemButton, ListItemText,
    ListSubheader, Modal,
    TextField, Typography
} from "@mui/material";
import SongLyricsModal from "../SongLyricsModal";
import SearchBar from "./SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {setIsSearching, setSearchOptions, setSongs} from "../../store/songsSlice";


const SearchSongs: React.FC = () => {
    const songs = useSelector((state) => state.songs.songs);
    const isSearching = useSelector((state) => state.songs.isSearching);
    const searchOptions = useSelector((state) => state.songs.searchOptions);
    const searchQuery = useMemo(() => searchOptions.query, [searchOptions]);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [songInModal, setSongInModal] = useState<Song | null>(null);



    const openSong = async (song: Song) => {
        await setSongInModal(song);
        await setIsModalOpen(true);
    };
    const closeSong = async () => {
        await setIsModalOpen(false);
        await setSongInModal(null);
    }


    return (
        <div>
            <SearchBar />
            {
                isSearching && <p>Loading...</p>
            }
            {
                !isSearching && songs.length === 0 && <p>No songs found.</p>
            }
            <List
                sx={{width: '100%', maxWidth: 360}}
            >
                {songs.map((song, index) => (
                    <ListItemButton key={index} onClick={() => openSong(song)}>
                        <ListItemText primary={song.name + " by " + song.artist_name}/>
                    </ListItemButton>
                ))}
            </List>
            {
                songInModal && (
                    <SongLyricsModal
                        isModalOpen={isModalOpen}
                        onClose={closeSong}
                        song={songInModal}/>
                )
            }
        </div>

    );
};

export default SearchSongs;
