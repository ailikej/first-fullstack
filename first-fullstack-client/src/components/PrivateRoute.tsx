import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  return (
    <React.Fragment>
      {token ? children : <Navigate to="/login" />}
    </React.Fragment>
  );
};

export default PrivateRoute;
