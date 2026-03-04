import React, { useState } from 'react';
import { Layout, Menu, theme, Avatar, Dropdown, Space, Typography, Button } from 'antd';
import {
  DashboardOutlined,
  DesktopOutlined,
  AlertOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileTextOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/devices',
      icon: <DesktopOutlined />,
      label: 'Network Devices',
    },
    {
      key: '/performance',
      icon: <BarChartOutlined />,
      label: 'Performance',
    },
    {
      key: '/alerts',
      icon: <AlertOutlined />,
      label: 'Alerts',
    },
    {
      key: '/configuration',
      icon: <SettingOutlined />,
      label: 'Configuration',
    },
    {
      key: '/reports',
      icon: <FileTextOutlined />,
      label: 'Reports',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
          {!collapsed && <Text strong style={{ fontSize: 18 }}>NetOps</Text>}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['/dashboard']}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ marginRight: 24 }}>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <Text>Admin User</Text>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;