import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const RegisterModal = ({ visible, onClose, onRegister }) => {
    return (
        <Modal
            title="注册"
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
                    label="用户名"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password placeholder="请输入密码" />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="确认密码"
                    rules={[{ required: true, message: '请再次输入密码' }]}
                >
                    <Input.Password placeholder="请再次输入密码" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RegisterModal;