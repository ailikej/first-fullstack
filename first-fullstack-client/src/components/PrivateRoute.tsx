import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserToken } from '../features/userSlice';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useSelector(selectUserToken);

  return <React.Fragment>{token ? children : <Navigate to="/login" />}</React.Fragment>;
};

export default PrivateRoute;
