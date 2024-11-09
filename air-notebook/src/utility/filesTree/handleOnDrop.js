import { updateTreeData } from '../../store/slices/notesSlice';

export const handleOnDrop = (info, treeData, dispatch) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    if (info.node.type === 'note') {
        return; // Prevent dropping on a note
    }

    const loop = (data, key, callback) => {
        for (let i = 0; i < data.length; i++) {
            const item = { ...data[i] };
            data[i] = item;
            if (item.key === key) {
                return callback(item, i, data);
            }
            if (item.children) {
                loop(item.children, key, callback);
            }
        }
    };

    const data = JSON.parse(JSON.stringify(treeData));
    let dragObj;

    loop(data, dragKey, (item, index, arr) => {
        dragObj = { ...item };
        arr.splice(index, 1);
    });

    if (!info.dropToGap) {
        loop(data, dropKey, (item) => {
            item.children = item.children ? [...item.children, dragObj] : [dragObj];
        });
    } else {
        let ar;
        let i;
        loop(data, dropKey, (item, index, arr) => {
            ar = arr;
            i = index;
        });
        if (dropPosition === -1) {
            ar.splice(i, 0, dragObj);
        } else {
            ar.splice(i + 1, 0, dragObj);
        }
    }

    dispatch(updateTreeData(data));
};
