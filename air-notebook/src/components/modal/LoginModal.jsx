import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const LoginModal = ({ visible, onClose, onLogin, onSwitchToRegister }) => {
    return (
        <Modal
            title="登录"
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        登录
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="link" onClick={onSwitchToRegister} block>
                        没有账号？点击注册
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LoginModal;