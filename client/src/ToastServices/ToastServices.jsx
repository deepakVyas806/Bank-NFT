// toastService.js
import { toast } from 'react-toastify';

const toastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// General toast function
export const showToast = (message, type = 'info', duration = 3000) => {
  const options = {
    ...toastOptions,
    autoClose: duration,
    className: getToastClass(type),
    progressClassName: getProgressClass(type),
    closeButton: <CloseButton />,
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'warning':
      toast.warn(message, options);
      break;
    default:
      toast.info(message, options);
      break;
  }
};

// Helper function to determine the toast style based on type
const getToastClass = (type) => {
  switch (type) {
    case 'success':
      return 'bg-green-500 text-white';
    case 'error':
      return 'bg-red-500 text-white';
    case 'warning':
      return 'bg-yellow-500 text-white';
    default:
      return 'bg-blue-500 text-white';
  }
};

// Helper function for progress bar style
const getProgressClass = (type) => {
  switch (type) {
    case 'success':
      return 'bg-green-300';
    case 'error':
      return 'bg-red-300';
    case 'warning':
      return 'bg-yellow-300';
    default:
      return 'bg-blue-300';
  }
};

// Custom close button component
const CloseButton = ({ closeToast }) => (
  <button
    className="text-white ml-2 hover:text-gray-300"
    onClick={closeToast}
  >
    ✖
  </button>
);
