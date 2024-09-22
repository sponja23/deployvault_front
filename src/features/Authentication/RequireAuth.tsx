import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../../auth/useAuth";

export const RequireAuth = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // TODO: Loading for authentication? Maybe not necessary
  // if (loading) {
  //     return <LoadingSpinner />;
  // }
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
