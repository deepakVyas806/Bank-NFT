import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../Components/Loader/Loader";

interface AuthCheckProps {
  children: React.ReactNode;
  protectedRoutes?: string[];
  unprotectedRoutes?: string[];
}

const AuthCheck: React.FC<AuthCheckProps> = ({
  children,
  protectedRoutes = [],
  unprotectedRoutes = [],
}) => {
  const [loading, setLoading] = useState(true);
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const isProtectedRoute = protectedRoutes.includes(location.pathname);
  const isUnprotectedRoute = unprotectedRoutes.includes(location.pathname);
  const isRouteMatched = isProtectedRoute || isUnprotectedRoute;

  if (loading) {
    return <Loader loading={true} type="beat" size={80} color="#000000" />;
  }
  if (!isRouteMatched) {
    return <Navigate to="/404" replace />; // Redirect to 403 if route is unmatched
  }

  if (!accessToken) {
    if (isUnprotectedRoute) {
      return <>{children}</>;
    }
    return <Navigate to="/login" replace />;
  } else if (!isProtectedRoute && accessToken) {
    return <Navigate to="/market" replace />;
  }

  return <>{children}</>;
};

export default AuthCheck;
