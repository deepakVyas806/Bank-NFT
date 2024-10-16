import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';

const TabsFooter: React.FC = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-white shadow-md p-4 max-w-md">
      <div className="flex justify-around">
        <Link to="/" className="flex flex-col items-center">
          <AiOutlineHome />
          <span>Home</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center">
          <AiOutlineUser />
          <span>Profile</span>
        </Link>
        {/* Add more tabs as needed */}
      </div>
    </footer>
  );
};

export default TabsFooter;
