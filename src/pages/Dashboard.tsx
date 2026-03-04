import React, { useState } from 'react';
import {
  Row, Col, Card, Statistic, Typography, Space, Button, Badge,
  Table, Tag, Progress, Calendar, Carousel, Avatar, List,
  Rate, Timeline, FloatButton, Breadcrumb, Tabs, Flex, Grid,
  Splitter, Anchor, Dropdown, Steps
} from 'antd';
import {
  ArrowUpOutlined, ArrowDownOutlined, WarningOutlined,
  CloudServerOutlined, RocketOutlined, WifiOutlined,
  SafetyOutlined, PlusOutlined, QuestionOutlined,
  BellOutlined, CheckCircleOutlined, SyncOutlined,
  BarChartOutlined, DesktopOutlined
} from '@ant-design/icons';
import { dummyDevices, dummyAlerts } from '../services/dummyData';

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;
const { TabPane } = Tabs;

const Dashboard: React.FC = () => {
  const screens = useBreakpoint();
  const [activeTab, setActiveTab] = useState('1');

  const onlineDevices = dummyDevices.filter(d => d.status === 'online').length;
  const criticalAlerts = dummyAlerts.filter(a => a.severity === 'critical').length;

  const recentAlertsColumns = [
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => {
        const color = severity === 'critical' ? 'red' : severity === 'warning' ? 'orange' : 'blue';
        return <Tag color={color}>{severity.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Device',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => new Date(timestamp).toLocaleTimeString(),
    },
  ];

  const steps = [
    { title: 'Login', description: 'Authenticated' },
    { title: 'Verify', description: '2FA verified' },
    { title: 'Access', description: 'Dashboard loaded' },
  ];

  const anchorItems = [
    { key: 'stats', href: '#stats', title: 'Statistics' },
    { key: 'devices', href: '#devices', title: 'Device Status' },
    { key: 'alerts', href: '#alerts', title: 'Recent Alerts' },
  ];

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>

      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <Title level={2}>Network Operations Dashboard</Title>
        <Space>
          <Dropdown menu={{
            items: [
              { key: '1', label: 'Export PDF' },
              { key: '2', label: 'Export Excel' },
              { key: '3', label: 'Schedule Report' },
            ]
          }}>
            <Button icon={<BarChartOutlined />}>Export</Button>
          </Dropdown>
          <Button type="primary" icon={<SyncOutlined />}>Refresh</Button>
        </Space>
      </Flex>

      <Anchor
        items={anchorItems}
        onClick={(e) => e.preventDefault()}
        style={{ marginBottom: 24 }}
      />

      <div id="stats">
        <Title level={4}>System Statistics</Title>
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable className="dashboard-card">
              <Statistic
                title="Total Devices"
                value={dummyDevices.length}
                prefix={<CloudServerOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
              <Text type="secondary">Active: {onlineDevices}</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable className="dashboard-card">
              <Statistic
                title="Network Health"
                value={98.5}
                precision={1}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
              <Progress percent={98.5} size="small" showInfo={false} />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable className="dashboard-card">
              <Statistic
                title="Critical Alerts"
                value={criticalAlerts}
                valueStyle={{ color: '#cf1322' }}
                prefix={<WarningOutlined />}
              />
              <Tag color="red">Immediate attention required</Tag>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable className="dashboard-card">
              <Statistic
                title="Bandwidth Usage"
                value={78.3}
                precision={1}
                valueStyle={{ color: '#1890ff' }}
                prefix={<ArrowDownOutlined />}
                suffix="Gbps"
              />
              <Space>
                <Badge status="processing" text="Peak hour" />
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      <Splitter style={{ marginBottom: 24 }}>
        <Splitter.Panel defaultSize="60%" min="30%" max="70%">
          <div id="devices" style={{ padding: 16 }}>
            <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
              <Title level={4}>Device Status</Title>
              <Rate allowHalf defaultValue={4.5} />
            </Flex>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="All Devices" key="1">
                <List
                  dataSource={dummyDevices}
                  renderItem={device => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<DesktopOutlined />} />}
                        title={device.name}
                        description={device.type}
                      />
                      <Tag color={device.status === 'online' ? 'success' : 'error'}>
                        {device.status}
                      </Tag>
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="By Location" key="2">
                <Paragraph>Location-based view coming soon...</Paragraph>
              </TabPane>
            </Tabs>
          </div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div style={{ padding: 16 }}>
            <Title level={4}>Quick Actions</Title>
            <Steps direction="vertical" current={2} items={steps} />
          </div>
        </Splitter.Panel>
      </Splitter>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <div id="alerts">
            <Card title="Recent Alerts" extra={<BellOutlined />}>
              <Table
                dataSource={dummyAlerts}
                columns={recentAlertsColumns}
                pagination={false}
                size="small"
              />
            </Card>
          </div>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Maintenance Schedule">
            <Calendar fullscreen={false} style={{ padding: 8 }} />
          </Card>
        </Col>
      </Row>

      <Carousel autoplay style={{ marginTop: 24, background: '#f5f5f5', padding: 24 }}>
        <div>
          <Flex justify="center" align="center" gap="large">
            <Statistic title="Uptime" value="99.9%" prefix={<CheckCircleOutlined />} />
            <Statistic title="Response Time" value="45ms" prefix={<RocketOutlined />} />
            <Statistic title="Connected Users" value="1,245" prefix={<WifiOutlined />} />
          </Flex>
        </div>
        <div>
          <Flex justify="center" align="center" gap="large">
            <Statistic title="Firewall Status" value="Active" prefix={<SafetyOutlined />} />
            <Statistic title="VPN Connections" value="89" />
            <Statistic title="Threats Blocked" value="1.2K" />
          </Flex>
        </div>
      </Carousel>

      <FloatButton
        icon={<QuestionOutlined />}
        type="primary"
        style={{ right: 24, bottom: 24 }}
        tooltip={<div>Need help?</div>}
      />
      <FloatButton
        icon={<PlusOutlined />}
        type="default"
        style={{ right: 24, bottom: 94 }}
      />
    </div>
  );
};

export default Dashboard;