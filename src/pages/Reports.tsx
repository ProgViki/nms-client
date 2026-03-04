import React, { useState } from 'react';
import {
  Card, Typography, Form, Select, DatePicker, Button,
  Table, Tag, Space, Checkbox, Radio, Input, Tabs,
  List, Avatar, Progress, Statistic, Row, Col, Divider,
  Tooltip, Badge, Rate, Steps, Upload, message, Alert
} from 'antd';
import {
  FileTextOutlined, BarChartOutlined, PieChartOutlined,
  DownloadOutlined, PrinterOutlined, ShareAltOutlined,
  ScheduleOutlined, StarOutlined, CheckCircleOutlined,
  ClockCircleOutlined, FilePdfOutlined, FileExcelOutlined
} from '@ant-design/icons';
import { dummyDevices } from '../services/dummyData';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { TabPane } = Tabs;

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('performance');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const reportTemplates = [
    {
      id: '1',
      name: 'Network Performance Report',
      description: 'Comprehensive performance metrics across all devices',
      type: 'performance',
      format: 'pdf',
      rating: 5,
    },
    {
      id: '2',
      name: 'Device Inventory Report',
      description: 'Complete list of all network devices with specifications',
      type: 'inventory',
      format: 'excel',
      rating: 4,
    },
    {
      id: '3',
      name: 'Security Compliance Report',
      description: 'Security posture and compliance status',
      type: 'security',
      format: 'pdf',
      rating: 5,
    },
  ];

  const scheduledReports = [
    {
      id: '1',
      name: 'Daily Performance Summary',
      frequency: 'Daily',
      nextRun: '2024-01-15 08:00',
      recipients: ['admin@network.com'],
      status: 'active',
    },
    {
      id: '2',
      name: 'Weekly Security Report',
      frequency: 'Weekly',
      nextRun: '2024-01-20 09:00',
      recipients: ['security@network.com'],
      status: 'active',
    },
  ];

  const columns = [
    {
      title: 'Report Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: 'Format',
      dataIndex: 'format',
      key: 'format',
      render: (format: string) => (
        <Tag icon={format === 'pdf' ? <FilePdfOutlined /> : <FileExcelOutlined />}>
          {format.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<DownloadOutlined />} size="small">Download</Button>
          <Button icon={<ShareAltOutlined />} size="small">Share</Button>
          <Button icon={<ScheduleOutlined />} size="small">Schedule</Button>
        </Space>
      ),
    },
  ];

  const steps = [
    { title: 'Select Template', description: 'Choose report format' },
    { title: 'Configure Parameters', description: 'Set filters and options' },
    { title: 'Schedule & Distribute', description: 'Define delivery settings' },
  ];

  return (
    <div>
      <Title level={2}>Reports & Analytics</Title>

      <Steps current={currentStep} items={steps} style={{ marginBottom: 24 }} />

      <Tabs defaultActiveKey="1">
        <TabPane tab="Report Generation" key="1">
          <Card>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Report Type" required>
                    <Select value={reportType} onChange={setReportType}>
                      <Option value="performance">Performance Report</Option>
                      <Option value="inventory">Inventory Report</Option>
                      <Option value="security">Security Report</Option>
                      <Option value="compliance">Compliance Report</Option>
                      <Option value="custom">Custom Report</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Date Range" required>
                    <RangePicker style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item label="Devices">
                    <Select mode="multiple" placeholder="Select devices">
                      {dummyDevices.map(device => (
                        <Option key={device.id} value={device.id}>{device.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Metrics">
                    <Checkbox.Group>
                      <Row>
                        <Col span={8}><Checkbox value="cpu">CPU Usage</Checkbox></Col>
                        <Col span={8}><Checkbox value="memory">Memory Usage</Checkbox></Col>
                        <Col span={8}><Checkbox value="bandwidth">Bandwidth</Checkbox></Col>
                        <Col span={8}><Checkbox value="latency">Latency</Checkbox></Col>
                        <Col span={8}><Checkbox value="packetLoss">Packet Loss</Checkbox></Col>
                        <Col span={8}><Checkbox value="uptime">Uptime</Checkbox></Col>
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Report Format">
                    <Radio.Group defaultValue="pdf">
                      <Radio value="pdf">PDF</Radio>
                      <Radio value="excel">Excel</Radio>
                      <Radio value="csv">CSV</Radio>
                      <Radio value="html">HTML</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label="Chart Type">
                    <Radio.Group defaultValue="line">
                      <Radio value="line">Line Chart</Radio>
                      <Radio value="bar">Bar Chart</Radio>
                      <Radio value="pie">Pie Chart</Radio>
                      <Radio value="area">Area Chart</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label="Report Quality">
                    <Rate defaultValue={5} />
                  </Form.Item>

                  <Form.Item label="Additional Notes">
                    <TextArea rows={4} placeholder="Enter any additional notes or comments..." />
                  </Form.Item>

                  <Form.Item label="Report Rating">
                    <Slider defaultValue={80} />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />

              <Title level={5}>Schedule Report</Title>
              
              <Form.Item>
                <Checkbox onChange={(e) => setScheduleEnabled(e.target.checked)}>
                  Schedule this report
                </Checkbox>
              </Form.Item>

              {scheduleEnabled && (
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Frequency">
                      <Select defaultValue="daily">
                        <Option value="daily">Daily</Option>
                        <Option value="weekly">Weekly</Option>
                        <Option value="monthly">Monthly</Option>
                        <Option value="quarterly">Quarterly</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Time">
                      <DatePicker showTime />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Recipients">
                      <Select mode="tags" placeholder="Enter email addresses" />
                    </Form.Item>
                  </Col>
                </Row>
              )}

              <Divider />

              <Space>
                <Button type="primary" icon={<FileTextOutlined />} size="large">
                  Generate Report
                </Button>
                <Button icon={<DownloadOutlined />} size="large">
                  Preview
                </Button>
                <Button icon={<ScheduleOutlined />} size="large">
                  Save Template
                </Button>
              </Space>
            </Form>
          </Card>
        </TabPane>

        <TabPane tab="Report Templates" key="2">
          <Card>
            <Table
              columns={columns}
              dataSource={reportTemplates}
              pagination={false}
            />

            <Divider />

            <Title level={5}>Popular Reports</Title>
            <List
              dataSource={reportTemplates}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button icon={<DownloadOutlined />}>Download</Button>,
                    <Button icon={<StarOutlined />}>Favorite</Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<FileTextOutlined />} />}
                    title={item.name}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>

        <TabPane tab="Scheduled Reports" key="3">
          <Card>
            <Alert
              message="Scheduled Reports"
              description="Your reports will be generated and sent automatically based on the schedule."
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />

            <List
              dataSource={scheduledReports}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button size="small">Edit</Button>,
                    <Button size="small" danger>Disable</Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<ScheduleOutlined />} />}
                    title={item.name}
                    description={
                      <Space direction="vertical">
                        <Text>Frequency: {item.frequency}</Text>
                        <Text>Next Run: {item.nextRun}</Text>
                        <Text>Recipients: {item.recipients.join(', ')}</Text>
                      </Space>
                    }
                  />
                  <Badge status="processing" text="Active" />
                </List.Item>
              )}
            />

            <Divider />

            <Space>
              <Button icon={<PlusOutlined />}>Add Schedule</Button>
              <Button icon={<ExportOutlined />}>Export Schedule</Button>
            </Space>
          </Card>
        </TabPane>

        <TabPane tab="Report History" key="4">
          <Card>
            <Timeline>
              <Timeline.Item dot={<CheckCircleOutlined style={{ color: '#52c41a' }} />}>
                <Text strong>Performance Report</Text>
                <p>Generated: 2024-01-14 08:00 AM</p>
                <Space>
                  <Button size="small" icon={<DownloadOutlined />}>Download</Button>
                  <Button size="small" icon={<ShareAltOutlined />}>Share</Button>
                </Space>
              </Timeline.Item>
              <Timeline.Item dot={<ClockCircleOutlined style={{ color: '#1890ff' }} />}>
                <Text strong>Security Report</Text>
                <p>Generated: 2024-01-13 09:30 AM</p>
                <Space>
                  <Button size="small" icon={<DownloadOutlined />}>Download</Button>
                </Space>
              </Timeline.Item>
              <Timeline.Item>
                <Text strong>Inventory Report</Text>
                <p>Generated: 2024-01-12 02:00 PM</p>
                <Space>
                  <Button size="small" icon={<DownloadOutlined />}>Download</Button>
                </Space>
              </Timeline.Item>
            </Timeline>

            <Divider />

            <Space>
              <Button icon={<FileTextOutlined />}>Load More</Button>
              <Pagination defaultCurrent={1} total={50} showSizeChanger />
            </Space>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Reports;