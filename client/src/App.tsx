import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpForm from "./Pages/SignUpForm";
import { ToastContainerWrapper } from "./ToastServices/ToastContainer";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import LogInForm from "./Pages/LoginInForm";
import Profile from "./Pages/Profile/Profile";
import CreateProduct from "./Pages/Admin/CreateProduct";
import AuthCheck from "./ApiServices/AuthCheck";
import Dashboard from "./Pages/Dashboard";
import ProductList from "./Pages/ProductsList";
import PageNotFound from "./Pages/Errors/404-page-not-found";

const App: React.FC = () => {
  const protectedRoutes = ["/profile", "/createProduct", "/market", "/dashboard"];
  const unprotectedRoutes = ["/login", "/signUp", "/forgotPassword", "/404"];

  return (
    <BrowserRouter>
      <div className="flex justify-center items-center min-h-screen bg-light">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Unprotected Routes */}
            <Route path="/login" element={<AuthCheck protectedRoutes={protectedRoutes} unprotectedRoutes={unprotectedRoutes}><LogInForm /></AuthCheck>} />
            <Route path="/signup" element={<AuthCheck protectedRoutes={protectedRoutes} unprotectedRoutes={unprotectedRoutes}><SignUpForm /></AuthCheck>} />
            <Route path="/404" element={<PageNotFound />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<AuthCheck protectedRoutes={protectedRoutes} unprotectedRoutes={unprotectedRoutes}><MainLayout><Dashboard /></MainLayout></AuthCheck>} />
            <Route path="/profile" element={<AuthCheck protectedRoutes={protectedRoutes} unprotectedRoutes={unprotectedRoutes}><MainLayout><Profile /></MainLayout></AuthCheck>} />
            <Route path="/createProduct" element={<AuthCheck protectedRoutes={protectedRoutes} unprotectedRoutes={unprotectedRoutes}><MainLayout><CreateProduct /></MainLayout></AuthCheck>} />
            <Route path="/market" element={<AuthCheck protectedRoutes={protectedRoutes} unprotectedRoutes={unprotectedRoutes}><MainLayout><ProductList /></MainLayout></AuthCheck>} />
            
            {/* Redirect to /404 for undefined routes */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </div>
      <ToastContainerWrapper />
    </BrowserRouter>
  );
};

export default App;
