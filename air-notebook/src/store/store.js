import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';

export const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
});
