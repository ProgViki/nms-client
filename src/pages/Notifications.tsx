import React, { useState } from 'react';
import {
  Card, Button, Space, Typography, Alert, Drawer, Modal,
  notification, Popconfirm, message, List, Tag, Badge,
  Breadcrumb, Switch, Radio, Timeline, Result,
  Row,
  Col,
  Divider,
  Input
} from 'antd';
import {
  BellOutlined, CheckCircleOutlined, InfoCircleOutlined,
  WarningOutlined, ExclamationCircleOutlined, MailOutlined,
  SoundOutlined, DeleteOutlined, SettingOutlined
} from '@ant-design/icons';
import { dummyAlerts } from '../services/dummyData';

const { Title, Text } = Typography;

const Notifications: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationType, setNotificationType] = useState('info');
  const [api, contextHolder] = notification.useNotification();

  const showNotification = (type: string) => {
    switch(type) {
      case 'success':
        api.success({
          message: 'Operation Successful',
          description: 'The configuration has been applied successfully.',
          placement: 'topRight',
          duration: 3,
        });
        break;
      case 'error':
        api.error({
          message: 'Operation Failed',
          description: 'Failed to apply configuration. Please try again.',
          placement: 'topRight',
          duration: 5,
        });
        break;
      case 'warning':
        api.warning({
          message: 'Warning',
          description: 'High CPU usage detected on Core Router.',
          placement: 'topRight',
          duration: 4,
        });
        break;
      default:
        api.info({
          message: 'Information',
          description: 'New firmware update available for download.',
          placement: 'topRight',
        });
    }
  };

  const showMessage = (type: string) => {
    switch(type) {
      case 'success':
        message.success('Device configuration saved successfully!');
        break;
      case 'error':
        message.error('Failed to connect to device.');
        break;
      case 'warning':
        message.warning('Device requires attention.');
        break;
      default:
        message.info('Operation in progress...');
    }
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: 'Delete All Alerts',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete all alerts? This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Cancel',
      onOk() {
        message.success('All alerts deleted successfully');
      },
    });
  };

  return (
    <div className="p-6">
      {contextHolder}
      
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>System</Breadcrumb.Item>
        <Breadcrumb.Item>Notifications</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Notifications Center
        </Title>
        <Space>
          <Badge count={dummyAlerts.length} offset={[-5, 5]}>
            <Button 
              icon={<BellOutlined />} 
              onClick={() => setDrawerVisible(true)}
            >
              View All
            </Button>
          </Badge>
          <Button icon={<SettingOutlined />}>Settings</Button>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="Recent Alerts" className="shadow-md">
            {dummyAlerts.map(alert => (
              <Alert
                key={alert.id}
                message={alert.deviceName}
                description={alert.message}
                type={alert.severity === 'critical' ? 'error' : 
                      alert.severity === 'warning' ? 'warning' : 'info'}
                showIcon
                closable
                className="mb-3"
                action={
                  <Space>
                    <Button size="small" type="text">Acknowledge</Button>
                    <Button size="small" type="text" danger>Ignore</Button>
                  </Space>
                }
              />
            ))}
          </Card>

          <Card title="Notification Timeline" className="mt-6 shadow-md">
            <Timeline
              items={[
                {
                  color: 'green',
                  children: (
                    <Space direction="vertical" size={0}>
                      <Text strong>Configuration Applied</Text>
                      <Text type="secondary">Core-Router-01 configuration updated successfully</Text>
                      <Text type="secondary" className="text-xs">2 minutes ago</Text>
                    </Space>
                  )
                },
                {
                  color: 'blue',
                  children: (
                    <Space direction="vertical" size={0}>
                      <Text strong>Backup Completed</Text>
                      <Text type="secondary">System backup completed successfully</Text>
                      <Text type="secondary" className="text-xs">15 minutes ago</Text>
                    </Space>
                  )
                },
                {
                  color: 'orange',
                  children: (
                    <Space direction="vertical" size={0}>
                      <Text strong>High CPU Usage</Text>
                      <Text type="secondary">CPU usage exceeded 80% on Core-Router-01</Text>
                      <Text type="secondary" className="text-xs">1 hour ago</Text>
                    </Space>
                  )
                },
                {
                  color: 'red',
                  children: (
                    <Space direction="vertical" size={0}>
                      <Text strong>Critical Alert</Text>
                      <Text type="secondary">Packet loss detected on Access-Point-Floor1</Text>
                      <Text type="secondary" className="text-xs">2 hours ago</Text>
                    </Space>
                  )
                }
              ]}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Notification Controls" className="shadow-md">
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <Text className="block mb-2">Notification Type</Text>
                <Radio.Group 
                  value={notificationType} 
                  onChange={(e) => setNotificationType(e.target.value)}
                  className="w-full"
                >
                  <Space direction="vertical">
                    <Radio value="success">Success</Radio>
                    <Radio value="error">Error</Radio>
                    <Radio value="warning">Warning</Radio>
                    <Radio value="info">Info</Radio>
                  </Space>
                </Radio.Group>
              </div>

              <div>
                <Text className="block mb-2">Test Notifications</Text>
                <Space direction="vertical" className="w-full">
                  <Button 
                    type="primary" 
                    onClick={() => showNotification(notificationType)}
                    block
                  >
                    Show Notification
                  </Button>
                  <Button 
                    onClick={() => showMessage(notificationType)}
                    block
                  >
                    Show Message
                  </Button>
                </Space>
              </div>

              <div>
                <Text className="block mb-2">Notification Settings</Text>
                <div className="flex justify-between items-center mb-2">
                  <Text>Email Alerts</Text>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <Text>Sound Alerts</Text>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <Text>Desktop Notifications</Text>
                  <Switch />
                </div>
              </div>

              <Divider />

              <Space direction="vertical" className="w-full">
                <Popconfirm
                  title="Clear all notifications"
                  description="Are you sure you want to clear all notifications?"
                  onConfirm={() => message.success('All notifications cleared')}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger block icon={<DeleteOutlined />}>
                    Clear All
                  </Button>
                </Popconfirm>

                <Button 
                  type="dashed" 
                  icon={<MailOutlined />} 
                  onClick={() => setModalVisible(true)}
                  block
                >
                  Configure Email
                </Button>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>

      <Drawer
        title="All Notifications"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={400}
      >
        <List
          dataSource={dummyAlerts}
          renderItem={item => (
            <List.Item className="border-b last:border-b-0">
              <List.Item.Meta
                avatar={
                  <Badge status={
                    item.severity === 'critical' ? 'error' :
                    item.severity === 'warning' ? 'warning' : 'processing'
                  } />
                }
                title={item.deviceName}
                description={item.message}
              />
              <Tag color={
                item.severity === 'critical' ? 'red' :
                item.severity === 'warning' ? 'orange' : 'blue'
              }>
                {item.severity}
              </Tag>
            </List.Item>
          )}
        />
      </Drawer>

      <Modal
        title="Email Configuration"
        open={modalVisible}
        onOk={() => {
          message.success('Email settings saved');
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      >
        <Space direction="vertical" className="w-full">
          <Alert
            message="Email notifications will be sent to configured addresses"
            type="info"
            showIcon
          />
          <div className="mt-4">
            <Text strong>Recipients</Text>
            <Input.TextArea 
              placeholder="Enter email addresses (one per line)" 
              rows={3}
              className="mt-2"
            />
          </div>
          <div className="mt-4">
            <Text strong>Notification Level</Text>
            <Radio.Group className="mt-2 block">
              <Radio value="all">All Alerts</Radio>
              <Radio value="critical">Critical Only</Radio>
              <Radio value="warning">Warning & Critical</Radio>
            </Radio.Group>
          </div>
        </Space>
      </Modal>
    </div>
  );
};

export default Notifications;