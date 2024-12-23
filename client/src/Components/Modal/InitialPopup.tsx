import React from "react";
import Logo from "../Logo/Logo";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { GiDiamondHard } from "react-icons/gi";

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InitialPopup: React.FC<ResponsiveModalProps> = ({ isOpen, onClose }) => {
  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }

  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative bg-white md:rounded-lg shadow-md mx-2 rounded-md
        w-auto h-auto md:h-auto sm:max-w-md sm:max-h-screen md:max-w-lg md:max-h-[80vh] lg:max-w-2xl lg:max-h-[80vh] 
        flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-2 py-1">
          <Logo />
          <img
            src="/close-fill.svg"
            className="text-gray-200 p-1.5 rounded-md cursor-pointer hover:bg-gray-100 h-8 w-8"
            onClick={onClose}
          />
        </div>
        <div
          className="px-2 py-1"
          style={{
            background:
              "linear-gradient(90deg, rgba(153, 188, 237, 0.2), rgba(153, 248, 207, 0.5), rgba(255, 214, 199, 0.5))",
          }}
        >
          <h1 className="text-2xl font-semibold m-2">Notification</h1>
          <div
            className="p-1 rounded-lg my-2"
            style={{
              background:
                "linear-gradient(90deg, rgba(153, 188, 237, 0.2), rgba(153, 248, 207, 0.5), rgba(255, 214, 199, 0.5))",
              padding: "2px", // Adjust for border thickness
            }}
          >
            <div
              className="bg-white rounded-lg"
              style={{
                padding: "10px", // Content padding inside the border
              }}
            >
              <div className="flex space-x-6 text-sm font-medium">
                <p>BankNFT</p>
                <p className="flex space-x-1 items-center">
                  <AiOutlineClockCircle className="mb-0.5" />
                  <span>Limited time</span>
                </p>
                <p className="flex space-x-1 items-center">
                  <GiDiamondHard className="mb-0.5" size={15} />
                  <span>Exclusive</span>
                </p>
              </div>
              <div className="mt-4 text-sm">
                1. Recommend 1 Valid person, the first activision account funds
                reach. The referral will recieve a{" "}
                <span className="font-medium">10% reward</span>.
              </div>
              <div className="mt-4 text-sm">
                2. You will get <span className="font-medium">3% of daily</span>{" "}
                amount on your invested plan.
              </div>
              <div className="mt-4 text-sm">
                3. The bonus will be sent to your "
                <span className="font-medium">BankNFT</span>" account.
              </div>
              <div className="mt-4 text-sm">
                4. Withdrawal requests will be processed and settled within{" "}
                <span className="font-medium">48 hours</span>.
              </div>
              <div className="mt-6 text-sm text-center font-medium">
                Welcome to BankNFT
              </div>
            </div>
          </div>
          {/* Button */}
        </div>
        <div className="flex items-center justify-center mb-2">
          <div
            onClick={onClose}
            className="flex w-40 justify-around shadow-md items-center mt-2 border-t pt-2 pb-2 rounded-md border-gray-200"
            style={{
              background: "linear-gradient(90deg, #5cbffe, #a0f5d0, #ffd7c8)",
            }}
          >
            <div className="inline-flex items-center cursor-pointer">
              <p className="text-gray-800 font-semibold text-sm hover:text-black uppercase flex items-center">
                <span>Get started</span> <FaArrowRight className="ml-2" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialPopup;
