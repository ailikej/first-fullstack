import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/userSlice";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = useSelector(selectUserToken);

  return (
    <React.Fragment>
      {user ? children : <Navigate to="/login" />}
    </React.Fragment>
  );
};

export default PrivateRoute;
