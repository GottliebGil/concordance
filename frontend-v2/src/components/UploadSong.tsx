// src/components/UploadSong.tsx
import React, {useMemo, useState} from 'react';
import {MuiFileInput} from 'mui-file-input'
import input from "./infrastructure/Input";
import {Button, TextField} from "@mui/material";

function UploadSong() {
    const [files, setFiles] = useState<File[]>([]);
    const [songName, setSongName] = useState<String>("");
    const [artistName, setArtistName] = useState<String>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [uploads, setUploads] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const hasManyFiles = useMemo(() => files.length > 0, [files]);

    const handleFileChange = (newFiles) => {
        for (const file of newFiles) {
            const splitFileName = file.name.split(' - ');
            if (splitFileName.length != 2) {
                setErrors(["Every selected file name must be of the format ARTIST_NAME - SONG_NAME"]);
                setUploads([]);
                setFiles([]);
                return;
            }
        }
        setFiles(newFiles);
        setErrors([]);
        setUploads([]);
    };

    const _doUpload = async (file) => {
        const fileContent = await file.text();
        return await fetch("http://localhost:8000/api/songs/add", {
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
        setIsUploading(true);
        const errorsInUpload = []
        const successStories = []
        for (const file of files) {
            try {
                const response = await _doUpload(file);
                const parsedResponse = await response.json()
                if (response.status === 400) {
                    errorsInUpload.push(`${file.name}: ${parsedResponse.detail}`)
                } else {
                    successStories.push(file.name);
                }
            } catch (e) {
                errorsInUpload.push(`${file.name}: Unknown error`)
            }
        }
        setErrors(errorsInUpload);
        setUploads(successStories);
        setIsUploading(false);
    };

    return (
        <div className={"flex flex-col gap-2"}>
            <div className={"text-xl"}>Upload new song</div>
            <div className={"flex flex-col gap-4"}>
                <div>Click the button below and select the lyrics.</div>
                <MuiFileInput value={files} onChange={handleFileChange} multiple/>
                <div className={'flex flex-col items-center'}>
                    <Button
                        variant='contained'
                        disabled={files.length === 0}
                        onClick={handleUpload}>Upload</Button>
                </div>
                {
                    uploads.length > 0 && (
                        <div className={'flex flex-col gap-1'}>
                            <div>Successfully uploaded</div>
                            <div className={'flex flex-col gap-1'}>{uploads.map((songName, index) => (
                                <div>{songName}</div>
                            ))}</div>
                        </div>
                    )
                }
                {
                    errors && (
                        <div className={'flex flex-col gap-1 text-red-400'}>{errors.map((error, index) => (
                            <div>{error}</div>
                        ))}</div>
                    )
                }
            </div>
        </div>
    );
}

export default UploadSong;
