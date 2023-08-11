// src/App.tsx
import React, {useState} from 'react';
import UploadSong from './components/UploadSong';
import SearchSongs from "./components/SearchSongs";

const App: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<Number>(1);
    return (
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
                )
            }

            {
                currentTab == 0 && (
                    <div className={'flex flex-col gap-2'}>
                        <div className={'cursor-pointer text-sm bg-teal-100'} onClick={() => setCurrentTab(-1)}>
                            BACK
                        </div>
                        <UploadSong/>
                    </div>

                )
            }

            {
                currentTab == 1 && (
                    <div className={'flex flex-col gap-2'}>
                        <div className={'cursor-pointer text-sm bg-teal-100'} onClick={() => setCurrentTab(-1)}>
                            BACK
                        </div>
                        <SearchSongs />
                    </div>

                )
            }
        </div>
    );
}

export default App;
