import React, { InputHTMLAttributes, useState } from 'react';
import { useField } from 'formik';
import { FaMobileAlt } from 'react-icons/fa'; // Example icon
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Icons for password visibility toggle

// Label Component
export const InputStyle =
  'bg-transparent flex-1 focus:outline-none text-inputlabel text-xs font-normal';
export const Label: React.FC<{ htmlFor: string; required?: boolean; label?: string }> = ({
  htmlFor,
  required = false,
  label,
}) => {
  if (!label) return null;
  return (
    <label htmlFor={htmlFor} className="text-xs mb-1 text-inputlabel font-normal">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );
};

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  required?: boolean;
  readOnly?: boolean;
  icon?: React.ReactNode;
  prefix?: string;
  isPassword?: boolean; // New prop for password input
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  name,
  required = false,
  readOnly = false,
  icon = <FaMobileAlt />, // Example mobile icon
  prefix = '+91', // Example prefix
  isPassword = false, // Default to false
  ...props
}) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="">
      {/* Label */}
      <Label htmlFor={name} label={label} required={required} />

      {/* Input Wrapper */}
      <div className="flex items-center bg-gray-50 border border-inputborder rounded-lg p-2.5">
        {/* Icon */}
        <div className="pr-2 text-gray-500">{icon}</div>

        {/* Prefix (if any) */}
        {prefix && (
          <div className="flex items-center">
            <span className="pr-2 text-blue-500 text-xs font-medium">{prefix}</span>
          </div>
        )}

        {/* Input Field */}
        <input
          {...field}
          {...props}
          id={name}
          type={isPassword && !showPassword ? 'password' : 'text'}
          readOnly={readOnly}
          className={`bg-transparent flex-1 focus:outline-none text-inputlabel text-xs font-normal ${
            meta.touched && meta.error ? 'border-red-500' : ''
          }`}
          placeholder={props.placeholder || ''}
        />

        {/* Password Visibility Toggle */}
        {isPassword && (
          <div
            className="pl-2 cursor-pointer text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        )}
      </div>

      {/* Error Message */}
      {meta.touched && meta.error && (
        <p className="text-xs mt-1 text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

export default AuthInput;
