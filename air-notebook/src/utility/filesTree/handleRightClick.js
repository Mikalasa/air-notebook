export const handleRightClick = ({ event, node }, setContextMenuPosition, setContextMenuVisible) => {
    console.log('Right-clicked node:', node);
    if (node && node.key) {
        setContextMenuPosition({ x: event.clientX, y: event.clientY, key: node.key });
        setContextMenuVisible(true);
    }
};