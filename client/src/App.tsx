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
import WithdrawalRequests from "./Pages/Withdrawals/WithdrawalRequests";
import ReferAndEarn from "./Pages/ReferAndEarn/ReferAndEarn";
import ReserveMoney from "./Pages/ReserveMoney/ReserveMoney";
import MyReferrals from "./Pages/MyReferrals/MyReferrals";

const App: React.FC = () => {
  const protectedRoutes = [
    "/profile",
    "/createProduct",
    "/myReferrals",
    "/market",
    "/dashboard",
    "/myProducts",
    "/reserve",
    "/requests",
    "/referAndEarn",
    "/requests",
  ];
  const unprotectedRoutes = ["/login", "/signUp", "/forgotPassword", "/404"];

  return (
    <BrowserRouter>
      <div className="flex justify-center items-center min-h-screen bg-light">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Unprotected Routes */}
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
            <Route path="/404" element={<PageNotFound />} />

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
                    <ProductList isMyProducts={false} />
                  </MainLayout>
                </AuthCheck>
              }
            />
            <Route
              path="/myProducts"
              element={
                <AuthCheck
                  protectedRoutes={protectedRoutes}
                  unprotectedRoutes={unprotectedRoutes}
                >
                  <MainLayout>
                    <ProductList isMyProducts={true} />
                  </MainLayout>
                </AuthCheck>
              }
            />
            <Route
              path="/requests"
              element={
                <AuthCheck
                  protectedRoutes={protectedRoutes}
                  unprotectedRoutes={unprotectedRoutes}
                >
                  <MainLayout>
                    <WithdrawalRequests />
                  </MainLayout>
                </AuthCheck>
              }
            />
            <Route
              path="/referAndEarn"
              element={
                <AuthCheck
                  protectedRoutes={protectedRoutes}
                  unprotectedRoutes={unprotectedRoutes}
                >
                  <MainLayout>
                    <ReferAndEarn />
                  </MainLayout>
                </AuthCheck>
              }
            />
            <Route
              path="/reserve"
              element={
                <AuthCheck
                  protectedRoutes={protectedRoutes}
                  unprotectedRoutes={unprotectedRoutes}
                >
                  <MainLayout>
                    <ReserveMoney />
                  </MainLayout>
                </AuthCheck>
              }
            />
            <Route
              path="/requests"
              element={
                <AuthCheck
                  protectedRoutes={protectedRoutes}
                  unprotectedRoutes={unprotectedRoutes}
                >
                  <MainLayout>
                    <WithdrawalRequests />
                  </MainLayout>
                </AuthCheck>
              }
            />
            <Route
              path="/myReferrals"
              element={
                <AuthCheck
                  protectedRoutes={protectedRoutes}
                  unprotectedRoutes={unprotectedRoutes}
                >
                  <MainLayout>
                    <MyReferrals />
                  </MainLayout>
                </AuthCheck>
              }
            />

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
