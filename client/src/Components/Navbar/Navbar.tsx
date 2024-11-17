import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface MenuItem {
  name: string;
  path: string;
  icon: string; // Change to string to hold the icon URL
  section?: string;
  isShow?: boolean;
}

// Update paths to your local icon images

interface NavBarProps {
  toggleSidebar: () => void;
  profileData: any;
}

const Navbar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "/home_1_line.svg",
      section: "MENU",
      isShow: true,
    },
    {
      name: "Market",
      path: "/market",
      icon: "/store_line.svg",
      section: "MENU",
      isShow: true,
    },
    // { name: 'Welfare', path: '/transactions', icon: '/welfare.png', section: 'MENU' },
    {
      name: "Withdrawals",
      path: "/requests",
      icon: "/news_line.svg",
      section: "MENU",
      // isShow: profileData?.user_details?.email == "admin@gmail.com",
      isShow: true,
    },
  ];
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const handleNavigation = (path: string) => {
    navigate(path);
    toggleSidebar();
  };

  // Group menu items by their section
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (item.section && item?.isShow) {
      if (!acc[item.section]) {
        acc[item.section] = [];
      }
      acc[item.section].push(item);
    }
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <nav className="bg-[#0D0E12] text-black p-4 h-full">
      <div className="flex items-center mb-6">
        {/* Company Logo */}
        <div
          className="text-lg text-white font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Betting App
        </div>
      </div>

      {/* Menu Sections */}
      {Object.entries(groupedMenuItems).map(([section, items]) => (
        <div key={section} className="mb-6">
          {/* Section Title */}
          <h2 className="text-xs text-gray-500 font-semibold uppercase mb-2">
            {section}
          </h2>
          <ul className="space-y-2">
            {items.map((item, index) => {
              // Check if the current item is active
              const isActive = location.pathname === item.path;

              return (
                <li key={index} className="flex items-center">
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center font-medium space-x-2 py-2 hover:bg-[#1C1C21] hover:text-white px-4 rounded-md w-full text-left ${
                      isActive ? "font-semibold text-white bg-[#1C1C21]" : ""
                    }`}
                  >
                    <span
                      className={`text-sm font-bold hover:text-white ${
                        isActive ? "text-white" : "text-[#9A9CAE]"
                      }`}
                    >
                      {item.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
