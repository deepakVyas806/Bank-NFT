// SubmitButton.tsx
import React from "react";
import Loader from "../../Loader/Loader";

interface SubmitButtonProps {
  isLoading: boolean;
  disabled?: boolean; // Optional disabled prop
  buttonText: string;
  buttonColor?: string; // Optional button color prop
  onClick?: () => void; // Optional onClick function
}

export const SubmitButtonStyle = 'w-full mt-6 text-white text-sm font-semibold py-1.5 rounded-full shadow-md transition duration-200'; 

// Utility function to get hover color
const getHoverColor = (color: string): string => {
  const match = color.match(/(\D+)(\d+)/); // Match base color and numeric value
  if (match) {
    const baseColor = match[1]; // e.g., 'bg-blue-'
    let shade = parseInt(match[2]); // e.g., 500
    shade = Math.min(shade + 100, 900); // Increment by 100 but limit to 900
    return `${baseColor}${shade}`; // Return the new hover color
  }
  return ''; // Default to an empty string if no match
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  disabled,
  buttonText,
  buttonColor = 'bg-blue-500',
  onClick // Receive the onClick function as a prop
}) => {
  // Determine the button type based on the presence of the onClick function
  const buttonType = onClick ? 'button' : 'submit';

  return (
    <button
      type={buttonType} // Change type based on onClick presence
      className={`${SubmitButtonStyle} ${buttonColor} hover:${getHoverColor(buttonColor)}`} // Apply the button color and hover color
      disabled={isLoading || disabled} // Disable if loading or explicitly disabled
      onClick={onClick} // Attach the onClick handler
    >
      {isLoading ? (
        <Loader loading={isLoading} type={"beat"} size={80} color="#ffffff" />
      ) : (
        buttonText
      )}
    </button>
  );
};

export default SubmitButton;
