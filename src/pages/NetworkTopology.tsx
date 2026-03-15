import React, { useState } from 'react';
import {
  Card, Tree, QRCode, Segmented, Typography, Space, Button,
  Breadcrumb, Tag, Tooltip, Empty, Image, List, Descriptions
} from 'antd';
import {
  CloudServerOutlined, WifiOutlined, SafetyOutlined,
  ApiOutlined, NodeIndexOutlined, QrcodeOutlined
} from '@ant-design/icons';
import { dummyDevices } from '../services/dummyData';
import { NetworkDevice } from '@/types';

const { Title, Text } = Typography;

const NetworkTopology: React.FC = () => {
  const [viewMode, setViewMode] = useState<string>('tree');
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(null);

  const treeData = [
    {
      title: 'Data Center A',
      key: 'dc-a',
      icon: <CloudServerOutlined />,
      children: [
        {
          title: 'Core Layer',
          key: 'dc-a-core',
          icon: <ApiOutlined />,
          children: dummyDevices
            .filter(d => d.location.includes('Data Center A'))
            .map(d => ({
              title: d.name,
              key: d.id,
              icon: d.type === 'router' ? <WifiOutlined /> : 
                    d.type === 'switch' ? <ApiOutlined /> : <SafetyOutlined />,
              status: d.status
            }))
        },
        {
          title: 'Distribution Layer',
          key: 'dc-a-dist',
          icon: <NodeIndexOutlined />,
          children: [
            { title: 'Distribution-Switch-01', key: 'dist-1', icon: <ApiOutlined /> },
            { title: 'Distribution-Switch-02', key: 'dist-2', icon: <ApiOutlined /> }
          ]
        }
      ]
    },
    {
      title: 'Data Center B',
      key: 'dc-b',
      icon: <CloudServerOutlined />,
      children: [
        {
          title: 'Core Layer',
          key: 'dc-b-core',
          icon: <ApiOutlined />,
          children: dummyDevices
            .filter(d => d.location.includes('Data Center B'))
            .map(d => ({
              title: d.name,
              key: d.id,
              icon: d.type === 'router' ? <WifiOutlined /> : 
                    d.type === 'switch' ? <ApiOutlined /> : <SafetyOutlined />
            }))
        }
      ]
    }
  ];

  const deviceImages: Record<string, string> = {
    router: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200',
    switch: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200',
    firewall: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=200',
    'access-point': 'https://images.unsplash.com/photo-1563777097627-8d0be6c606b0?w=200'
  };

  return (
    <div className="p-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>Network</Breadcrumb.Item>
        <Breadcrumb.Item>Topology</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Network Topology
        </Title>
        <Space>
          <Segmented
            options={[
              { label: 'Tree View', value: 'tree', icon: <ApiOutlined /> },
              { label: 'Graph View', value: 'graph', icon: <NodeIndexOutlined /> },
              { label: 'List View', value: 'list', icon: <QrcodeOutlined /> }
            ]}
            value={viewMode}
            onChange={(value) => setViewMode(value as string)}
          />
          <Tooltip title="Export Topology">
            <Button icon={<QrcodeOutlined />}>Generate QR</Button>
          </Tooltip>
        </Space>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="shadow-md">
            {viewMode === 'tree' && (
              <Tree
                showIcon
                defaultExpandAll
                treeData={treeData}
                onSelect={(selectedKeys, info) => {
                  const device = dummyDevices.find(d => d.id === selectedKeys[0]);
                  setSelectedDevice(device || null);
                }}
                className="bg-gray-50 p-4 rounded-lg"
              />
            )}

            {viewMode === 'list' && (
              <List
                dataSource={dummyDevices}
                renderItem={device => (
                  <List.Item 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedDevice(device)}
                  >
                    <List.Item.Meta
                      avatar={
                        <Image
                          width={40}
                          src={deviceImages[device.type]}
                          fallback="https://via.placeholder.com/40"
                          className="rounded-full"
                        />
                      }
                      title={device.name}
                      description={`${device.type} - ${device.location}`}
                    />
                    <Tag color={device.status === 'online' ? 'success' : 'error'}>
                      {device.status}
                    </Tag>
                  </List.Item>
                )}
              />
            )}

            {viewMode === 'graph' && (
              <div className="h-96 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center rounded-lg border-2 border-dashed">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Graph view coming soon with D3.js integration"
                />
              </div>
            )}
          </Card>
        </div>

        <div className="col-span-1">
          <Card title="Device Details" className="shadow-md">
            {selectedDevice ? (
              <Space direction="vertical" className="w-full" size="large">
                <Image
                  src={deviceImages[selectedDevice.type]}
                  fallback="https://via.placeholder.com/200"
                  className="rounded-lg"
                />
                
                <Descriptions bordered column={1} size="small">
                  <Descriptions.Item label="Name">
                    <Text strong>{selectedDevice.name}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Type">
                    <Tag color="blue">{selectedDevice.type}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={selectedDevice.status === 'online' ? 'success' : 'error'}>
                      {selectedDevice.status}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="IP Address">
                    {selectedDevice.ipAddress}
                  </Descriptions.Item>
                  <Descriptions.Item label="Location">
                    {selectedDevice.location}
                  </Descriptions.Item>
                  <Descriptions.Item label="Manufacturer">
                    {selectedDevice.manufacturer}
                  </Descriptions.Item>
                  <Descriptions.Item label="Model">
                    {selectedDevice.model}
                  </Descriptions.Item>
                </Descriptions>

                <div className="text-center">
                  <QRCode 
                    value={JSON.stringify(selectedDevice)} 
                    size={120}
                    icon="https://ant.design/favicon-32x32.png"
                  />
                  <Text type="secondary" className="block mt-2">Device QR Code</Text>
                </div>
              </Space>
            ) : (
              <Empty 
                description="Select a device to view details"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NetworkTopology;