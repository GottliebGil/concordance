import React, {useState} from 'react';
import Input from "./infrastructure/Input";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    List,
    ListItemButton, ListItemText,
    ListSubheader,
    TextField
} from "@mui/material";

type Song = {
    id: number;
    name: string;
    artist_name: string;
};

const SearchSongs: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [songs, setSongs] = useState<Song[]>([]);
    const [inTitle, setInTitle] = useState<Boolean>(true);
    const [inLyrics, setInLyrics] = useState<Boolean>(true);
    const [inArtistName, setInArtistName] = useState<Boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isAllSongs, setIsAllSongs] = useState<boolean>(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSongs([]);
        setIsAllSongs(false);
        try {
            const response = await fetch(`http://localhost:8000/api/songs/search?` + new URLSearchParams({
                "q": query,
                "in_title": inTitle.toString(),
                "in_lyrics": inLyrics.toString(),
                "in_artist_name": inArtistName.toString()
            }));
            const data: Song[] = await response.json();
            setSongs(data);
        } catch (err) {
            setError('Error fetching songs');
        } finally {
            setIsLoading(false);
        }
    };

    const getAllSongs = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSongs([]);
        setQuery("");
        setIsAllSongs(true);
        try {
            const response = await fetch(`http://localhost:8000/api/songs`);
            const data: Song[] = await response.json();
            setSongs(data);
        } catch (err) {
            setError('Error fetching songs');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <form className={'flex flex-col gap-2'}>
                <div className={"flex flex-row gap-2"}>
                    <TextField label={"Search songs"} variant={"outlined"} value={query}
                               disabled={isLoading}
                               onChange={(e) => setQuery(e.target.value)}/>
                    <Button variant={"contained"} type={"submit"} onClick={handleSearch}
                            disabled={isLoading}>Search
                    </Button>
                    <div>
                        <FormControlLabel control={<Checkbox checked={inTitle} disabled={isLoading}
                                                             onChange={() => setInTitle(!inTitle)}/>}
                                          label="Song name"/>
                        <FormControlLabel control={<Checkbox checked={inArtistName} disabled={isLoading}
                                                             onChange={() => setInArtistName(!inArtistName)}/>}
                                          label="Artist name"/>
                        <FormControlLabel control={<Checkbox checked={inLyrics} disabled={isLoading}
                                                             onChange={() => setInLyrics(!inArtistName)}/>}
                                          label="Lyrics"/>
                    </div>


                </div>
                <div className={'font-bold'}>Or:</div>
                <div>
                    <Button variant={"outlined"} onClick={getAllSongs} disabled={isLoading}>
                        Get all songs
                    </Button>
                </div>


            </form>
            {
                isLoading && <p>Loading...</p>
            }
            {
                error && <p>{error}</p>
            }
            {
                !isLoading && !error && songs.length === 0 && <p>No songs found.</p>
            }
            <List
                sx={{width: '100%', maxWidth: 360}}
            >
                {songs.map((song) => (
                    <ListItemButton key={song.id}>
                        <ListItemText primary={song.name + " by " + song.artist_name}/>
                    </ListItemButton>
                ))}
            </List>
        </div>
    )
        ;
};

export default SearchSongs;
