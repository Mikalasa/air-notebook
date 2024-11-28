import React, { useState } from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { restoreNode } from '../../store/slices/notesSlice';
import TrashModal from '../modal/TrashModal';

const SideMenuFooter = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [deletedNotes, setDeletedNotes] = useState([]);
    const dispatch = useDispatch();

    const showModal = () => {
        const updatedDeletedNotes = JSON.parse(localStorage.getItem('deletedData')) || [];
        setDeletedNotes(updatedDeletedNotes);
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    const handleRestore = (key) => {
        dispatch(restoreNode({ key }));
        const updatedDeletedNotes = deletedNotes.filter((note) => note.key !== key);
        setDeletedNotes(updatedDeletedNotes);
    };

    const handlePermanentDelete = (key) => {
        const updatedDeletedNotes = deletedNotes.filter((note) => note.key !== key);
        localStorage.setItem('deletedData', JSON.stringify(updatedDeletedNotes));
        setDeletedNotes(updatedDeletedNotes);
        alert('Note has been permanently deleted.');
    };

    return (
        <div
            className="CUSTOMER_CARD"
            style={{
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
                backgroundColor: '#f2f2fd',
            }}
        >
            <Button type="default" shape="circle" icon={<DeleteOutlined />} onClick={showModal} />
            <TrashModal
                visible={isModalVisible}
                onClose={handleClose}
                deletedNotes={deletedNotes}
                onRestore={handleRestore}
                onPermanentDelete={handlePermanentDelete}
            />
        </div>
    );
};

export default SideMenuFooter;