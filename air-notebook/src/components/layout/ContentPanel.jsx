import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { HomeOutlined, FileOutlined, FolderOutlined } from '@ant-design/icons';
import EditorComponent from '../tools/EditorComponent';
import { useSelector } from 'react-redux';

const { Content } = Layout;

const ContentPanel = ({ selectedNoteId }) => {
    const treeData = useSelector((state) => state.notes.treeData);

    // Helper function to find the path based on selectedNoteId
    const findPathById = (data, id, path = []) => {
        for (let item of data) {
            const newPath = [...path, item];
            if (item.key === id) {
                return newPath;
            }
            if (item.children) {
                const result = findPathById(item.children, id, newPath);
                if (result) return result;
            }
        }
        return null;
    };

    const path = findPathById(treeData, selectedNoteId) || [];

    return (
        <Layout className={'CONTENT-PANEL'} style={{margin: '10px 10px 0 20px'}}>
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '20px 20px 0 0',
                    padding: '10px 10px 0 30px',
                }}
            >
                <Breadcrumb>
                    <Breadcrumb.Item key="home">
                        <HomeOutlined />
                        <span>Home</span>
                    </Breadcrumb.Item>
                    {path.map((item) => (
                        <Breadcrumb.Item key={item.key}>
                            {item.type === 'folder' ? <FolderOutlined /> : <FileOutlined />}
                            <span>{item.title}</span>
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>
            <Content
                className={'CUSTOMER_CARD'}
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    overflowY: 'auto',
                }}
            >
                <EditorComponent selectedNoteId={selectedNoteId}/>
            </Content>
        </Layout>
    );
};

export default ContentPanel;
