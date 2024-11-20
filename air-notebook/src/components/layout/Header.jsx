import React from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Avatar, Dropdown, Menu } from 'antd';

const { Header } = Layout;

const CustomHeader = () => {
    const handleLogout = () => {
        // 处理退出登录的逻辑
        console.log('Logged out');
    };

    const menu = (
        <Menu>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout} danger
            >
                退出登录
            </Menu.Item>
        </Menu>
    );

    return (
        <Header
            className={'CUSTOMER_CARD PROFILE'}
            style={{
                display: 'flex',
                height: '100%',
                backgroundColor: '#f2f2fd',
            }}
        >
            {/* Left part of the header */}
            <div style={{display: 'flex', alignItems: 'center', width: '200px',}}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <Avatar size="large" className="avatar-hover-effect" />
                </Dropdown>
                <span className="avatar-username" title="username12345678910111213141516">username12345678910111213141516</span>
            </div>

            {/* Right part of the header as an information bar */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>

            </div>
        </Header>
    );
};

export default CustomHeader;