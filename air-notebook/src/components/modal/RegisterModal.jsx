import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const RegisterModal = ({ visible, onClose, onRegister }) => {
    return (
        <Modal
            title="Register"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Form
                name="register"
                layout="vertical"
                onFinish={onRegister}
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
                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    rules={[{ required: true, message: 'Please confirm your password' }]}
                >
                    <Input.Password placeholder="Please confirm your password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RegisterModal;