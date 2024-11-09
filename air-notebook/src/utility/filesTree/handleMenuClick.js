export const handleMenuClick = (e, contextMenuPosition, dispatch, renameNode, deleteNode, setContextMenuVisible) => {
    console.log('Menu item clicked:', e.key);
    console.log('Current contextMenuPosition:', contextMenuPosition);

    if (e.key === '1') { // Rename
        const newName = prompt('Enter new name:', 'New Name');
        console.log('New name input:', newName);
        if (newName && contextMenuPosition.key) {
            console.log('Dispatching renameNode...');
            dispatch(renameNode({ key: contextMenuPosition.key, newName }));
        }
    } else if (e.key === '2') { // Delete
        if (contextMenuPosition.key) {
            console.log('Dispatching deleteNode...');
            console.log('contextMenuPosition.key:', contextMenuPosition.key);
            dispatch(deleteNode({ key: contextMenuPosition.key }));
        }
    }
    setContextMenuVisible(false);
};
