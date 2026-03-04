export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
}

export interface NetworkDevice {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'firewall' | 'access-point';
  ipAddress: string;
  status: 'online' | 'offline' | 'maintenance' | 'degraded';
  location: string;
  lastSeen: string;
  uptime: number;
  manufacturer: string;
  model: string;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  deviceId: string;
  deviceName: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface PerformanceMetric {
  deviceId: string;
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  bandwidthIn: number;
  bandwidthOut: number;
  packetLoss: number;
}

export interface ConfigurationTemplate {
  id: string;
  name: string;
  description: string;
  deviceType: string;
  content: string;
  version: number;
}