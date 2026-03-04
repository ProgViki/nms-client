import React from 'react';
import {
  Card, Row, Col, Typography, Statistic, Progress, Table,
  Tag, Space, Tabs, Timeline, Badge, Tooltip, Divider,
  Select, DatePicker, Radio
} from 'antd';
import {
  ArrowUpOutlined, ArrowDownOutlined, LineChartOutlined,
  AreaChartOutlined, BarChartOutlined, DotChartOutlined,
  WarningOutlined, CheckCircleOutlined
} from '@ant-design/icons';
import { dummyPerformanceMetrics } from '../services/dummyData';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Performance: React.FC = () => {
  const metrics = dummyPerformanceMetrics[0];

  const columns = [
    {
      title: 'Metric',
      dataIndex: 'metric',
      key: 'metric',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value: number, record: any) => (
        <Space>
          {value}
          {record.unit}
          {record.trend === 'up' ? 
            <ArrowUpOutlined style={{ color: '#cf1322' }} /> : 
            <ArrowDownOutlined style={{ color: '#3f8600' }} />
          }
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'normal' ? 'green' : status === 'warning' ? 'orange' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Threshold',
      dataIndex: 'threshold',
      key: 'threshold',
    },
  ];

  const data = [
    {
      key: '1',
      metric: 'CPU Usage',
      value: metrics.cpuUsage,
      unit: '%',
      trend: 'up',
      status: metrics.cpuUsage > 70 ? 'warning' : 'normal',
      threshold: '80%',
    },
    {
      key: '2',
      metric: 'Memory Usage',
      value: metrics.memoryUsage,
      unit: '%',
      trend: 'down',
      status: metrics.memoryUsage > 80 ? 'warning' : 'normal',
      threshold: '85%',
    },
    {
      key: '3',
      metric: 'Bandwidth In',
      value: metrics.bandwidthIn,
      unit: 'Mbps',
      trend: 'up',
      status: metrics.bandwidthIn > 700 ? 'warning' : 'normal',
      threshold: '1 Gbps',
    },
    {
      key: '4',
      metric: 'Bandwidth Out',
      value: metrics.bandwidthOut,
      unit: 'Mbps',
      trend: 'down',
      status: metrics.bandwidthOut > 700 ? 'warning' : 'normal',
      threshold: '1 Gbps',
    },
    {
      key: '5',
      metric: 'Packet Loss',
      value: metrics.packetLoss,
      unit: '%',
      trend: 'down',
      status: metrics.packetLoss > 0.1 ? 'critical' : 'normal',
      threshold: '0.1%',
    },
  ];

  return (
    <div>
      <Title level={2}>Performance Monitoring</Title>

      <Space style={{ marginBottom: 16 }} size="large">
        <Select defaultValue="1h" style={{ width: 120 }}>
          <Option value="1h">Last Hour</Option>
          <Option value="6h">Last 6 Hours</Option>
          <Option value="24h">Last 24 Hours</Option>
          <Option value="7d">Last 7 Days</Option>
        </Select>
        <RangePicker />
        <Radio.Group defaultValue="realtime">
          <Radio.Button value="realtime">Real-time</Radio.Button>
          <Radio.Button value="hourly">Hourly</Radio.Button>
          <Radio.Button value="daily">Daily</Radio.Button>
        </Radio.Group>
      </Space>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Overall Health"
              value={98.5}
              precision={1}
              suffix="%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
            <Progress percent={98.5} status="active" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Average Latency"
              value={45}
              suffix="ms"
              prefix={<LineChartOutlined />}
            />
            <Text type="secondary">Peak: 78ms</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Alerts"
              value={3}
              valueStyle={{ color: '#cf1322' }}
              prefix={<WarningOutlined />}
            />
            <Badge status="processing" text="2 unacknowledged" />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" style={{ marginTop: 24 }}>
        <Tabs.TabPane tab="Metrics Overview" key="1">
          <Card>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
            />

            <Divider />

            <Title level={5}>Performance Timeline</Title>
            <Timeline mode="alternate">
              <Timeline.Item color="green">
                <Text strong>CPU Normalized</Text>
                <p>CPU usage returned to normal levels - 10:30 AM</p>
              </Timeline.Item>
              <Timeline.Item color="red">
                <Text strong>High Packet Loss Detected</Text>
                <p>Packet loss spike on Access-Point-Floor1 - 09:45 AM</p>
              </Timeline.Item>
              <Timeline.Item>
                <Text strong>Bandwidth Peak</Text>
                <p>Peak bandwidth usage of 950 Mbps - 08:00 AM</p>
              </Timeline.Item>
              <Timeline.Item color="gray">
                <Text strong>Maintenance Window</Text>
                <p>Scheduled maintenance completed - 02:00 AM</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Device Performance" key="2">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Core Router Performance">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text>CPU Usage</Text>
                    <Progress percent={metrics.cpuUsage} size="small" status="active" />
                  </div>
                  <div>
                    <Text>Memory Usage</Text>
                    <Progress percent={metrics.memoryUsage} size="small" />
                  </div>
                  <div>
                    <Text>Bandwidth Utilization</Text>
                    <Progress percent={65} size="small" />
                  </div>
                </Space>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Core Switch Performance">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text>CPU Usage</Text>
                    <Progress percent={45} size="small" />
                  </div>
                  <div>
                    <Text>Memory Usage</Text>
                    <Progress percent={52} size="small" status="active" />
                  </div>
                  <div>
                    <Text>Bandwidth Utilization</Text>
                    <Progress percent={78} size="small" status="exception" />
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Historical Data" key="3">
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Title level={5}>Performance Trends</Title>
              <div style={{ height: 300, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text type="secondary">Performance charts would be displayed here</Text>
              </div>

              <Divider />

              <Title level={5}>Key Metrics (Last 24h)</Title>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Statistic title="Max CPU" value="87%" />
                </Col>
                <Col span={8}>
                  <Statistic title="Avg CPU" value="52%" />
                </Col>
                <Col span={8}>
                  <Statistic title="Min CPU" value="23%" />
                </Col>
                <Col span={8}>
                  <Statistic title="Max Bandwidth" value="980 Mbps" />
                </Col>
                <Col span={8}>
                  <Statistic title="Total Traffic" value="2.4 TB" />
                </Col>
                <Col span={8}>
                  <Statistic title="Peak Time" value="14:00" />
                </Col>
              </Row>
            </Space>
          </Card>
        </Tabs.TabPane>
      </Tabs>

      <Divider />

      <Card title="Performance Insights" style={{ marginTop: 16 }}>
        <Space direction="vertical">
          <Text>
            <Tooltip title="Based on last 24 hours">
              <Badge status="success" /> System performance is optimal with 99.9% uptime
            </Tooltip>
          </Text>
          <Text>
            <Tooltip title="Recommend scaling resources">
              <Badge status="warning" /> High bandwidth usage detected during business hours
            </Tooltip>
          </Text>
          <Text>
            <Tooltip title="Check access point configuration">
              <Badge status="error" /> Packet loss exceeding threshold on wireless network
            </Tooltip>
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default Performance;