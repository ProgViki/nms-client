import React, { useState } from 'react';
import {
  Card, Table, Tag, Space, Button, Badge, Typography,
  Select, DatePicker, Input, Tabs, Timeline, Alert,
  Checkbox, Radio, Switch, Rate, Progress, Statistic,
  Row, Col, Tooltip, Dropdown, Menu, Avatar, List,
  Divider
} from 'antd';
import {
  BellOutlined, CheckCircleOutlined, ExclamationCircleOutlined,
  WarningOutlined, InfoCircleOutlined, FilterOutlined,
  ExportOutlined, DeleteOutlined, SoundOutlined
} from '@ant-design/icons';
import { dummyAlerts } from '../services/dummyData';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const Alerts: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [alertEnabled, setAlertEnabled] = useState(true);

  const columns = [
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => {
        let color = 'blue';
        let icon = <InfoCircleOutlined />;
        if (severity === 'critical') {
          color = 'red';
          icon = <ExclamationCircleOutlined />;
        } else if (severity === 'warning') {
          color = 'orange';
          icon = <WarningOutlined />;
        }
        return (
          <Tag color={color} icon={icon}>
            {severity.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Device',
      dataIndex: 'deviceName',
      key: 'deviceName',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => new Date(timestamp).toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'acknowledged',
      key: 'acknowledged',
      render: (acknowledged: boolean) => (
        <Badge status={acknowledged ? 'default' : 'processing'} text={acknowledged ? 'Acknowledged' : 'New'} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button size="small">Acknowledge</Button>
          <Button size="small" danger>Ignore</Button>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <Title level={2}>Alerts & Notifications</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="Critical"
              value={dummyAlerts.filter(a => a.severity === 'critical').length}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="Warning"
              value={dummyAlerts.filter(a => a.severity === 'warning').length}
              valueStyle={{ color: '#fa8c16' }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="Info"
              value={dummyAlerts.filter(a => a.severity === 'info').length}
              valueStyle={{ color: '#1890ff' }}
              prefix={<InfoCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="Acknowledged"
              value={dummyAlerts.filter(a => a.acknowledged).length}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Space size="middle" wrap>
            <Select defaultValue="all" style={{ width: 120 }}>
              <Option value="all">All Severities</Option>
              <Option value="critical">Critical</Option>
              <Option value="warning">Warning</Option>
              <Option value="info">Info</Option>
            </Select>
            
            <Select defaultValue="all" style={{ width: 120 }}>
              <Option value="all">All Devices</Option>
              <Option value="router">Routers</Option>
              <Option value="switch">Switches</Option>
              <Option value="firewall">Firewalls</Option>
            </Select>

            <RangePicker />

            <Input.Search placeholder="Search alerts" style={{ width: 200 }} />

            <Tooltip title="Alert settings">
              <Switch
                checkedChildren={<SoundOutlined />}
                unCheckedChildren={<BellOutlined />}
                checked={alertEnabled}
                onChange={setAlertEnabled}
              />
            </Tooltip>

            <Radio.Group defaultValue="all">
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="new">New</Radio.Button>
              <Radio.Button value="ack">Acknowledged</Radio.Button>
            </Radio.Group>

            <Rate defaultValue={3} tooltips={['Low', 'Medium', 'High', 'Critical', 'Emergency']} />

            <Dropdown menu={{
              items: [
                { key: '1', label: 'Acknowledge Selected' },
                { key: '2', label: 'Export Selected' },
                { key: '3', label: 'Delete Selected', danger: true },
              ]
            }}>
              <Button>Bulk Actions</Button>
            </Dropdown>
          </Space>
        </div>

        {hasSelected && (
          <div style={{ marginBottom: 16 }}>
            <Badge count={selectedRowKeys.length} style={{ backgroundColor: '#52c41a' }} />
            <span style={{ marginLeft: 8 }}>alerts selected</span>
          </div>
        )}

        <Tabs defaultActiveKey="1">
          <TabPane tab="All Alerts" key="1">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={dummyAlerts}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </TabPane>

          <TabPane tab="Timeline View" key="2">
            <Timeline mode="alternate">
              {dummyAlerts.map(alert => (
                <Timeline.Item
                  key={alert.id}
                  color={alert.severity === 'critical' ? 'red' : alert.severity === 'warning' ? 'orange' : 'blue'}
                >
                  <Space direction="vertical" size="small">
                    <Text strong>{alert.deviceName}</Text>
                    <Text>{alert.message}</Text>
                    <Text type="secondary">{new Date(alert.timestamp).toLocaleString()}</Text>
                    <Tag color={alert.severity === 'critical' ? 'red' : alert.severity === 'warning' ? 'orange' : 'blue'}>
                      {alert.severity}
                    </Tag>
                  </Space>
                </Timeline.Item>
              ))}
            </Timeline>
          </TabPane>

          <TabPane tab="Analytics" key="3">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Alert
                message="Alert Pattern Analysis"
                description="Critical alerts increased by 50% in the last hour"
                type="warning"
                showIcon
              />

              <Title level={5}>Alert Distribution</Title>
              <Progress percent={33} strokeColor="#cf1322" format={() => '33% Critical'} />
              <Progress percent={33} strokeColor="#fa8c16" format={() => '33% Warning'} />
              <Progress percent={34} format={() => '34% Info'} />

              <Divider />

              <Title level={5}>Top Alert Sources</Title>
              <List
                dataSource={[
                  { device: 'Access-Point-Floor1', count: 5 },
                  { device: 'Core-Router-01', count: 3 },
                  { device: 'Edge-Firewall-01', count: 2 },
                ]}
                renderItem={item => (
                  <List.Item>
                    <Text>{item.device}</Text>
                    <Badge count={item.count} showZero />
                  </List.Item>
                )}
              />
            </Space>
          </TabPane>
        </Tabs>

        <Divider />

        <div style={{ textAlign: 'center' }}>
          <Space>
            <Button icon={<CheckCircleOutlined />}>Acknowledge All</Button>
            <Button icon={<ExportOutlined />}>Export Alerts</Button>
            <Button icon={<DeleteOutlined />} danger>Clear All</Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default Alerts;