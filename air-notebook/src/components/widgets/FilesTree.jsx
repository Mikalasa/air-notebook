import React, { useState } from 'react';
import { Tree, Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNode, renameNode, selectNote } from '../../store/slices/notesSlice';
import { handleOnDrop } from '../../utility/filesTree/handleOnDrop';
import { addIconsToTreeData } from '../../utility/filesTree/handleOnIconAdd';
import { handleRightClick } from '../../utility/filesTree/handleRightClick';
import { handleMenuClick } from '../../utility/filesTree/handleMenuClick';

const FilesTree = () => {
    const dispatch = useDispatch();
    const treeData = useSelector((state) => state.notes.treeData);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [contextMenuVisible, setContextMenuVisible] = useState(false);

    return (
        <>
            <Dropdown
                overlay={
                    <Menu onClick={(e) => handleMenuClick(e, contextMenuPosition, dispatch, renameNode, deleteNode, setContextMenuVisible)}>
                        <Menu.Item key="1">Rename</Menu.Item>
                        <Menu.Item key="2" danger>Delete</Menu.Item>
                    </Menu>
                }
                trigger={['contextMenu']}
                visible={contextMenuVisible}
                onVisibleChange={(visible) => setContextMenuVisible(visible)}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: contextMenuPosition.y,
                        left: contextMenuPosition.x,
                        display: contextMenuVisible ? 'block' : 'none',
                        zIndex: 1000,
                    }}
                />
            </Dropdown>
            <Tree
                className="draggable-tree"
                draggable
                blockNode
                onDragEnter={(info) => {}}
                onDrop={(info) => handleOnDrop(info, treeData, dispatch)}
                treeData={addIconsToTreeData(treeData)}
                showIcon
                onSelect={(selectedKeys, e) => {
                    if (selectedKeys.length > 0 && e.node.type === 'note') {
                        dispatch(selectNote(selectedKeys[0]));
                    }
                }}
                onRightClick={(e) => handleRightClick(e, setContextMenuPosition, setContextMenuVisible)}
            />
        </>
    );
};

export default FilesTree;
