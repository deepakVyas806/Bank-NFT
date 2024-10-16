import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { FaMobileAlt } from "react-icons/fa";

interface OTPInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  required?: boolean;
  readOnly?: boolean;
  icon?: React.ReactNode;
  prefix?: string;
  resendOtp?: boolean;
  timer?: number;
  handleSendOtp?: () => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  label,
  name,
  required = false,
  readOnly = false,
  icon = <FaMobileAlt />,
  prefix,
  resendOtp = false,
  timer = 0,
  handleSendOtp,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="text-xs mb-1 text-inputlabel font-normal"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="flex items-center bg-gray-50 border border-inputborder rounded-lg p-2.5">
        {/* Icon */}
        <div className="pr-2 text-gray-500">{icon}</div>

        {/* Prefix (if any) */}
        {prefix && (
          <div className="flex items-center">
            <span className="pr-2 text-blue-500 text-xs font-medium">
              {prefix}
            </span>
          </div>
        )}

        {/* Input Field */}
        <input
          {...field}
          {...props}
          id={name}
          type="text"
          readOnly={readOnly}
          className={`bg-transparent flex-1 focus:outline-none text-inputlabel text-xs font-normal ${
            meta.touched && meta.error ? "border-red-500" : ""
          }`}
          placeholder={props.placeholder || ""}
        />

        {/* Send OTP / Timer */}
        {name === "code" &&
          // <div className="pl-2">
          (!resendOtp ? (
            <button
              type="button"
              onClick={handleSendOtp}
              className="text-blue-500 text-xs font-medium hover:underline focus:outline-none"
            >
              Send
            </button>
          ) : (
            <span className="text-gray-500 text-xs">{`Resend in ${timer}s`}</span>
          ))
          // </div>
        }
      </div>

      {/* Error Message */}
      {meta.touched && meta.error && (
        <p className="text-xs mt-1 text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

export default OTPInput;
