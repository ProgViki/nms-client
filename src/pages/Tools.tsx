import React, { useState, useRef } from 'react';
import {
  Card, Button, Space, Typography, Skeleton, Spin,
  Watermark, Affix, Tour, Row, Col, Breadcrumb, Switch,
  Alert, Progress, Tag
} from 'antd';
import {
  LoadingOutlined, CameraOutlined, PushpinOutlined,
  QuestionCircleOutlined, ReloadOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Tools: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [affixed, setAffixed] = useState(false);
  
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const simulateSpinning = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 3000);
  };

  const tourSteps = [
    {
      title: 'Welcome to Tools',
      description: 'This page demonstrates various utility components',
      target: () => ref1.current,
    },
    {
      title: 'Loading States',
      description: 'Use Skeleton and Spin components for loading states',
      target: () => ref2.current,
    },
    {
      title: 'Watermark',
      description: 'Add watermarks to your content for security',
      target: () => ref3.current,
    },
  ];

  return (
    <div className="p-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>Utilities</Breadcrumb.Item>
        <Breadcrumb.Item>Tools</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Utility Components
        </Title>
        <Space>
          <Button 
            icon={<QuestionCircleOutlined />}
            onClick={() => setTourOpen(true)}
          >
            Start Tour
          </Button>
          <Switch
            checked={affixed}
            onChange={setAffixed}
            checkedChildren={<PushpinOutlined />}
            unCheckedChildren="Affix"
          />
        </Space>
      </div>

      <Tour
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        steps={tourSteps}
      />

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card 
            ref={ref1}
            title="Skeleton & Loading States" 
            className="shadow-md"
            extra={
              <Button onClick={simulateLoading} icon={<ReloadOutlined />}>
                Toggle Loading
              </Button>
            }
          >
            <Skeleton loading={loading} avatar active>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Space direction="vertical">
                  <Text strong>Content Loaded Successfully</Text>
                  <Text>This content appears after skeleton loading</Text>
                  <Progress percent={100} size="small" />
                  <Tag color="green">Completed</Tag>
                </Space>
              </div>
            </Skeleton>
          </Card>
        </Col>

        <Col span={12}>
          <Card 
            ref={ref2}
            title="Spin & Loading Indicators" 
            className="shadow-md"
            extra={
              <Button onClick={simulateSpinning} icon={<LoadingOutlined />}>
                Start Spinning
              </Button>
            }
          >
            <Spin spinning={spinning} tip="Loading..." size="large">
              <div className="p-8 bg-gray-50 rounded-lg text-center">
                <Space direction="vertical">
                  <CameraOutlined className="text-4xl text-gray-400" />
                  <Text>Content is protected while loading</Text>
                </Space>
              </div>
            </Spin>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col span={24}>
          <Card 
            ref={ref3}
            title="Watermark Example" 
            className="shadow-md overflow-hidden"
          >
            <Watermark
              content={['Network Operations', 'Confidential']}
            //   fontSize={16}
              gap={[100, 100]}
              rotate={-22}
            >
              <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
                <Space direction="vertical">
                  <Title level={4}>Confidential Document</Title>
                  <Text>This content is protected with a watermark</Text>
                  <Alert
                    message="Watermark Active"
                    description="All content in this section is watermarked for security"
                    type="info"
                    showIcon
                  />
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white p-4 rounded shadow-sm">
                        <Skeleton active paragraph={{ rows: 2 }} />
                      </div>
                    ))}
                  </div>
                </Space>
              </div>
            </Watermark>
          </Card>
        </Col>
      </Row>

      {affixed && (
        <Affix offsetTop={80}>
          <Card className="shadow-lg border-blue-500 border-l-4">
            <Space>
              <PushpinOutlined className="text-blue-500" />
              <Text strong>Quick Actions Panel</Text>
              <Button size="small" type="primary">Refresh</Button>
              <Button size="small">Settings</Button>
            </Space>
          </Card>
        </Affix>
      )}

      <Row gutter={[16, 16]} className="mt-6">
        <Col span={8}>
          <Card title="Skeleton Variants" className="shadow-md">
            <Space direction="vertical" className="w-full">
              <Skeleton.Input active block />
              <Skeleton.Input active block size="small" />
              <Skeleton.Button active block />
              <Skeleton.Avatar active size="large" />
              <Skeleton.Image />
            </Space>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Spin Variants" className="shadow-md">
            <Space direction="vertical" className="w-full" align="center">
              <Spin size="small" />
              <Spin />
              <Spin size="large" />
              <Spin indicator={<LoadingOutlined spin />} />
              <Spin tip="Loading...">
                <div className="p-4 bg-gray-50 rounded">Content</div>
              </Spin>
            </Space>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Affix Demo" className="shadow-md">
            <Space direction="vertical">
              <Text>Toggle the switch above to see affix in action</Text>
              <Alert
                message="Affix is {affixed ? 'enabled' : 'disabled'}"
                type={affixed ? 'success' : 'info'}
                showIcon
              />
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Tools;