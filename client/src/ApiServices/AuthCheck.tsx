// AuthCheck.tsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../Components/Loader/Loader";

interface AuthCheckProps {
  children: React.ReactNode;
  protectedRoutes?: string[]; // An optional prop for protected routes
  unprotectedRoutes?: string[]; // An optional prop for unprotected routes
}

const AuthCheck: React.FC<AuthCheckProps> = ({
  children,
  protectedRoutes = [],
  unprotectedRoutes = [],
}) => {
  const [loading, setLoading] = useState(true); // Loading state
  const accessToken = Cookies.get("ACCESS_TOKEN");
  const location = useLocation(); // Get the current location

  useEffect(() => {
    // Simulate an async operation for authentication check
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after checks
    }, 500); // Adjust time as needed for loading effect

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  // Check if the user is trying to access a protected route
  const isProtectedRoute = protectedRoutes.includes(location.pathname);
  const isUnprotectedRoute = unprotectedRoutes.includes(location.pathname);

  if (loading) {
    return <Loader loading={true} type="beat" size={80} color="#000000" />; // Show loader while checking
  }

  if (!accessToken) {
    // If there's no access token
    if (isUnprotectedRoute) {
      return <>{children}</>; // Allow access to unprotected routes
    }
    // Redirect to login if no access token is found and not accessing an unprotected route
    return <Navigate to="/login" replace />;
  } else if (!isProtectedRoute && accessToken) {
    // If access token is found and the user tries to access a non-protected route
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>; // Render children if authenticated and accessing a protected route
};

export default AuthCheck;
