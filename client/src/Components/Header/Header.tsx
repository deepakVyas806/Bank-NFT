import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import ClickOutside from "../Utils/ClickOutside";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../redux/actions/userProfileActions";
import { useMediaQuery } from "react-responsive";
import Logo from "../Logo/Logo";

interface HeaderProps {
  toggleSidebar: () => void;
  profileData: any;
}

const Header: React.FC<HeaderProps> = ({ profileData }) => {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1024px)" }); // Adjust breakpoint as needed
  const location = useLocation();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  // List of navigation items
  const navItems = [
    { label: "Explore", path: "/market" },
    { label: "Withdrawal Requests", path: "/requests" },
    { label: "Earn Money", path: "/reserve" },
    { label: "Referral", path: "/referAndEarn" },
  ];

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const onLogoutClicked = () => {
    setIsProfileMenuOpen(false);
    Cookies.remove("ACCESS_TOKEN");
    Cookies.remove("REFRESH_TOKEN");
    dispatch(setUserProfile(null));
    navigation("/login");
  };

  const navigateTo = (path: string) => {
    navigation(path);
  };

  return (
    <header
      className={`bg-white flex border-b border-gray-200 rounded-md items-center ${
        isMobileOrTablet ? "justify-between" : "justify-between"
      } px-4 py-2 lg:py-2`}
    >
      <div className="flex space-x-10">
        <p
          className="text-black font-semibold text-lg cursor-pointer"
          onClick={() => {
            navigation("/dashboard");
          }}
        >
          <Logo />
        </p>
        {!isMobileOrTablet && (
          <div className="flex space-x-4 items-center">
            {navItems.map((item, index) => (
              <p
                key={index}
                onClick={() => navigateTo(item.path)}
                className={`text-sm px-1.5 py-0.5 rounded-md text-black font-medium cursor-pointer hover:text-black ${
                  location.pathname === item.path
                    ? "text-black"
                    : "text-gray-600"
                }`}
                style={{
                  background:
                    location.pathname === item.path
                      ? "linear-gradient(90deg, #5cbffe, #a0f5d0, #ffd7c8)"
                      : "",
                }}
              >
                {item.label}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="relative">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleProfileMenu}
        >
          {!isMobileOrTablet && (
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">
                {profileData?.user_details?.email}
              </p>
              <p className="text-xs font-normal text-gray-500">
                +91 {profileData?.user_details?.phone}
              </p>
            </div>
          )}
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
                    setIsProfileMenuOpen(false);
                    navigateTo("/profile");
                  }}
                >
                  <FaUserCircle className="mr-2" />
                  My Profile
                </li>
                <li
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={onLogoutClicked}
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
