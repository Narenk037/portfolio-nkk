import React from 'react';
import { Navigate } from 'react-router-dom';
import { checkIsAuthenticated } from '../services/portfolioService';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = checkIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
