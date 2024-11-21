import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import demoFilesTreeData from '../../data/demo_filesTreeData.json';


const initializeState = () => {
    const user = localStorage.getItem('user');
    const treeData = user
        ? JSON.parse(localStorage.getItem('treeData')) || []
        : demoFilesTreeData;
    return {
        selectedNoteId: null,
        treeData,
    };
};

const updateLocalStorageTreeData = (newTreeData) => {
    localStorage.setItem('treeData', JSON.stringify(newTreeData));
};

const updateNodeTitle = (tree, key, newName) => {
    for (let node of tree) {
        if (node.key === key) {
            node.title = newName;
            return true;
        }
        if (node.children) {
            const found = updateNodeTitle(node.children, key, newName);
            if (found) return true;
        }
    }
    return false;
};


const deleteNodeFromTree = (tree, key) => {
    return tree.filter(node => {
        if (node.key === key) {
            return false;
        }
        if (node.children) {
            node.children = deleteNodeFromTree(node.children, key);
        }
        return true;
    });
};

const restoreNodeToTree = (tree, restoredNode) => {
    tree.unshift(restoredNode);
    return tree;
};

const notesSlice = createSlice({
    name: 'notes',
    initialState: initializeState(),
    reducers: {
        selectNote: (state, action) => {
            state.selectedNoteId = action.payload;
        },
        addNote: (state) => {
            const newNote = {
                title: 'New Note',
                key: uuidv4(),
                type: 'note',
            };
            state.treeData.unshift(newNote);
            updateLocalStorageTreeData(state.treeData);
        },
        addFolder: (state) => {
            const newFolder = {
                title: 'New Folder',
                key: uuidv4(),
                type: 'folder',
                selectable: false,
                children: [],
            };
            state.treeData.unshift(newFolder);
            updateLocalStorageTreeData(state.treeData);
        },
        renameNode: (state, action) => {
            console.log('renameNode');
            const { key, newName } = action.payload;
            const updated = updateNodeTitle(state.treeData, key, newName);
            if (updated) {
                updateLocalStorageTreeData(state.treeData);
            }
        },
        deleteNode: (state, action) => {
            const { key } = action.payload;
            const deletedNode = state.treeData.find(node => node.key === key) || null;
            if (deletedNode) {
                state.treeData = deleteNodeFromTree(state.treeData, key);
                updateLocalStorageTreeData(state.treeData);

                // Update deletedData in localStorage
                const deletedData = JSON.parse(localStorage.getItem('deletedData')) || [];
                deletedData.push(deletedNode);
                localStorage.setItem('deletedData', JSON.stringify(deletedData));
            }
        },
        restoreNode: (state, action) => {
            const { key } = action.payload;
            const deletedData = JSON.parse(localStorage.getItem('deletedData')) || [];
            const restoredNode = deletedData.find(node => node.key === key);

            if (restoredNode) {
                state.treeData = restoreNodeToTree(state.treeData, restoredNode);
                updateLocalStorageTreeData(state.treeData);
                const updatedDeletedData = deletedData.filter(node => node.key !== key);
                localStorage.setItem('deletedData', JSON.stringify(updatedDeletedData));
            }
        },
        updateTreeData: (state, action) => {
            state.treeData = action.payload;
            updateLocalStorageTreeData(state.treeData);
        },
        setNotes: (state, action) => {
            state.treeData = action.payload.treeData;
            updateLocalStorageTreeData(state.treeData);
        },
    },
});


export const {
    selectNote,
    addNote,
    addFolder,
    updateTreeData,
    renameNode,
    deleteNode,
    restoreNode,
    setNotes,
} = notesSlice.actions;
export default notesSlice.reducer;
