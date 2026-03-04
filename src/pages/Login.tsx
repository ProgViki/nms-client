import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Flex, Divider, message, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: LoginForm) => {
    setLoading(true);
    // Simulate authentication
    setTimeout(() => {
      if (values.username === 'admin' && values.password === 'password') {
        localStorage.setItem('isAuthenticated', 'true');
        message.success('Login successful!');
        navigate('/dashboard');
      } else {
        message.error('Invalid credentials!');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Flex justify="center" align="center" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Flex vertical align="center" gap="small">
          <LoginOutlined style={{ fontSize: 48, color: '#1890ff' }} />
          <Title level={2}>Network Operations</Title>
          <Text type="secondary">Sign in to manage your network</Text>
        </Flex>

        <Divider />

        <Alert
          message="Demo Credentials"
          description="Username: admin, Password: password"
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Button type="link" style={{ padding: 0 }}>
                Forgot password?
              </Button>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};

export default Login;