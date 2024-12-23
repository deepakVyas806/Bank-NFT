import React from "react";
import {
  FaInstagramSquare,
  FaTelegram,
} from "react-icons/fa";
// import NoDataAvailable from "../../Components/Utils/NoDataAvailable";

const Dashboard: React.FC = () => {
  // return <><NoDataAvailable /></>;
  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-10 py-20 px-8 md:px-32"
        style={{
          background:
            "linear-gradient(90deg, rgba(153, 188, 237, 0.2), rgba(153, 248, 207, 0.5), rgba(255, 214, 199, 0.5))",
        }}
      >
        {/* Main Content - Takes 2/4 width */}
        <div className="md:col-span-2">
          <p className="text-3xl font-bold text-black uppercase">
            Explore, Discover and Earn Big with one of the top Web3 NFT
            Marketplaces in the world
          </p>
        </div>

        {/* Secondary Content 1 - Takes 1/4 width */}
        <div className="md:col-span-1 space-y-2">
          <div className="flex space-x-2">
            <img src="/dashboard1.png" height={25} width={25} />
            <p className="text-xl text-black font-semibold">Multi - Reward</p>
          </div>
          <p className="text-sm text-gray-800 font-medium">
            Bank NFT leverages a proprietary AI-powered algorithmic trading
            model, and provides a dual earnings mechanism with trading rewards
            as well as referral rewards.
          </p>
        </div>

        {/* Secondary Content 2 - Takes 1/4 width */}
        <div className="md:col-span-1 space-y-2">
          <div className="flex space-x-2">
            <img src="/dashboard2.png" height={25} width={25} />
            <p className="text-xl text-black font-semibold">
              Earn Future Value
            </p>
          </div>
          <p className="text-sm text-gray-800 font-medium">
            Bank NFT reduces the entry hurdles of the NFT market and expands the
            boundaries of the NFT collection & trading through its innovative AI
            algorithmic trading process and rewarding financial model.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-8 py-12 md:px-32 md:py-24 items-center">
        {/* Image Section */}
        <img
          src="/dashboardBanner.png"
          height={500}
          width={500}
          alt="Dashboard Banner"
          className="justify-self-center sm:justify-self-start"
        />

        {/* Text Section */}
        <div>
          <p className="text-3xl font-bold text-black uppercase">
            RESERVE AND SELL YOUR NFT EASILY
          </p>
          <p className="text-xl text-gray-400 font-medium mt-4">
            Earning income in Bank NFT is simple: just RESERVE and then TRADE to
            EARN
          </p>
        </div>
      </div>
      <div
        className="flex justify-evenly items-center py-6 px-8 md:px-32"
        style={{
          background:
            "linear-gradient(90deg, rgba(153, 188, 237, 0.2), rgba(153, 248, 207, 0.5), rgba(255, 214, 199, 0.5))",
        }}
      >
        <p className="text-sm font-medium">Bank NFT</p>
        <div className="flex space-x-4">
          <p className="text-sm font-medium">Follow us on:</p>
          <FaTelegram size={20} className="cursor-pointer" />
          <FaInstagramSquare size={20} className="cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
