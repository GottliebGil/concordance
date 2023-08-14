import { configureStore } from '@reduxjs/toolkit';
import songsReducer from './songsSlice';
import groupsReducer from './groupsSlice';
import appReducer from './appSlice';

const store = configureStore({
  reducer: {
    songs: songsReducer,
    groups: groupsReducer,
    app: appReducer
  }
});

export default store;
