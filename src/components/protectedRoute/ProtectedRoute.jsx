
import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole, children }) => {
  const role = localStorage.getItem('role');
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (!isLoggedIn || role !== allowedRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute
