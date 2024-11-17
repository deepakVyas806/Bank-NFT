// src/Components/PageHeader/PageHeader.tsx

import React from "react";
// import { AiOutlinePlus } from "react-icons/ai"; // Import the plus icon

interface PageHeaderProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void; // Function to call on button click
  isButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  buttonText,
  onButtonClick,
  isButton = true,
}) => {
  return (
    <header className="flex items-center justify-between mb-4 pb-1">
      <p className="text-lg font-medium leading-none text-gray-900">{title}</p>
      {isButton && (
        <button
          onClick={onButtonClick}
          className="bg-[#1B84FF] text-white font-medium focus:outline-none hover:shadow-lg text-xs px-2 md:px-2.5 py-1.5 md:py-2 rounded-md flex items-center"
        >
          {/* Show + icon on small screens and full text on larger screens */}
          {/* <span className="block sm:hidden"> */}
          <span className="">
            <img src="/add-white.svg" className="w-3.5 h-3.5 mt-0.5 mr-2"/>
          </span>
          {/* <span className="hidden sm:block">{buttonText}</span> */}
          <span className="">{buttonText}</span>
        </button>
      )}
    </header>
  );
};

export default PageHeader;
