import React, { useState } from 'react';
import {
  Form, Input, Button, Card, Typography, Space, Select,
  Upload, message, InputNumber, ColorPicker, DatePicker,
  TimePicker, Checkbox, Radio, Switch, Slider, Rate,
  AutoComplete, Cascader, Mentions, Transfer, TreeSelect,
  Divider, Steps, Tabs, Badge, Avatar, List
} from 'antd';
import {
  UploadOutlined, InboxOutlined, SaveOutlined,
  SettingOutlined, CloudUploadOutlined
} from '@ant-design/icons';
import { dummyConfigTemplates } from '../services/dummyData';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;
const { Step } = Steps;

const Configuration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [uploadFileList, setUploadFileList] = useState<any[]>([]);

  const cascaderOptions = [
    {
      value: 'router',
      label: 'Router',
      children: [
        {
          value: 'cisco',
          label: 'Cisco',
          children: [
            { value: 'ios', label: 'IOS' },
            { value: 'ios-xe', label: 'IOS-XE' },
          ],
        },
        {
          value: 'juniper',
          label: 'Juniper',
          children: [
            { value: 'junos', label: 'JUNOS' },
          ],
        },
      ],
    },
  ];

  const autoCompleteOptions = [
    { value: 'enable password' },
    { value: 'interface GigabitEthernet' },
    { value: 'ip address' },
    { value: 'hostname' },
  ];

  const transferData = dummyConfigTemplates.map(template => ({
    key: template.id,
    title: template.name,
    description: template.deviceType,
  }));

  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const steps = [
    { title: 'Select Template', description: 'Choose base configuration' },
    { title: 'Configure Parameters', description: 'Set device-specific values' },
    { title: 'Review & Deploy', description: 'Validate and apply' },
  ];

  return (
    <div>
      <Title level={2}>Network Configuration</Title>

      <Steps current={currentStep} items={steps} style={{ marginBottom: 24 }} />

      <Tabs defaultActiveKey="1" style={{ marginBottom: 24 }}>
        <Tabs.TabPane tab="Configuration Templates" key="1">
          <Card>
            <Form layout="vertical">
              <Form.Item label="Configuration Name" required>
                <Input placeholder="Enter configuration name" />
              </Form.Item>

              <Form.Item label="Device Type" required>
                <Select placeholder="Select device type">
                  <Option value="router">Router</Option>
                  <Option value="switch">Switch</Option>
                  <Option value="firewall">Firewall</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Configuration Template">
                <AutoComplete
                  options={autoCompleteOptions}
                  placeholder="Type configuration command"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="Configuration Content">
                <TextArea rows={6} placeholder="Enter configuration commands..." />
              </Form.Item>

              <Divider />

              <Title level={5}>Advanced Settings</Title>

              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Form.Item label="Version">
                  <InputNumber min={1} max={10} defaultValue={1} />
                </Form.Item>

                <Form.Item label="Configuration Color">
                  <ColorPicker />
                </Form.Item>

                <Form.Item label="Schedule Deployment">
                  <Space direction="vertical">
                    <DatePicker placeholder="Select date" />
                    <TimePicker placeholder="Select time" />
                  </Space>
                </Form.Item>

                <Form.Item label="Backup Options">
                  <Checkbox.Group>
                    <Checkbox value="config">Backup Configuration</Checkbox>
                    <Checkbox value="logs">Backup Logs</Checkbox>
                    <Checkbox value="stats">Backup Statistics</Checkbox>
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item label="Deployment Strategy">
                  <Radio.Group defaultValue="rolling">
                    <Radio value="rolling">Rolling Update</Radio>
                    <Radio value="bluegreen">Blue-Green</Radio>
                    <Radio value="canary">Canary</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="Auto-Rollback">
                  <Switch defaultChecked />
                </Form.Item>

                <Form.Item label="Configuration Priority">
                  <Slider defaultValue={5} min={1} max={10} />
                </Form.Item>

                <Form.Item label="Template Rating">
                  <Rate defaultValue={4} />
                </Form.Item>

                <Form.Item label="Mention Team">
                  <Mentions
                    options={[
                      { value: 'admin', label: 'Admin' },
                      { value: 'network', label: 'Network Team' },
                    ]}
                    placeholder="@mention team"
                  />
                </Form.Item>

                <Form.Item label="Template Category">
                  <Cascader options={cascaderOptions} placeholder="Select category" />
                </Form.Item>
              </Space>

              <Divider />

              <Title level={5}>Assign Templates</Title>
              <Transfer
                dataSource={transferData}
                targetKeys={targetKeys}
                onChange={setTargetKeys}
                render={item => item.title}
                listStyle={{ width: 250, height: 300 }}
              />

              <Divider />

              <Form.Item>
                <Button type="primary" icon={<SaveOutlined />} size="large">
                  Save Configuration
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Configuration Upload" key="2">
          <Card>
            <Dragger {...uploadProps} fileList={uploadFileList} onChange={({ fileList }) => setUploadFileList(fileList)}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for single or bulk upload. Strictly prohibited from uploading company data or other
                band files
              </p>
            </Dragger>

            <Divider />

            <Title level={5}>Uploaded Templates</Title>
            <List
              dataSource={dummyConfigTemplates}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<SettingOutlined />} />}
                    title={item.name}
                    description={`v${item.version} - ${item.deviceType}`}
                  />
                  <Badge status="success" text="Valid" />
                </List.Item>
              )}
            />
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Bulk Operations" key="3">
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Upload {...uploadProps} fileList={uploadFileList}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>

              <Button type="primary" icon={<CloudUploadOutlined />} block>
                Deploy to All Devices
              </Button>

              <Divider />

              <Title level={5}>Deployment Status</Title>
              <Steps direction="vertical" current={1}>
                <Step title="Template Validation" description="Checking syntax..." />
                <Step title="Device Compatibility" description="Verifying device support" />
                <Step title="Deployment" description="Applying configuration" />
                <Step title="Verification" description="Validating deployment" />
              </Steps>
            </Space>
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Configuration;