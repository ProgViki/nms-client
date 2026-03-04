import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import MainLayout from './MainLayout';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return isAuthenticated ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;