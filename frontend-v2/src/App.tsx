// src/App.tsx
import React, {useState} from 'react';
import UploadSong from './components/UploadSong';
import SearchSongs from "./components/SearchSongs/SearchSongs";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {useDispatch, useSelector} from "react-redux";
import ManageWordGroups from "./components/ManageWordGroups";
import WordStatistics from "./components/WordStatistics/WordStatistics";
import MainPage from "./components/MainPage";
import {setCurrentPage} from "./store/appSlice";
import {AppBar, Box, IconButton, Toolbar} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

const App: React.FC = () => {
    const currentPage = useSelector((state) => state.app.currentPage);
    const dispatch = useDispatch();
    const goBack = async () => await dispatch(setCurrentPage(-1));
    return (
        <div className="flex flex-col gap-4">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton onClick={goBack} size='large' edge='start' disabled={currentPage === -1}>
                        {currentPage === -1 ? <HomeIcon/> : <ArrowBackIcon/>}
                    </IconButton>
                    Lyrics Concordance
                </Toolbar>
            </AppBar>
            <div className={"flex flex-col gap-2"}>
                <div>Created by Gil Gottlieb for The Open University of Israel in 2023c.</div>
            </div>
            {
                (currentPage == -1 && <MainPage/>) || (
                    <div className={'items-center'}>
                        <div className={'flex flex-col gap-2 max-w-800 margin-auto'}>
                            {
                                currentPage == 0 && <UploadSong/>
                            }
                            {
                                currentPage == 1 && <SearchSongs/>
                            }
                            {
                                currentPage == 2 && <ManageWordGroups/>
                            }
                            {
                                currentPage == 3 && <WordStatistics/>
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default App;
