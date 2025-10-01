import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  // Check for the existence of userToken in localStorage
  const userToken = localStorage.getItem('plmun_authenticated');
  
  // If token EXISTS, redirect to Dashboard (/dashboard)
  if (userToken === 'true') {
    return <Navigate to="/dashboard" replace />;
  }
  
  // If token DOES NOT EXIST, render the requested component (e.g., Login Page)
  return children;
};

export default AuthLayout;
