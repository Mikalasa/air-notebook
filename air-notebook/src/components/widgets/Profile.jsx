import React, { useState, useEffect } from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Avatar, Dropdown, Menu, message } from 'antd';
import LoginModal from '../modal/LoginModal';
import RegisterModal from '../modal/RegisterModal';

const { Header: Profile } = Layout;

const CustomHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // User login status
    const [showLoginModal, setShowLoginModal] = useState(false); // Login modal
    const [showRegisterModal, setShowRegisterModal] = useState(false); // Register modal
    const [userData, setUserData] = useState({ username: '', avatar: '' }); // User data

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
        message.success('Logged out successfully');
    };

    const handleLogin = async (values) => {
        const { username, password } = values;

        try {
            const response = await fetch('http://localhost:5001/api/Users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const user = { username: data.username, avatar: data.avatar || 'https://joeschmoe.io/api/v1/random' };
                localStorage.setItem('user', JSON.stringify(user));
                setIsLoggedIn(true);
                setUserData(user);
                setShowLoginModal(false);
                message.success(`Welcome back, ${username}`);
            } else {
                const error = await response.text();
                message.error(error || 'Failed to login');
            }
        } catch (error) {
            message.error('Failed to connect to the server');
        }
    };

    const handleRegister = async (values) => {
        const { username, password, confirmPassword } = values;

        if (password !== confirmPassword) {
            message.error('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/Users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email: `${username}@example.com` }), // Replace with real email
            });

            if (response.ok) {
                const data = await response.json();
                const user = { username: data.username, avatar: 'https://joeschmoe.io/api/v1/random' };
                localStorage.setItem('user', JSON.stringify(user));
                setIsLoggedIn(true);
                setUserData(user);
                setShowRegisterModal(false);
                message.success(`Registration successful, welcome ${username}`);
            } else {
                const error = await response.text();
                message.error(error || 'Failed to register');
            }
        } catch (error) {
            message.error('Failed to connect to the server');
        }
    };

    const menu = (
        <Menu>
            <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                danger
            >
                Logout
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
                        title={userData.username || 'Not logged in'}
                        style={{ marginLeft: 10 }}
                    >
                        {userData.username || 'Not logged in'}
                    </span>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}></div>
            </Profile>

            {/* Login modal */}
            <LoginModal
                visible={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
                onSwitchToRegister={() => {
                    setShowLoginModal(false);
                    setShowRegisterModal(true);
                }}
            />

            {/* Register modal */}
            <RegisterModal
                visible={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onRegister={handleRegister}
            />
        </>
    );
};

export default CustomHeader;