import {Group} from "../entities/Group";
import {setLoading, setGroups} from "../store/groupsSlice";
import {useDispatch} from "react-redux";


const useGroups = () => {
    const dispatch = useDispatch();
    const getGroups = async () => {
        dispatch(setLoading(true));
        try {
            const response = await fetch(`http://localhost:8000/api/groups/`);
            const data: Group[] = await response.json();
            dispatch(setGroups(data));
            dispatch(setLoading(false));
        } catch (err) {
            console.log('Error fetching songs');
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        getGroups
    }
}


export default useGroups;