import React from "react";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
// import { useSelector } from 'react-redux';

const Profile: React.FC = () => {
  // const user = useSelector((state:any) => state.user);
  // console.log(user.userProfile.user)
  const walletData = [
    { value: "0.00", label: "Recharge Wallet" },
    { value: "0.00", label: "Balance Wallet" },
    { value: "0.00", label: "Total Recharge" },
    { value: "0.00", label: "Balance Income" },
  ];

  const IncomeData = [
    { value: "0.00", label: "Total Income" },
    { value: "0.00", label: "Today's Income" },
    { value: "0.00", label: "Total Withdraw" },
    { value: "0.00", label: "Today's Invite" },
    { value: "0.00", label: "Week Invite" },
    { value: "0.00", label: "Team Commision" },
  ];
  return (
    <div className="bg-white rounded-md shadow-md p-6">
      {/* Profile Card Start */}
      <div
        className="flex flex-col items-center justify-center rounded-md p-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: 'url("/profile-bg.png")' }}
      >
        <img
          src={"/image.jpg"}
          alt={`profile icon`}
          className="w-28 h-28 rounded-full border-3 border-yellow-400"
        />

        <div className="flex items-center mt-1">
          <p className="text-black font-medium text-lg">Deepak Vyas</p>
          <p className="text-xs text-gray-500 font-medium ml-2 mt-0.5 bg-gray-100 py-0.5 px-1 rounded-md">
            VIPO
          </p>
        </div>

        <div className="flex space-x-3">
          <div className="flex items-center text-gray-500 space-x-1 hover:text-blue-500">
            <IoMailOutline size={17} className="mt-1" />
            <p className="text-gray-600 font-normal text-sm hover:text-blue-500 cursor-pointer">
              vyasdeepak608@gmail.com
            </p>
          </div>

          <div className="flex items-center text-gray-500 hover:text-blue-500">
            <MdOutlinePhone size={16} className="mt-0.5" />
            <p className="text-gray-600 font-normal text-sm hover:text-blue-500 cursor-pointer">
              +91 6378506435
            </p>
          </div>
          {/* <p>9166550809</p> */}
        </div>
      </div>
      {/* Profile Card Ends */}

      {/* Wallet and Income Grid Starts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7.5 mt-10">
        <div
          className="flex flex-col rounded-lg border border-gray-200 grow"
          style={{ boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, .03)" }}
        >
          {/* Header */}
          <div className="flex min-h-[56px] justify-between items-center p-2 border-b border-gray-200">
            <p className="text-gray-500 font-medium text-base ml-4">Wallet</p>
          </div>

          {/* Recharge Fields */}
          <div className="flex px-2 lg:px-5 py-1 gap-2 my-3">
            {walletData.map((item, index) => (
              <React.Fragment key={index}>
                <div className="grid grid-cols-1 flex-1">
                  <span className="text-gray-900 text-center text-2xl lg:text-2.5xl font-semibold">
                    {item.value}
                  </span>
                  <span className="text-gray-700 text-center text-sm">
                    {item.label}
                  </span>
                </div>
                {/* Add a vertical border between all except the last item */}
                {index < walletData.length - 1 && (
                  <span className="border-r border-r-gray-300 my-1"></span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Recharge and withdrawal buttons */}

          <div className="flex min-h-[56px] justify-around items-center p-2 border-t border-gray-200">
            <div className="flex items-center cursor-pointer">
              <img src="/credit-card-fill.png" className="w-5 h-5 mr-2 mt-1" />
              <p className="text-gray-500 font-medium text-base hover:text-blue-500">
                Recharge
              </p>
            </div>
            <div className="flex items-center cursor-pointer">
              <img src="/top-up-fill.png" className="w-5 h-5 mr-2 mt-0.5" />
              <p className="text-gray-500 font-medium text-base hover:text-blue-500">
                Withdrawal
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col rounded-lg border border-gray-200 grow"
          style={{ boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, .03)" }}
        >
          {/* Header */}
          <div className="flex min-h-[56px] justify-between items-center p-2 border-b border-gray-200">
            <p className="text-gray-500 font-medium text-base ml-4">Income</p>
          </div>

          <div className="grid grid-cols-3 px-2 lg:px-5 gap-2 my-3">
            {IncomeData.map((item, index) => (
              <React.Fragment key={index}>
                <div className="grid grid-cols-1 flex-1">
                  <span className="text-gray-900 text-center text-xl lg:text-2.5xl font-semibold">
                    {item.value}
                  </span>
                  <span className="text-gray-700 text-center text-sm">
                    {item.label}
                  </span>
                </div>

                {/* Add a horizontal border between the two rows */}
                {index === 2 && (
                  <div className="col-span-3 border-t border-gray-200"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {/* Wallet and Income Grid Ends */}
      <div
        className="flex flex-col rounded-lg border border-gray-200 grow mt-10"
        style={{ boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, .03)" }}
      >
        {/* Header */}
        <div className="flex min-h-[56px] justify-between items-center p-2 border-b border-gray-200">
          <p className="text-gray-500 font-medium text-base ml-4">Services</p>
        </div>

        {/* Services List */}
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
