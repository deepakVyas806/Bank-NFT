import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MenuItem {
  name: string;
  path: string;
  icon: string; // Change to string to hold the icon URL
  section?: string;
}

// Update paths to your local icon images
const menuItems: MenuItem[] = [
  { name: 'Dashboard', path: '/profile', icon: '/home_1_line.svg', section: 'MENU' },
  { name: 'Market', path: '/market', icon: '/store_line.svg', section: 'MENU' },
  // { name: 'Welfare', path: '/transactions', icon: '/welfare.png', section: 'MENU' },
  { name: 'News', path: '/new-draw', icon: '/news_line.svg', section: 'MENU' },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Group menu items by their section
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (item.section) {
      if (!acc[item.section]) {
        acc[item.section] = [];
      }
      acc[item.section].push(item);
    }
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <nav className="bg-white text-black p-4 h-full">
      <div className="flex items-center mb-6">
        {/* Company Logo */}
        <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
          Betting App
        </div>
      </div>

      {/* Menu Sections */}
      {Object.entries(groupedMenuItems).map(([section, items]) => (
        <div key={section} className="mb-6">
          {/* Section Title */}
          <h2 className="text-xs text-gray-500 font-semibold uppercase mb-2">{section}</h2>
          <ul className="space-y-2">
            {items.map((item, index) => {
              // Check if the current item is active
              const isActive = location.pathname === item.path;

              return (
                <li key={index} className="flex items-center">
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center font-medium space-x-2 py-2 px-4 hover:bg-gray-100 rounded-md w-full text-left ${
                      isActive ? 'font-semibold text-blue-600 border-l-2 border-blue-400 bg-gray-100' : ''
                    }`}
                  >
                    <img
                      src={item.icon}
                      alt={`${item.name} icon`}
                      className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} // Apply color change to icon
                    />
                    <span className={`text-sm ${isActive ? 'text-blue-600' : ''}`}>
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
