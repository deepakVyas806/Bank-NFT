// import React from "react";

const Logo = () => {
  return (
    <span className="flex items-center">
      {/* Animated GIF */}
      <img 
        src="/logo.gif" 
        alt="Logo Animation" 
        className="h-12 w-12 -mr-1.5" 
      />
      
      {/* Logo Name */}
      <img 
        src="/logoName.png" 
        alt="Logo Name" 
        className="h-5 w-full -mr-1" 
      />
    </span>
  );
};

export default Logo;
