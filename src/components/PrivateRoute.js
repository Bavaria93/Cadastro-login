import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  console.log('Token no PrivateRoute:', token);
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
