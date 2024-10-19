import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa"; // Import an icon for the profile

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility on smaller screens
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Visible permanently on desktop, togglable on smaller screens */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 bg-gray-800 text-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:flex lg:flex-col w-64`}
      >
        {/* Sidebar content */}
        <Navbar />
      </aside>

      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <header className="bg-white shadow-md flex items-center justify-between lg:justify-end px-4 py-2 lg:py-2">
          <button className="text-gray-800 lg:hidden" onClick={toggleSidebar}>
            <AiOutlineMenu size={28} />
          </button>

          {/* Profile Icon */}
          {/* <div className="flex items-center space-x-4">
            <FaUserCircle size={32} className="text-gray-800 cursor-pointer" />
          </div> */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">vyasdeepak608@gmail.com</p>
              <p className="text-xs font-normal text-gray-500">6378506435</p>
            </div>
            <img
              src={"/image.jpg"}
              alt={`profile icon`}
              className={`w-10 h-10 rounded-full`} // Apply color change to icon
            />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4">{children}</main>
      </div>

      {/* Overlay for sidebar on smaller screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default MainLayout;
