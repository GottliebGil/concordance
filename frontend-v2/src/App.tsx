// src/App.tsx
import React, {useState} from 'react';
import UploadSong from './components/UploadSong';
import SearchSongs from "./components/SearchSongs/SearchSongs";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import store from "./store/store";
import {Provider} from "react-redux";


const App: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<Number>(1);
    return (
        <Provider store={store}>
            <div className="flex flex-col gap-4">
                <div className={"flex flex-col gap-2"}>
                    <h1 className={"text-3xl"}>Lyrics Concordance</h1>
                    <div>Created by Gil Gottlieb for The Open University of Israel in 2023c.</div>
                </div>
                {
                    currentTab == -1 && (
                        <div className={'bg-teal-100'}>
                            <div>Select which action you'd like to take:</div>
                            <div className={'cursor-pointer'} onClick={() => setCurrentTab(0)}>
                                Upload song
                            </div>
                            <div className={'cursor-pointer'} onClick={() => setCurrentTab(1)}>
                                Search for songs
                            </div>
                        </div>
                    ) || (
                        <div className={'flex flex-col gap-2'}>
                            <div className={'flex flex-row justify-items-start'}>
                                <button className={'bg-rose-100 text-sm border-1 rounded p-2'}
                                        onClick={() => setCurrentTab(-1)}>
                                    BACK
                                </button>
                            </div>
                            {
                                currentTab == 0 && <UploadSong/>
                            }
                            {
                                currentTab == 1 && <SearchSongs/>
                            }
                        </div>
                    )
                }

            </div>
        </Provider>
    );
}

export default App;