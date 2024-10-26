// PageNotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
//   const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <img src="/404.svg" className="w-52 h-52 ml-10"/>
      <p className="text-2xl font-semibold text-gray-900 text-center mb-2">We have lost this page</p>
      <div className="text-md text-center text-gray-700 mb-10">
      The requested page is missing. Check the URL or 
      <Link className="text-primary font-medium hover:text-blue-500 ml-1" to={'/dashboard'}>Return home</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
