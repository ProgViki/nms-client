import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NetworkDevices from './pages/NetworkDevices';
import Performance from './pages/Performance';
import Alerts from './pages/Alerts';
import Configuration from './pages/Configuration';
import Reports from './pages/Reports';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="devices" element={<NetworkDevices />} />
            <Route path="performance" element={<Performance />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="configuration" element={<Configuration />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;