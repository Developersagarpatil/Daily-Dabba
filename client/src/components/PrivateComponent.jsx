import React from "react";
import useAuthStatus from "../hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading";

const PrivateComponent = () => {
  const { checkUser, isLoggedIn } = useAuthStatus(); // Fixed: isloggedIn → isLoggedIn

  if (checkUser) {
    return <Loading />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateComponent;
