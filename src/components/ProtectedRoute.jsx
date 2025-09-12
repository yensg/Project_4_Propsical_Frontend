import React, { use } from "react";
import AuthCtx from "../context/AuthCtx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const authCtx = use(AuthCtx);
  const isAuthenticated = Boolean(authCtx.access);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
};

export default ProtectedRoute;
