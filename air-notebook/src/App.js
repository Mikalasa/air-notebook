import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './page/Home';
import { setNotes } from './store/slices/notesSlice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            fetch('/api/notes')
                .then((response) => response.json())
                .then((data) => {
                    dispatch(setNotes(data));
                })
                .catch((error) => {
                    console.error('Error fetching notes:', error);
                });
        }
    }, [dispatch]);

    return <Home />;
}

export default App;