// src/components/UploadSong.tsx
import React, {useState} from 'react';

function UploadSong() {
    const [files, setFiles] = useState<FileList>([]);
    const [songName, setSongName] = useState<String>("");
    const [artistName, setArtistName] = useState<String>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = event.target.files || [];
        setFiles(uploadedFiles);
    };

    const _doUpload = async (file) => {
        const fileContent = await file.text();
        await fetch("http://localhost:8000/api/songs/add", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'cache-control': 'no-cache'
            },
            body: JSON.stringify({
                "song_name": songName,
                "artist_name": artistName,
                "content": fileContent,
                "file_name": file.name
            })
        });
    }

    const handleUpload = async () => {
        for (const file of files) {
            try {
                await _doUpload(file);
            }
            catch (e) {
                console.log('Failed uploading');
            }
        }
    };

    return (
        <div className={"flex flex-col gap-2"}>
            <div className={"text-xl"}>Upload new song</div>
            <div className={"flex flex-col gap-4"}>
                <input type="file" onChange={handleFileChange} multiple/>
                <input type="text" placeholder={"Artist name"} onChange={(e) => setArtistName(e.target.value)}/>
                <input type="text" placeholder={"Song name"} onChange={(e) => setSongName(e.target.value)}/>
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
}

export default UploadSong;
