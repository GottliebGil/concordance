import React, {useState} from 'react';

type Song = {
    id: number;
    title: string;
    artist: string;
};

const SearchSongs: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [songs, setSongs] = useState<Song[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        setIsLoading(true);
        setError(null);
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

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for songs..."
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && songs.length === 0 && <p>No songs found.</p>}
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        {song.title} by {song.artist}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchSongs;
