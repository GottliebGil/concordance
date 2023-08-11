// src/components/UploadSong.tsx
import React, {useState} from 'react';

function UploadSong() {
    const [file, setFile] = useState<File | null>(null);
    const [songName, setSongName] = useState<String>("");
    const [artistName, setArtistName] = useState<String>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files ? event.target.files[0] : null;
        setFile(uploadedFile);
    };

    const handleUpload = async () => {
        if (file) {
            const fileContent = await file.text()

            try {
                const response = await fetch("http://localhost:8000/api/songs/add", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "song_name": songName,
                        "artist_name": artistName,
                        "content": fileContent,
                        "file_name": file.name
                    })
                });

                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    return (
        <div className={"flex flex-col gap-2"}>
            <div className={"text-xl"}>Upload new song</div>
            <div className={"flex flex-col gap-4"}>
                <input type="file" onChange={handleFileChange}/>
                <input type="text" placeholder={"Artist name"} onChange={(e) => setArtistName(e.target.value)}/>
                <input type="text" placeholder={"Song name"} onChange={(e) => setSongName(e.target.value)}/>
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
}

export default UploadSong;
