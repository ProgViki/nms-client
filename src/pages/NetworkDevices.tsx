import React, { useState } from 'react';
import {
  Table, Card, Tag, Space, Button, Input, Select, Badge,
  Typography, Row, Col, Statistic, Tooltip, Avatar, List,
  Transfer, TreeSelect, Mentions, Rate, Slider, Switch,
  Modal, Form, Breadcrumb, Dropdown, Menu, Pagination
} from 'antd';
import {
  SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  PoweroffOutlined, ReloadOutlined, EyeOutlined, WifiOutlined,
  CloudServerOutlined, SafetyOutlined, RocketOutlined
} from '@ant-design/icons';
import { dummyDevices } from '../services/dummyData';

const { Title, Text } = Typography;
const { Option } = Select;
const { TreeNode } = TreeSelect;

const NetworkDevices: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [transferTargetKeys, setTransferTargetKeys] = useState<string[]>([]);
  const [mentionsText, setMentionsText] = useState('');

  const filteredDevices = dummyDevices.filter(device =>
    device.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (filterType ? device.type === filterType : true)
  );

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={status === 'online' ? 'success' : status === 'degraded' ? 'warning' : 'error'} />
      ),
    },
    {
      title: 'Device Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <Avatar icon={record.type === 'router' ? <WifiOutlined /> : <CloudServerOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Manufacturer',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="View">
            <Button icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Restart">
            <Button icon={<ReloadOutlined />} size="small" danger />
          </Tooltip>
          <Dropdown menu={{
            items: [
              { key: '1', label: 'Configure' },
              { key: '2', label: 'Monitor' },
              { key: '3', label: 'Delete', danger: true },
            ]
          }}>
            <Button size="small">More</Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const treeSelectData = [
    {
      title: 'Network Devices',
      value: 'network',
      children: [
        { title: 'Routers', value: 'routers' },
        { title: 'Switches', value: 'switches' },
        { title: 'Firewalls', value: 'firewalls' },
      ],
    },
  ];

  const mentionsOptions = [
    { value: 'admin', label: 'Admin Team' },
    { value: 'network', label: 'Network Team' },
    { value: 'security', label: 'Security Team' },
  ];

  const transferData = dummyDevices.map(device => ({
    key: device.id,
    title: device.name,
    description: `${device.type} - ${device.location}`,
  }));

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>Network</Breadcrumb.Item>
        <Breadcrumb.Item>Devices</Breadcrumb.Item>
      </Breadcrumb>

      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
        <Title level={2}>Network Devices</Title>
        <Space>
          <Input
            placeholder="Search devices..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          <Select
            placeholder="Filter by type"
            style={{ width: 150 }}
            allowClear
            onChange={value => setFilterType(value)}
          >
            <Option value="router">Router</Option>
            <Option value="switch">Switch</Option>
            <Option value="firewall">Firewall</Option>
            <Option value="access-point">Access Point</Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            Add Device
          </Button>
        </Space>
      </Flex>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card size="small">
            <Statistic title="Total Devices" value={dummyDevices.length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="Online" value={dummyDevices.filter(d => d.status === 'online').length} suffix={`/ ${dummyDevices.length}`} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="Issues" value={dummyDevices.filter(d => d.status !== 'online').length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="Avg Uptime" value="99.8%" />
          </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Text>Device Priority:</Text>
            <Rate defaultValue={3} />
          </Space>
        </div>
        
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Text>Auto Refresh:</Text>
            <Switch defaultChecked />
            <Text>Monitoring Level:</Text>
            <Slider defaultValue={70} style={{ width: 200 }} />
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredDevices}
          rowKey="id"
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} devices`,
          }}
        />

        <div style={{ marginTop: 24 }}>
          <Title level={4}>Additional Configuration</Title>
          
          <div style={{ marginBottom: 16 }}>
            <Text>Device Assignment:</Text>
            <Transfer
              dataSource={transferData}
              targetKeys={transferTargetKeys}
              onChange={setTransferTargetKeys}
              render={item => item.title}
              listStyle={{ width: 250, height: 300 }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <Text>Device Category:</Text>
            <TreeSelect
              style={{ width: '100%', marginTop: 8 }}
              dropdownStyle={{ maxHeight: 400 }}
              treeData={treeSelectData}
              placeholder="Select category"
              allowClear
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <Text>Mention team:</Text>
            <Mentions
              style={{ width: '100%', marginTop: 8 }}
              options={mentionsOptions}
              value={mentionsText}
              onChange={setMentionsText}
              placeholder="Use @ to mention team"
            />
          </div>
        </div>
      </Card>

      <Modal
        title="Add New Device"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Device Name" required>
            <Input placeholder="Enter device name" />
          </Form.Item>
          <Form.Item label="Device Type" required>
            <Select placeholder="Select device type">
              <Option value="router">Router</Option>
              <Option value="switch">Switch</Option>
              <Option value="firewall">Firewall</Option>
            </Select>
          </Form.Item>
          <Form.Item label="IP Address" required>
            <Input placeholder="192.168.1.1" />
          </Form.Item>
          <Form.Item label="Location">
            <Input placeholder="Enter location" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary">Add Device</Button>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NetworkDevices;