// songsSlice.js
import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        currentPage: 1
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
});

// Export actions and reducer
export const {setCurrentPage} = appSlice.actions;
export default appSlice.reducer;
