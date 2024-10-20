import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import ClickOutside from "../Utils/ClickOutside";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Function to toggle the profile menu
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const navigation = useNavigate();

  const onLogoutClicked = () => {
    setIsProfileMenuOpen(false);
    Cookies.remove('ACCESS_TOKEN')
    Cookies.remove('REFRESH_TOKEN')
    navigation("/login");
  };

  return (
    <header className="bg-white shadow-md flex border-b border-gray-200 rounded-md items-center justify-between lg:justify-end px-4 py-2 lg:py-2">
      <button className="text-gray-800 lg:hidden" onClick={toggleSidebar}>
        <AiOutlineMenu size={28} />
      </button>

      {/* Profile Section */}
      <div className="relative">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleProfileMenu}
        >
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">
              vyasdeepak608@gmail.com
            </p>
            <p className="text-xs font-normal text-gray-500">6378506435</p>
          </div>
          <img
            src={"/image.jpg"}
            alt={`profile icon`}
            className={`w-10 h-10 rounded-full`}
          />
        </div>

        {/* Profile Menu Popup */}
        {isProfileMenuOpen && (
          <ClickOutside onClickOutside={() => setIsProfileMenuOpen(false)}>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-50">
              <ul className="py-1">
                <li
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    // Handle 'My Profile' click
                    setIsProfileMenuOpen(false);
                    navigation('/profile')
                    console.log("My Profile clicked");
                  }}
                >
                  <FaUserCircle className="mr-2" />
                  My Profile
                </li>
                <li
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    // Handle 'Logout' click
                    onLogoutClicked();
                  }}
                >
                  <MdLogout className="mr-2" />
                  Logout
                </li>
              </ul>
            </div>
          </ClickOutside>
        )}
      </div>
    </header>
  );
};

export default Header;
