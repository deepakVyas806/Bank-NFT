import React, { useState } from "react";
import { useSelector } from "react-redux";
// import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import { useMediaQuery } from "react-responsive";
// import { useLocation } from "react-router-dom";
import BottomTabs from "../../Components/BottomTabs/BottomTabs";
import InitialPopup from "../../Components/Modal/InitialPopup";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profileData = useSelector((state: any) => state.user.userProfile);
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  // const location = useLocation(); // Get current location

  // Media query to determine if the device is a tablet or mobile
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1024px)" }); // Adjust breakpoint as needed

  // Function to toggle sidebar visibility on smaller screens
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {isMobileOrTablet ? (
        // Bottom tabs for tablet and mobile
        <div className="flex flex-col w-full">
          <Header toggleSidebar={toggleSidebar} profileData={profileData} />
          <main className="flex-1 overflow-y-auto max-h-[85vh]">
            {children}
          </main>
          <BottomTabs />
        </div>
      ) : (
        // Sidebar drawer for desktop
        <div className="flex flex-row min-h-screen">
          {/* <aside
            className={`fixed inset-y-0 left-0 z-30 bg-gray-800 text-white transition-transform transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:relative lg:translate-x-0 lg:flex lg:flex-col w-64`}
          >
            <Navbar toggleSidebar={toggleSidebar} profileData={profileData} />
          </aside> */}

          <div className="flex-1 flex flex-col w-full">
            <Header toggleSidebar={toggleSidebar} profileData={profileData} />

            <main className="flex-1 overflow-y-auto max-h-[90vh]">
              {children}
            </main>
          </div>

          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
        </div>
      )}
      <InitialPopup
        isOpen={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
      />
    </div>
  );
};

export default MainLayout;

// const BottomTabs: React.FC = () => {

//   const isActive = location.pathname === item.path;
//   return (
//     <div className="fixed bottom-2 left-0 w-full justify-center items-center">
//       <div
//         className="text-sm bg-white text-black shadow-lg border rounded-md flex justify-around py-2 z-50 mx-2"
//         style={{ boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, .03)" }}
//       >
//         <button>Explore</button>
//         <span className="border-r border-r-gray-300 my-1"></span>
//         <button>Earn</button>
//         <span className="border-r border-r-gray-300 my-1"></span>
//         <button>Reserve</button>
//         <span className="border-r border-r-gray-300 my-1"></span>
//         <button>Referral</button>
//         <span className="border-r border-r-gray-300 my-1"></span>
//         <button>My</button>
//       </div>
//     </div>
//   );
// };
