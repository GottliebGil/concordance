// src/App.tsx
import React from 'react';
import UploadSong from './components/UploadSong';

const App: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className={"flex flex-col gap-2"}>
                <h1 className={"text-3xl"}>Lyrics Concordance</h1>
                <div>Created by Gil Gottlieb for The Open University of Israel in 2023c.</div>
            </div>

            <UploadSong/>
        </div>
    );
}

export default App;
