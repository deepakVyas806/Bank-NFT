import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <ul className="flex justify-between">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
