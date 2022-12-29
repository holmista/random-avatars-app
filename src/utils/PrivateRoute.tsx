import { Outlet, Navigate } from "react-router-dom";
import React from "react";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
