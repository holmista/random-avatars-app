import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/store";

function PrivateRoute() {
  const authenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return authenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
