import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSetting, AiOutlineUser, AiOutlineWallet } from 'react-icons/ai';

const TabsFooter: React.FC = () => {
  return (
    // <footer className="fixed bottom-0 w-full bg-white shadow-md p-4 max-w-md">
     <div className="fixed bottom-0 w-full bg-white shadow-md p-3 max-w-md">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <Link to="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <AiOutlineHome className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Home</span>
        </Link>
        <Link to="/wallet" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <AiOutlineWallet className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Wallet</span>
        </Link>
        <Link to="/settings" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <AiOutlineSetting className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Settings</span>
        </Link>
        <Link to="/profile" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <AiOutlineUser className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Profile</span>
        </Link>
      </div>
    </div>
    // </footer>
  );
};

export default TabsFooter;
