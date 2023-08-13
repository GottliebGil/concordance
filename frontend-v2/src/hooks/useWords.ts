import {SongWord, Song, WordPosition} from "../entities/Song";
import {setIsSearching, setSongs} from "../store/songsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";


const useWords = () => {
    const getWordPositions = async (word: string) => {
        const response = await fetch(`http://localhost:8000/api/words/${word}`);
        const data: WordPosition[] = await response.json();
        return data;
    };


    return {
        getWordPositions
    }
}


export default useWords;