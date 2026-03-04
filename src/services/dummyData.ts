import { NetworkDevice, Alert, PerformanceMetric, ConfigurationTemplate } from '../types';

export const dummyDevices: NetworkDevice[] = [
  {
    id: '1',
    name: 'Core-Router-01',
    type: 'router',
    ipAddress: '192.168.1.1',
    status: 'online',
    location: 'Data Center A - Rack 1',
    lastSeen: new Date().toISOString(),
    uptime: 99.98,
    manufacturer: 'Cisco',
    model: 'ASR-1001-X'
  },
  {
    id: '2',
    name: 'Core-Switch-01',
    type: 'switch',
    ipAddress: '192.168.1.2',
    status: 'online',
    location: 'Data Center A - Rack 2',
    lastSeen: new Date().toISOString(),
    uptime: 99.95,
    manufacturer: 'Juniper',
    model: 'EX4300'
  },
  {
    id: '3',
    name: 'Edge-Firewall-01',
    type: 'firewall',
    ipAddress: '192.168.1.254',
    status: 'online',
    location: 'Data Center A - Rack 1',
    lastSeen: new Date().toISOString(),
    uptime: 99.99,
    manufacturer: 'Palo Alto',
    model: 'PA-3220'
  },
  {
    id: '4',
    name: 'Access-Point-Floor1',
    type: 'access-point',
    ipAddress: '192.168.2.10',
    status: 'degraded',
    location: 'Building B - Floor 1',
    lastSeen: new Date().toISOString(),
    uptime: 98.50,
    manufacturer: 'Aruba',
    model: 'AP-515'
  },
  {
    id: '5',
    name: 'Distribution-Switch-02',
    type: 'switch',
    ipAddress: '192.168.1.10',
    status: 'maintenance',
    location: 'Data Center B - Rack 3',
    lastSeen: new Date().toISOString(),
    uptime: 0,
    manufacturer: 'Cisco',
    model: 'Catalyst 9300'
  }
];

export const dummyAlerts: Alert[] = [
  {
    id: '1',
    severity: 'critical',
    deviceId: '4',
    deviceName: 'Access-Point-Floor1',
    message: 'High packet loss detected on access point',
    timestamp: new Date().toISOString(),
    acknowledged: false
  },
  {
    id: '2',
    severity: 'warning',
    deviceId: '1',
    deviceName: 'Core-Router-01',
    message: 'CPU usage exceeds 80% threshold',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    acknowledged: false
  },
  {
    id: '3',
    severity: 'info',
    deviceId: '3',
    deviceName: 'Edge-Firewall-01',
    message: 'Firmware update available',
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
    acknowledged: true
  }
];

export const dummyPerformanceMetrics: PerformanceMetric[] = [
  {
    deviceId: '1',
    timestamp: new Date().toISOString(),
    cpuUsage: 75,
    memoryUsage: 68,
    bandwidthIn: 450,
    bandwidthOut: 380,
    packetLoss: 0.02
  },
  {
    deviceId: '2',
    timestamp: new Date().toISOString(),
    cpuUsage: 45,
    memoryUsage: 52,
    bandwidthIn: 850,
    bandwidthOut: 920,
    packetLoss: 0.01
  }
];

export const dummyConfigTemplates: ConfigurationTemplate[] = [
  {
    id: '1',
    name: 'Basic Router Config',
    description: 'Basic configuration template for edge routers',
    deviceType: 'router',
    content: 'interface GigabitEthernet0/0\n ip address dhcp\n no shutdown',
    version: 1
  },
  {
    id: '2',
    name: 'VLAN Configuration',
    description: 'Standard VLAN setup for access switches',
    deviceType: 'switch',
    content: 'vlan 10\n name DATA\nvlan 20\n name VOICE',
    version: 2
  }
];