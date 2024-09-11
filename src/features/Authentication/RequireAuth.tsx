import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { selectIsLoading } from "../../redux/slices/uiSlice";
import { useAppSelector } from "../../redux/hooks";
import { CaosSpinner } from "../../components/CaOSSpinner/CaosSpinner";
import useAuth from "../../auth/useAuth";

export const RequireAuth = () => {
    const loading = useAppSelector(selectIsLoading);
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    if (loading) {
        return <CaosSpinner />;
    }
    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/auth" state={{ from: location }} replace />
    );
};
