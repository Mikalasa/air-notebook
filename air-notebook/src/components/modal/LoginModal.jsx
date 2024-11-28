import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const LoginModal = ({ visible, onClose, onLogin, onSwitchToRegister }) => {
    return (
        <Modal
            title="Login"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Form
                name="login"
                layout="vertical"
                onFinish={onLogin}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please enter your username' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Please enter your username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password placeholder="Please enter your password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="link" onClick={onSwitchToRegister} block>
                        Don't have an account? Register here
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LoginModal;