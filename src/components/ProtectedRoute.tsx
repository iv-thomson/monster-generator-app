import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = (token: string | null) => {
  return token ? true : false;
};

export const ProtectedRoute = () => {
  const { token } = useSelector((state: RootState) => state.loginState);

  return isAuthenticated(token) ? <Outlet /> : <Navigate to='/login' />;
};
