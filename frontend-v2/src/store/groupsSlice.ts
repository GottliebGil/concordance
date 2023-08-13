import {createSlice} from '@reduxjs/toolkit';


export const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        groups: [],
        isLoading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setGroups: (state, action) => {
            state.groups = action.payload;
        }
    }
});

// Export actions and reducer
export const {setGroups, setLoading} = groupsSlice.actions;
export default groupsSlice.reducer;
