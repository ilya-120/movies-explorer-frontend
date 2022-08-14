import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const jwt = localStorage.getItem('jwt');
  return (
    jwt || props.loggedIn ? <Component {...props} /> : <Navigate to="/" />
  )
}

export default ProtectedRoute;
