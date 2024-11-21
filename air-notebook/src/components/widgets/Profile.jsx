import React, { useState, useEffect } from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Avatar, Dropdown, Menu, message } from 'antd';
import LoginModal from '../modal/LoginModal';
import RegisterModal from '../modal/RegisterModal';

const { Header: Profile } = Layout;

const CustomHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 用户登录状态
    const [showLoginModal, setShowLoginModal] = useState(false); // 登录窗口
    const [showRegisterModal, setShowRegisterModal] = useState(false); // 注册窗口
    const [userData, setUserData] = useState({ username: '', avatar: '' }); // 用户数据

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setIsLoggedIn(true);
            setUserData(parsedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserData({ username: '', avatar: '' });
        message.success('已退出登录');
    };

    const handleLogin = (values) => {
        const { username, password } = values;
        if (username && password) {
            const demoAvatar = 'https://joeschmoe.io/api/v1/random';
            const user = { username, avatar: demoAvatar };
            localStorage.setItem('user', JSON.stringify(user));
            setIsLoggedIn(true);
            setUserData(user);
            setShowLoginModal(false);
            message.success(`欢迎回来，${username}`);
        } else {
            message.error('用户名或密码错误');
        }
    };

    const handleRegister = (values) => {
        const { username, password, confirmPassword } = values;
        if (password !== confirmPassword) {
            message.error('两次输入的密码不一致');
            return;
        }
        const demoAvatar = 'https://joeschmoe.io/api/v1/random';
        const user = { username, avatar: demoAvatar };
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        setUserData(user);
        setShowRegisterModal(false);
        message.success(`注册成功并已登录，欢迎 ${username}`);
    };

    const menu = (
        <Menu>
            <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                danger
            >
                退出登录
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Profile
                className={'CUSTOMER_CARD PROFILE'}
                style={{
                    display: 'flex',
                    height: '100%',
                    backgroundColor: '#f2f2fd',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '200px',
                    }}
                >
                    {isLoggedIn ? (
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Avatar
                                size="large"
                                className="avatar-hover-effect"
                                src={userData.avatar}
                            />
                        </Dropdown>
                    ) : (
                        <Avatar
                            size="large"
                            className="avatar-hover-effect"
                            icon={<UserOutlined />}
                            onClick={() => setShowLoginModal(true)}
                        />
                    )}
                    <span
                        className="avatar-username"
                        title={userData.username || '未登录'}
                        style={{ marginLeft: 10 }}
                    >
                        {userData.username || '未登录'}
                    </span>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}></div>
            </Profile>

            {/* 登录窗口 */}
            <LoginModal
                visible={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
                onSwitchToRegister={() => {
                    setShowLoginModal(false);
                    setShowRegisterModal(true);
                }}
            />

            {/* 注册窗口 */}
            <RegisterModal
                visible={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onRegister={handleRegister}
            />
        </>
    );
};

export default CustomHeader;