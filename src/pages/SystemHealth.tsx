import React, { useState } from 'react';
import {
  Card, Progress, Statistic, Timeline, Collapse, Descriptions,
  Row, Col, Typography, Space, Tag, Tooltip, Badge, Alert,
  Breadcrumb, Button, Result
} from 'antd';
import {
  CheckCircleOutlined, CloseCircleOutlined, WarningOutlined,
  ClockCircleOutlined, ArrowUpOutlined, ArrowDownOutlined,
  ReloadOutlined, ExperimentOutlined
} from '@ant-design/icons';
import { dummyDevices, dummyAlerts } from '../services/dummyData';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const SystemHealth: React.FC = () => {
  const [showResult, setShowResult] = useState(false);

  const overallHealth = 98.5;
  const criticalIssues = dummyAlerts.filter(a => a.severity === 'critical').length;
  const warningIssues = dummyAlerts.filter(a => a.severity === 'warning').length;

  const systemMetrics = {
    cpu: 65,
    memory: 72,
    disk: 45,
    network: 88
  };

  const timelineData = [
    {
      color: 'green',
      children: 'System health check passed',
      time: '2 minutes ago'
    },
    {
      color: 'blue',
      children: 'Backup completed successfully',
      time: '15 minutes ago'
    },
    {
      color: 'orange',
      children: 'High CPU usage detected on Core-Router-01',
      time: '1 hour ago'
    },
    {
      color: 'red',
      children: 'Packet loss detected on Access-Point-Floor1',
      time: '2 hours ago'
    }
  ];

  const deviceHealthData = dummyDevices.map(device => ({
    key: device.id,
    name: device.name,
    cpu: Math.floor(Math.random() * 30) + 40,
    memory: Math.floor(Math.random() * 40) + 30,
    connections: Math.floor(Math.random() * 100) + 50,
    status: device.status
  }));

  return (
    <div className="p-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>Monitoring</Breadcrumb.Item>
        <Breadcrumb.Item>System Health</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          System Health Dashboard
        </Title>
        <Space>
          <Button 
            icon={<ExperimentOutlined />}
            onClick={() => setShowResult(!showResult)}
          >
            Test Mode
          </Button>
          <Button type="primary" icon={<ReloadOutlined />}>
            Refresh
          </Button>
        </Space>
      </div>

      {showResult && (
        <Result
          status="success"
          title="System Health Check Passed!"
          subTitle="All systems are operating normally with 99.9% uptime"
          extra={[
            <Button type="primary" key="console" onClick={() => setShowResult(false)}>
              Close
            </Button>
          ]}
          className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg"
        />
      )}

      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <Statistic
              title="Overall Health"
              value={overallHealth}
              precision={1}
              suffix="%"
              prefix={<CheckCircleOutlined className="text-green-500" />}
              valueStyle={{ color: '#3f8600' }}
            />
            <Progress percent={overallHealth} status="active" className="mt-2" />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <Statistic
              title="Critical Issues"
              value={criticalIssues}
              prefix={<CloseCircleOutlined className="text-red-500" />}
              valueStyle={{ color: '#cf1322' }}
            />
            <Tag color="red" className="mt-2">Immediate Attention</Tag>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <Statistic
              title="Warnings"
              value={warningIssues}
              prefix={<WarningOutlined className="text-orange-500" />}
              valueStyle={{ color: '#fa8c16' }}
            />
            <Tag color="orange" className="mt-2">Review Required</Tag>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <Statistic
              title="Uptime"
              value={99.98}
              precision={2}
              suffix="%"
              prefix={<ArrowUpOutlined className="text-green-500" />}
              valueStyle={{ color: '#3f8600' }}
            />
            <Text type="secondary">Last 30 days</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card 
            title="System Metrics" 
            className="shadow-md h-full"
            extra={<Tag color="blue">Real-time</Tag>}
          >
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <div className="flex justify-between mb-1">
                  <Text>CPU Usage</Text>
                  <Tooltip title="Normal range: 0-80%">
                    <Tag color={systemMetrics.cpu > 80 ? 'red' : 'green'}>
                      {systemMetrics.cpu}%
                    </Tag>
                  </Tooltip>
                </div>
                <Progress 
                  percent={systemMetrics.cpu} 
                  status={systemMetrics.cpu > 80 ? 'exception' : 'active'}
                  strokeColor={systemMetrics.cpu > 80 ? '#cf1322' : '#1890ff'}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <Text>Memory Usage</Text>
                  <Tag color={systemMetrics.memory > 85 ? 'red' : 'green'}>
                    {systemMetrics.memory}%
                  </Tag>
                </div>
                <Progress 
                  percent={systemMetrics.memory}
                  status={systemMetrics.memory > 85 ? 'exception' : 'normal'}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <Text>Disk Usage</Text>
                  <Tag color={systemMetrics.disk > 90 ? 'red' : 'green'}>
                    {systemMetrics.disk}%
                  </Tag>
                </div>
                <Progress percent={systemMetrics.disk} />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <Text>Network Utilization</Text>
                  <Tag color={systemMetrics.network > 90 ? 'red' : 'green'}>
                    {systemMetrics.network}%
                  </Tag>
                </div>
                <Progress 
                  percent={systemMetrics.network}
                  status="active"
                  strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                />
              </div>
            </Space>
          </Card>
        </Col>

        <Col span={12}>
          <Card 
            title="Activity Timeline" 
            className="shadow-md h-full"
            extra={<Badge status="processing" text="Live" />}
          >
            <Timeline
              mode="left"
              items={timelineData.map((item, index) => ({
                dot: item.color === 'green' ? <CheckCircleOutlined /> :
                      item.color === 'red' ? <CloseCircleOutlined /> :
                      item.color === 'orange' ? <WarningOutlined /> :
                      <ClockCircleOutlined />,
                color: item.color,
                children: (
                  <Space direction="vertical" size={0}>
                    <Text>{item.children}</Text>
                    <Text type="secondary" className="text-xs">{item.time}</Text>
                  </Space>
                )
              }))}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Device Health Details" className="mt-6 shadow-md">
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Core Devices" key="1">
            <Descriptions bordered column={1}>
              {deviceHealthData.slice(0, 2).map(device => (
                <Descriptions.Item key={device.key} label={device.name}>
                  <Space direction="vertical" className="w-full">
                    <div className="flex justify-between">
                      <span>CPU: {device.cpu}%</span>
                      <Progress percent={device.cpu} size="small" showInfo={false} width={200} />
                    </div>
                    <div className="flex justify-between">
                      <span>Memory: {device.memory}%</span>
                      <Progress percent={device.memory} size="small" showInfo={false} />
                    </div>
                    <div className="flex justify-between">
                      <span>Connections: {device.connections}</span>
                      <Tag color={device.connections > 100 ? 'orange' : 'green'}>
                        {device.connections > 100 ? 'High' : 'Normal'}
                      </Tag>
                    </div>
                  </Space>
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Panel>
          <Panel header="Edge Devices" key="2">
            <Descriptions bordered column={1}>
              {deviceHealthData.slice(2, 4).map(device => (
                <Descriptions.Item key={device.key} label={device.name}>
                  <Space direction="vertical" className="w-full">
                    <div className="flex justify-between">
                      <span>CPU: {device.cpu}%</span>
                      <Progress percent={device.cpu} size="small" showInfo={false} />
                    </div>
                    <div className="flex justify-between">
                      <span>Memory: {device.memory}%</span>
                      <Progress percent={device.memory} size="small" showInfo={false} />
                    </div>
                    <div className="flex justify-between">
                      <span>Status: </span>
                      <Tag color={device.status === 'online' ? 'success' : 'error'}>
                        {device.status}
                      </Tag>
                    </div>
                  </Space>
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
};

export default SystemHealth;