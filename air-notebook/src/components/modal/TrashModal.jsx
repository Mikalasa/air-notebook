import React from 'react';
import { Modal, List, Typography, Button } from 'antd';

const TrashModal = ({ visible, onClose, deletedNotes, onRestore, onPermanentDelete }) => {
    return (
        <Modal
            className="trash-modal"
            title="Deleted Notes"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <List
                dataSource={deletedNotes}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button type="link" onClick={() => onRestore(item.key)}>Restore</Button>,
                            <Button type="link" danger onClick={() => onPermanentDelete(item.key)}>
                                Permanently Delete
                            </Button>,
                        ]}
                    >
                        <Typography.Text>{item.title}</Typography.Text>
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default TrashModal;