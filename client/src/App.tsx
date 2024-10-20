import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpForm from "./Pages/SignUpForm";
import { ToastContainerWrapper } from "./ToastServices/ToastContainer";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import LogInForm from "./Pages/LoginInForm";
import Profile from "./Pages/Profile/Profile";
import CreateProduct from "./Pages/Admin/CreateProduct";
import AuthCheck from "./ApiServices/AuthCheck"; // Import the AuthCheck component
import Dashboard from "./Pages/Dashboard";
import ProductList from "./Pages/ProductsList";

const App: React.FC = () => {
  const protectedRoutes = [
    "/profile",
    "/createProduct",
    "/market",
    "/dashboard",
  ]; // Define protected routes
  const unprotectedRoutes = ["/login", "/signUp", "/forgotPassword"]; // Define unprotected routes

  return (
    <BrowserRouter>
      <div className="flex justify-center items-center min-h-screen bg-light">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* Independent routes for SignUp and Login */}
            <Route
              path="/login"
              element={
                <AuthCheck
                  protectedRoutes={protectedRoutes}
                  unprotectedRoutes={unprotectedRoutes}
                >
                  <LogInForm />
                </AuthCheck>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthCheck
                  protectedRoutes={protectedRoutes}
                  unprotectedRoutes={unprotectedRoutes}
                >
                  <SignUpForm />
                </AuthCheck>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <AuthCheck
                  protectedRoutes={protectedRoutes}
                  unprotectedRoutes={unprotectedRoutes}
                >
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </AuthCheck>
              }
            />

            <Route
              path="/profile"
              element={
                <AuthCheck
                  protectedRoutes={protectedRoutes}
                  unprotectedRoutes={unprotectedRoutes}
                >
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                </AuthCheck>
              }
            />

            <Route
              path="/createProduct"
              element={
                <AuthCheck
                  protectedRoutes={protectedRoutes}
                  unprotectedRoutes={unprotectedRoutes}
                >
                  <MainLayout>
                    <CreateProduct />
                  </MainLayout>
                </AuthCheck>
              }
            />

            <Route
              path="/market"
              element={
                <AuthCheck
                  protectedRoutes={protectedRoutes}
                  unprotectedRoutes={unprotectedRoutes}
                >
                  <MainLayout>
                    <ProductList />
                  </MainLayout>
                </AuthCheck>
              }
            />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
      {/* ToastContainer added globally */}
      <ToastContainerWrapper />
    </BrowserRouter>
  );
};

export default App;
