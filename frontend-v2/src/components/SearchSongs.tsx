import React, {useState} from 'react';

type Song = {
    id: number;
    name: string;
    artist_name: string;
};

const SearchSongs: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [songs, setSongs] = useState<Song[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSongs([]);
        try {
            const response = await fetch(`http://localhost:8000/api/songs/search?q=${query}`);
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
            <form className={'flex flex-row gap-4'}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for songs..."
                />
                <button className={'cursor-pointer border'} type={"submit"} onClick={handleSearch} disabled={isLoading}>Search</button>
                <button className={"cursor-pointer border"} onClick={getAllSongs} disabled={isLoading}>GET ALL</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && songs.length === 0 && <p>No songs found.</p>}
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        {song.name} by {song.artist_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchSongs;
