import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { selectIsLoading } from "../../redux/slices/uiSlice";
import { selectCurrentToken } from "../../redux/slices/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { CaosSpinner } from "../../components/CaOSSpinner/CaosSpinner";

export const RequireAuth = () => {
  const loading = useAppSelector(selectIsLoading);
  const location = useLocation();
  const access_token = useAppSelector(selectCurrentToken);

  if (loading) {
    return <CaosSpinner />;
  }
  return access_token ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />;
};
