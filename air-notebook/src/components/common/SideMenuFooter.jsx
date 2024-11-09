import React, { useState } from 'react';
import { Button, Modal, List, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { restoreNode } from '../../store/slices/notesSlice';

const SideMenuFooter = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [deletedNotes, setDeletedNotes] = useState([]);
    const dispatch = useDispatch();

    const showModal = () => {
        // every time the modal is opened, we need to update the deletedNotes state
        const updatedDeletedNotes = JSON.parse(localStorage.getItem('deletedData')) || [];
        setDeletedNotes(updatedDeletedNotes);
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    const handleRestore = (key) => {
        dispatch(restoreNode({ key }));
        const updatedDeletedNotes = deletedNotes.filter(note => note.key !== key);
        setDeletedNotes(updatedDeletedNotes);
    };

    const handlePermanentDelete = (key) => {
        const updatedDeletedNotes = deletedNotes.filter(note => note.key !== key);
        localStorage.setItem('deletedData', JSON.stringify(updatedDeletedNotes));
        setDeletedNotes(updatedDeletedNotes);
        alert('Note has been permanently deleted.');
    };

    return (
        <div
            className={'CUSTOMER_CARD'}
            style={{
                flex: '0 0 10%',
                padding: '10px',
                borderTop: '1px solid #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <Button type="default" shape="circle" icon={<DeleteOutlined />} onClick={showModal} />

            <Modal
                title="Deleted Notes"
                visible={isModalVisible}
                onCancel={handleClose}
                footer={null}
            >
                <List
                    dataSource={deletedNotes}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button type="link" onClick={() => handleRestore(item.key)}>Restore</Button>,
                                <Button type="link" danger onClick={() => handlePermanentDelete(item.key)}>Permanently Delete</Button>,
                            ]}
                        >
                            <Typography.Text>{item.title}</Typography.Text>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
};

export default SideMenuFooter;
