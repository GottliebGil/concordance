// src/App.tsx
import React, {useState} from 'react';
import UploadSong from './components/UploadSong';
import SearchSongs from "./components/SearchSongs/SearchSongs";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {Provider, useDispatch, useSelector} from "react-redux";
import ManageWordGroups from "./components/ManageWordGroups";
import WordStatistics from "./components/WordStatistics/WordStatistics";
import MainPage from "./components/MainPage";
import {setCurrentPage} from "./store/appSlice";


const App: React.FC = () => {
    const currentPage = useSelector((state) => state.app.currentPage);
    const dispatch = useDispatch();
    const goBack = async () => await dispatch(setCurrentPage(-1));
    return (
        <div className="flex flex-col gap-4">
            <div className={"flex flex-col gap-2"}>
                <h1 className={"text-3xl"}>Lyrics Concordance</h1>
                <div>Created by Gil Gottlieb for The Open University of Israel in 2023c.</div>
            </div>
            {
                (currentPage == -1 && <MainPage/>) || (
                    <div className={'flex flex-col gap-2'}>
                        <div className={'flex flex-row justify-items-start'}>
                            <button className={'bg-rose-100 text-sm border-1 rounded p-2'}
                                    onClick={goBack}>
                                BACK
                            </button>
                        </div>
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
                )
            }
        </div>
    );
}

export default App;
