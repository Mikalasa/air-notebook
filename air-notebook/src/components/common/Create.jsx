import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addNote, addFolder } from '../../store/slices/notesSlice';

const Create = () => {
    const dispatch = useDispatch();

    return (
        <div
            className={'CUSTOMER_CARD'}
            style={{
            padding: '15px',
            borderBottom: '1px solid #ddd',
            height: '100%',
            }}>
            <Button type="primary" icon={<PlusOutlined />} block onClick={() => dispatch(addNote())}>
                New Note
            </Button>
            <Button type="default" icon={<PlusOutlined />} block style={{ marginTop: '10px' }} onClick={() => dispatch(addFolder())}>
                New Folder
            </Button>
        </div>
    );
};

export default Create;
