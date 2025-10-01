import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check for the existence of userToken in localStorage
  const userToken = localStorage.getItem('plmun_authenticated');
  
  // If token EXISTS, render the requested component (e.g., Dashboard)
  if (userToken === 'true') {
    return children;
  }
  
  // If token DOES NOT EXIST, redirect to Login Page (/)
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
