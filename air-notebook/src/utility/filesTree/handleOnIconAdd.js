import { FileOutlined, FolderOpenOutlined, FolderOutlined } from '@ant-design/icons';

export const addIconsToTreeData = (data) => {
    return data.map((item) => {
        let newItem = { ...item };
        if (item.children) {
            newItem.children = addIconsToTreeData(item.children);
        }
        if (item.type === 'folder') {
            newItem.icon = ({ expanded }) =>
                expanded ? <FolderOpenOutlined /> : <FolderOutlined />;
        }
        if (item.type === 'note') {
            newItem.icon = <FileOutlined />;
        }
        return newItem;
    });
};
