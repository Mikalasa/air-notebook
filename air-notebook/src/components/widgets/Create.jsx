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
                padding: '0 10px 0 10px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#f2f2fd',
            }}>
            <Button type="primary" icon={<PlusOutlined />} block onClick={() => dispatch(addNote())}>
                Note
            </Button>
            <Button type="default" icon={<PlusOutlined />} block style={{ marginTop: '10px' }} onClick={() => dispatch(addFolder())}>
                Folder
            </Button>
        </div>
    );
};

export default Create;