import {Group} from "../entities/Group";
import {setLoading, setGroups} from "../store/groupsSlice";
import {useDispatch} from "react-redux";


const useGroups = () => {
    const dispatch = useDispatch();
    const getGroups = async () => {
        dispatch(setLoading(true));
        const response = await fetch(`http://localhost:8000/api/groups/`);
        const data: Group[] = await response.json();
        dispatch(setGroups(data));
        dispatch(setLoading(false));
    };

    const getGroupWords = async (groupId: number) => {
        const response = await fetch(`http://localhost:8000/api/groups/${groupId}/words`, {
            headers: {'cache-control': 'no-cache'}
        });
        const data: string[] = await response.json();
        return data
    };

    const getWordsNotInGroup = async (groupId: number) => {
        const response = await fetch(`http://localhost:8000/api/groups/${groupId}/words/new`, {
            headers: {'cache-control': 'no-cache'}
        });
        const data: string[] = await response.json();
        return data
    };

    const removeWordFromGroup = async (groupId: number, word: string) => {
        await fetch(`http://localhost:8000/api/groups/${groupId}/words`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "word": word
            })
        });
        await getGroups();
    }

    const addWordToGroup = async (groupId: number, word: string) => {
        await fetch(`http://localhost:8000/api/groups/${groupId}/words`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "word": word
            })
        });
        await getGroups();
    }

    const createGroup = async (groupName: string) => {
        await fetch(`http://localhost:8000/api/groups/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": groupName
            })
        });
    }

    const deleteGroup = async (groupId: number) => {
        await fetch(`http://localhost:8000/api/groups/${groupId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    return {
        getGroups,
        getGroupWords,
        getWordsNotInGroup,
        removeWordFromGroup,
        addWordToGroup,
        createGroup,
        deleteGroup
    }
}


export default useGroups;