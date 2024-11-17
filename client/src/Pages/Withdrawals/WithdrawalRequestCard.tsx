import React from "react";
// import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";
import { FaCheck, FaTimes } from "react-icons/fa";
// import { FiMoreVertical } from "react-icons/fi";

interface WithdrawalRequestProps {
  item: any;
  onApprove: any;
  onReject: any;
}

const WithdrawalRequestCard: React.FC<WithdrawalRequestProps> = ({
  item,
  onApprove,
  onReject,
}) => {
  const { id, amount, accountNumber, bankName, upiId, status } = item;
  // const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 grow p-4">
      {/* <div className="flex justify-between"> */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Ref. Id: <span className="text-black">#{id}</span>
            </h3>
            <span
              className={`ml-1 ${
                status === "Approved"
                  ? "text-green-500 bg-green-100 border-green-100"
                  : status === "Rejected"
                  ? "text-red-500 bg-red-100 border-red-100"
                  : "text-yellow-500 bg-yellow-100 border-yellow-100"
              } inline-flex items-center justify-center rounded-md px-2 text-[10px] font-medium border`}
            >
              {status}
            </span>
          </div>

          <p className="text-gray-500 font-medium dark:text-gray-400 text-sm">
            Amount:{" "}
            <span className="font-medium text-black text-sm">{amount}</span>
          </p>
        </div>
        {status != "Approved" && (
          <div className="flex items-center space-x-2">
            <div
              className="bg-red-400 rounded-md p-1 shadow-md cursor-pointer"
              onClick={onReject}
            >
              <FaTimes color="white" size={15} />
            </div>
            <div
              className="bg-green-400 rounded-md p-1 shadow-md cursor-pointer"
              onClick={onApprove}
            >
              <FaCheck color="white" size={15} />
            </div>
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
      <div
        className="border-b mt-4 text-sm font-medium text-gray-500"
        style={{ borderColor: "rgba(128,128,128,0.2)" }}
      >
        Bank details{" "}
        <span className="ml-1 text-xs text-black font-medium">
          ({bankName})
        </span>
      </div>
      <div className="mt-0 grid grid-cols-2">
        {/* <p className="text-gray-500 dark:text-gray-400"> */}
        {/* <span className="font-medium text-sm text-black">{bankName}</span> */}
        {/* </p> */}
        {/* <p className="text-gray-500 dark:text-gray-400"> */}
        {/* <span className="font-medium text-sm ">{"Deepak Vyas"}</span> */}
        <div className="mt-2">
          <p className="text-xs text-gray-500 font-medium">Account Number:</p>
          <p className="font-medium text-sm ">{accountNumber}</p>
        </div>
        {/* </p> */}
        <div className="mt-2">
          <p className="text-xs text-gray-500 font-medium">
            Account Holder's Name:
          </p>
          <p className="font-medium text-sm ">{"Deepak Vyas"}</p>
        </div>

        <div className="mt-2">
          <p className="text-xs text-gray-500 font-medium">IFSC Code:</p>
          <p className="font-medium text-sm ">{"INDB0001851"}</p>
        </div>

        <div className="mt-2">
          <p className="text-xs text-gray-500 font-medium">Upi Id:</p>
          <p className="font-medium text-sm ">{upiId}</p>
        </div>
      </div>
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
