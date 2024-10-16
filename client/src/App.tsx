import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./Pages/SignUpForm";
import { ToastContainerWrapper } from "./ToastServices/ToastContainer";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import LogInForm from "./Pages/LoginInForm";
import Profile from "./Pages/Profile/Profile";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex justify-center items-center min-h-screen bg-light">
        <div className="w-full max-w-md">
          <Routes>
            {/* Independent routes for SignUp and Login */}
            <Route path="/" element={<LogInForm />} />
            <Route path="/signup" element={<SignUpForm />} />

            {/* Routes using the MainLayout */}
            {/* <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          /> */}
            <Route
              path="/profile"
              element={
                <MainLayout>
                  <Profile />
                </MainLayout>
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
