import {SongWord, Song, WordPosition} from "../entities/Song";
import {setIsSearching, setSongs} from "../store/songsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";


const useWords = () => {
    const getWordsPositions = async (words: string[]) => {
        const response = await fetch('http://localhost:8000/api/words/get_many', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'cache-control': 'no-cache'
            },
            body: JSON.stringify({
                "words": words
            })
        });
        const data: WordPosition[] = await response.json();
        return data;
    };


    return {
        getWordPositions: getWordsPositions
    }
}


export default useWords;