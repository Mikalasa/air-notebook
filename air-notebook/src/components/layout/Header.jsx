import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Avatar, Breadcrumb } from 'antd';

const { Header } = Layout;

const CustomHeader = () => {


    return (
        <Header
            className={'CUSTOMER_CARD'}
            style={{
                display: 'flex',
                height: '100%',
                backgroundColor: '#f2f2fd',
            }}
        >
            {/* Left part of the header */}
            <div style={{ display: 'flex', alignItems: 'center', width: '200px', }}>
                <Avatar size="large" icon={<UserOutlined />} />
            </div>

            {/* Right part of the header as an information bar */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>

            </div>
        </Header>
    );
};

export default CustomHeader;
