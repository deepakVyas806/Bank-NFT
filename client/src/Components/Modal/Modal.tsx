import React, { ReactNode, useEffect } from "react";
import Loader from "../Loader/Loader";

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  onSubmit: () => void;
  loading: boolean;
  submitButtonText?:string
}

const Modal: React.FC<ResponsiveModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  onSubmit,
  loading = false,
  submitButtonText='Submit'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative bg-white md:rounded-lg shadow-md 
        w-full h-full md:h-auto sm:max-w-md sm:max-h-screen md:max-w-lg md:max-h-[80vh] lg:max-w-2xl lg:max-h-[80vh] 
        flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex min-h-[56px] justify-between items-center p-2 border-b border-gray-200">
          <p className="text-gray-500 font-medium text-base ml-4">{title}</p>
          <img
            src="/close-fill.svg"
            className="text-gray-200 p-1.5 rounded-md cursor-pointer hover:bg-gray-100 h-8 w-8"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pl-6 pr-4 py-4">{children}</div>

        {/* Footer */}
        <div className="flex min-h-[56px] justify-end gap-4 items-center p-2 border-t border-gray-200">
          <button
            onClick={onClose}
            className="text-gray-700 uppercase border border-gray-300 hover:shadow-lg font-medium text-xs px-2.5 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
           style={{
            background: "linear-gradient(90deg, #5cbffe, #a0f5d0, #ffd7c8)",
          }}
            onClick={onSubmit}
            className="bg-[#1B84FF] text-gray-800 uppercase font-medium hover:shadow-lg text-xs px-2.5 py-2 rounded-md"
          >
            {loading ? (
              <Loader
                loading={loading}
                type={"beat"}
                size={50}
                color="#000000"
              />
            ) : (
              submitButtonText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
