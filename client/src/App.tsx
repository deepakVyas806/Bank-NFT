import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./Pages/SignUpForm";
import LogInForm from "./Pages/LoginInForm";
import { ToastContainerWrapper } from "./ToastServices/ToastContainer";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex justify-center items-center min-h-screen bg-light">
        <div className="w-full max-w-md">
          {" "}
          {/* Full width on mobile and tablet, 33% on desktop */}
          <Routes>
            <Route path="/" element={<SignUpForm />} />
            <Route path="/login" element={<LogInForm />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </div>
      {/* ToastContainer added globally */}
      <ToastContainerWrapper />
    </BrowserRouter>
  );
};

export default App;
