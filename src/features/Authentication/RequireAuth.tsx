import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import LoadingSpinner from "../Ui/LoadingSpinner";

export const RequireAuth = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  // TODO: Loading for authentication? Maybe not necessary
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
