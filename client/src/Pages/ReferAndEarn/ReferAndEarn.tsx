import React, { useState } from "react";
import { FaCopy, FaRegCopy } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import SocialShare from "../../Components/SocialShare/SocialShare";
import { QRCodeSVG } from "qrcode.react";
import { useSelector } from "react-redux";

const ReferAndEarn: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" }); // Adjust breakpoint as needed
  const ShareURL = "https://www.banknft.site/signUp";
  const profileData = useSelector((state: any) => state.user.userProfile); // Fetch user profile from Redux store
  const ReferralCode = profileData?.user_details?.user?.selfReferral;
  const [isReferalCodeCopied, setIsReferalCodeCopied] = useState(false);
  const [isReferalLinkCopied, setIsReferalLinkCopied] = useState(false);

  return (
    <div
      className="px-4 py-2 h-full"
      style={{
        background: "linear-gradient(#F9FCFF, #F9FFFD, #ffffff)",
        // background: "linear-gradient(#EAF7FF, #EFFFF7, #FFF5F0)",
      }}
    >
      {/* Profile Section */}
      <div
        className="flex flex-col justify-center rounded-md p-6 bg-center bg-cover bg-no-repeat w-full"
        style={{ backgroundImage: 'url("/profile-bg.png")' }}
      >
        {/* Profile Image */}
        {/* Refer and Earn Content */}
        {/* <div className="mt-10 w-full max-w-lg bg-white shadow-lg rounded-lg p-6"> */}
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className={`${isMobile ? "mt-6" : "mr-20"}`}>
            <h2
              className={`${
                isMobile ? "text-2xl" : "text-4xl"
              } font-normal text-gray-800`}
            >
              Invite Friends, Earn Rewards!
            </h2>
            <p
              className={`text-gray-600 mt-2 ${
                isMobile ? "text-sm" : "text-lg"
              }`}
            >
              Share your referral link with friends and earn exclusive rewards
              when they join. Start sharing and watch your rewards grow!
            </p>

            {/* Referral Code */}
            <div
              className={`flex flex-col md:flex-row items-center mt-6 ${
                isMobile ? "" : "space-x-4"
              }`}
            >
              <div>
                {isMobile && (
                  <p className="text-center text-xs font-medium text-gray-600 mb-2">
                    Copy link address
                    {/* Copy Referral Code */}
                  </p>
                )}
                <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                  <span className="text-gray-800 font-medium text-sm">
                    {ShareURL + `?referral=${ReferralCode}`}
                    {/* {ReferralCode} */}
                  </span>
                  <button
                    className="ml-10"
                    // className="bg-blue-500 text-white text-sm py-1 px-4 rounded-md hover:bg-blue-600 transition"
                    onClick={() => {
                      setIsReferalLinkCopied(true);
                      navigator.clipboard.writeText(
                        ShareURL + `?referral=${ReferralCode}`
                      );
                      setTimeout(() => {
                        setIsReferalLinkCopied(false);
                      }, 2000);
                    }}
                  >
                    {isReferalLinkCopied ? (
                      <FaCopy size={15} className="mt-0.5" />
                    ) : (
                      <FaRegCopy size={15} className="mt-0.5" />
                    )}
                  </button>
                </div>
              </div>
              <SocialShare shareUrl={ShareURL} />
            </div>
          </div>
          <img src="/refer-and-earn.png" width={250} height={250} />
        </div>
        {/* Share Buttons */}
        {/* <div className="mt-6 flex justify-around">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Share on Facebook
          </button>
          <button className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition">
            Share on Twitter
          </button>
        </div> */}
      </div>
      <div
        className={`flex flex-col justify-center items-center mb-4 ${
          isMobile ? "mt-2" : "mt-6"
        }`}
      >
        <p className="text-xs font-medium text-gray-600 mb-2">
          Scan and Share!
        </p>
        <QRCodeSVG value={ShareURL + `?referal=${ReferralCode}`} size={150} />
        <p className="text-sm font-normal text-gray-600 mt-4 mb-1">
          Or You can use this Referral code to Share!
        </p>
        <div className="flex items-center space-x-2">
          <p className="text-base font-medium text-black">{ReferralCode}</p>
          <button
            className="ml-2"
            // className="bg-blue-500 text-white text-sm py-1 px-4 rounded-md hover:bg-blue-600 transition"
            onClick={() => {
              setIsReferalCodeCopied(true);
              navigator.clipboard.writeText(ReferralCode);
              setTimeout(() => {
                setIsReferalCodeCopied(false);
              }, 2000);
            }}
          >
            {isReferalCodeCopied ? (
              <FaCopy size={15} className="mt-0.5" />
            ) : (
              <FaRegCopy size={15} className="mt-0.5" />
            )}
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ReferAndEarn;
