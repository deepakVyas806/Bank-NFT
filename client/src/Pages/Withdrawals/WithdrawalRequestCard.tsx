import React from "react";
// import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";
import { FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../Components/Loader/Loader";
import { useMediaQuery } from "react-responsive";
// import { FiMoreVertical } from "react-icons/fi";

interface WithdrawalRequestProps {
  item: any;
  onApprove: any;
  onReject: any;
  isAdmin: boolean;
  isApproveLoading?: boolean;
  isRejectLoading?: boolean;
}

const WithdrawalRequestCard: React.FC<WithdrawalRequestProps> = ({
  item,
  onApprove,
  onReject,
  isAdmin,
  isApproveLoading,
  isRejectLoading,
}) => {
  const { _id, amount, USDTWalletAddress, status } = item;
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  // const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 grow p-4">
      {/* <div className="flex justify-between"> */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Ref. Id: <span className="text-black text-xs">#{_id}</span>
            </h3>
            <span
              className={`ml-1 ${
                status === "paid"
                  ? "text-green-500 bg-green-100 border-green-100"
                  : status === "reject"
                  ? "text-red-500 bg-red-100 border-red-100"
                  : "text-yellow-500 bg-yellow-100 border-yellow-100"
              } inline-flex items-center justify-center rounded-md px-2 text-[10px] font-medium border`}
            >
              {status?.toUpperCase()}
            </span>
          </div>

          <p className="text-gray-500 font-medium dark:text-gray-400 text-sm">
            Amount:{" "}
            <span className="font-medium text-black text-sm">${amount}</span>
          </p>
        </div>
        {status?.toLowerCase() == "process" && isAdmin && !isMobileOrTablet && (
          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled={isRejectLoading}
              className="bg-red-400 rounded-md p-1 shadow-md cursor-pointer"
              onClick={() => onReject(item)}
            >
              {isRejectLoading ? (
                <Loader
                  loading={isRejectLoading}
                  type="scale"
                  size={12}
                  color="#ffffff"
                />
              ) : (
                <FaTimes color="white" size={15} />
              )}
            </button>
            <button
              type="button"
              disabled={isApproveLoading}
              className="bg-green-400 rounded-md p-1 shadow-md cursor-pointer"
              onClick={() => onApprove(item)}
            >
              {isApproveLoading ? (
                <Loader
                  loading={isApproveLoading}
                  type="scale"
                  size={12}
                  color="#ffffff"
                />
              ) : (
                <FaCheck color="white" size={15} />
              )}
            </button>
          </div>
        )}
      </div>
      {/* <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <FiMoreVertical size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-5 top-1 w-24 bg-white shadow-lg rounded-md border dark:bg-gray-700">
              <button
                onClick={() => {
                  onApprove(id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  onReject(id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Reject
              </button>
            </div>
          )}
        </div> */}
      {/* </div> */}

      {/* Wallet Details */}
      <div
        className="border-b mt-4 text-sm font-medium text-gray-500"
        style={{ borderColor: "rgba(128,128,128,0.2)" }}
      >
        Wallet details{" "}
        <span className="ml-1 text-xs text-black font-medium">
          [USDT (TRC20)]
        </span>
      </div>
      <div className="mt-0 grid grid-cols-2">
        {/* <p className="text-gray-500 dark:text-gray-400"> */}
        {/* <span className="font-medium text-sm text-black">{bankName}</span> */}
        {/* </p> */}
        {/* <p className="text-gray-500 dark:text-gray-400"> */}
        {/* <span className="font-medium text-sm ">{"Deepak Vyas"}</span> */}
        <div className="mt-2">
          <p className="text-xs text-gray-500 font-medium">
            USDT Wallet Address:
          </p>
          <p className="font-medium text-xs">{USDTWalletAddress}</p>
        </div>
        {/* </p> */}
        {/* <div className="mt-2">
          <p className="text-xs text-gray-500 font-medium">
            Account Holder's Name:
          </p>
          <p className="font-medium text-sm ">{"Deepak Vyas"}</p>
        </div>

        <div className="mt-2">
          <p className="text-xs text-gray-500 font-medium">IFSC Code:</p>
          <p className="font-medium text-sm ">{ifsc_code}</p>
        </div>

        <div className="mt-2">
          <p className="text-xs text-gray-500 font-medium">Upi Id:</p>
          <p className="font-medium text-sm ">{upi_id}</p>
        </div> */}
      </div>
      {status?.toLowerCase() == "process" && isAdmin && isMobileOrTablet && (
        <div className="flex items-center space-x-2 mt-4 justify-end">
          <button
            type="button"
            disabled={isRejectLoading}
            className="bg-red-400 rounded-md p-1 shadow-md cursor-pointer"
            onClick={() => onReject(item)}
          >
            {isRejectLoading ? (
              <Loader
                loading={isRejectLoading}
                type="scale"
                size={12}
                color="#ffffff"
              />
            ) : (
              <div className="flex items-center space-x-2 px-1">
                <span className="text-xs text-white font-medium">Reject</span>{" "}
                <FaTimes color="white" size={12} />
              </div>
            )}
          </button>
          <button
            type="button"
            disabled={isApproveLoading}
            className="bg-green-400 rounded-md p-1 shadow-md cursor-pointer"
            onClick={() => onApprove(item)}
          >
            {isApproveLoading ? (
              <Loader
                loading={isApproveLoading}
                type="scale"
                size={12}
                color="#ffffff"
              />
            ) : (
              <div className="flex items-center space-x-2 px-1">
                <span className="text-xs text-white font-medium">Approve</span>{" "}
                <FaCheck color="white" size={12} />
              </div>
            )}
          </button>
        </div>
      )}

      {/* Bank details for bank details */}
      {/* <div
        className="border-b mt-4 text-sm font-medium text-gray-500"
        style={{ borderColor: "rgba(128,128,128,0.2)" }}
      >
        Bank details{" "}
        <span className="ml-1 text-xs text-black font-medium">
          ({bank_name})
        </span>
      </div>
      <div className="mt-0 grid grid-cols-2">
        <div className="mt-2">
          <p className="text-xs text-gray-500 font-medium">Account Number:</p>
          <p className="font-medium text-sm ">{account_no}</p>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500 font-medium">
            Account Holder's Name:
          </p>
          <p className="font-medium text-sm ">{"Deepak Vyas"}</p>
        </div>

        <div className="mt-2">
          <p className="text-xs text-gray-500 font-medium">IFSC Code:</p>
          <p className="font-medium text-sm ">{ifsc_code}</p>
        </div>

        <div className="mt-2">
          <p className="text-xs text-gray-500 font-medium">Upi Id:</p>
          <p className="font-medium text-sm ">{upi_id}</p>
        </div>
      </div> */}
      {/* <div className="mt-4">
        <p
          className={`text-sm font-semibold ${
            status === "Approved"
              ? "text-green-500"
              : status === "Rejected"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          Status: {status}
        </p>
      </div> */}
    </div>
  );
};

export default WithdrawalRequestCard;
