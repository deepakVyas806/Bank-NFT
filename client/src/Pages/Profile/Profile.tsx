import React, { useEffect, useRef, useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import PayUsingRazorpar from "../../GlobalFunctions/PayUsingRazorpay";
import { showToast } from "../../ToastServices/ToastServices";
import { axiosPrivate } from "../../ApiServices/Axios";
import Modal from "../../Components/Modal/Modal";
import AddRechargeAmount from "./AddRechargeAmount";
import Loader from "../../Components/Loader/Loader";
import WithdrawAmount from "./WithdrawAmount";
import { FormikProps } from "formik";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../redux/actions/userProfileActions";
import { AiFillProduct } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const formikRef = useRef<FormikProps<any>>(null);
  const navigation = useNavigate()

  // State for wallet data to be displayed in UI
  const [walletData, setWalletData] = useState([
    { value: "0.00", label: "Total Recharge Balance" },
    { value: "0.00", label: "Total Income" },
    { value: "0.00", label: "Withdrawable Amount" },
    // { value: "0.00", label: "Total Withdrawal" },
  ]);

  const [rechargeLoading, setRechargeLoading] = useState(false); // Loader for payment
  const [withdrawLoading, setWithdrawLoading] = useState(false); // Loader for payment
  const [profileData, setProfileData] = useState(null);
  const [isRechargeModal, setIsRechargeModal] = useState(false);
  const [isWithdrawModal, setIsWithdrawModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState(100);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const dispatch = useDispatch();
  const fetchProfileData = async () => {
    setIsProfileLoading(true);
    try {
      const response = await axiosPrivate.post("api/v1/profile");
      setProfileData(response?.data?.payload);
      dispatch(setUserProfile(response?.data?.payload));

      // Update walletData with the values received from the API
      setWalletData((prevData) => [
        {
          ...prevData[0],
          value:
            isNaN(Number(response?.data?.payload?.wallet_balance)) ||
            Number(response?.data?.payload?.wallet_balance) === 0
              ? "0.00"
              : Number(response?.data?.payload?.wallet_balance).toFixed(2),
        },
        {
          ...prevData[1],
          value:
            isNaN(Number(response?.data?.payload?.total_income)) ||
            Number(response?.data?.payload?.total_income) === 0
              ? "0.00"
              : Number(response?.data?.payload?.total_income).toFixed(2),
        },
        // {
        //   ...prevData[2],
        //   value:
        //     isNaN(Number(response?.data?.payload?.total_withdrawal)) ||
        //     Number(response?.data?.payload?.total_withdrawal) === 0
        //       ? "0.00"
        //       : Number(response?.data?.payload?.total_withdrawal).toFixed(2),
        // },
        {
          ...prevData[2],
          value:
            isNaN(Number(response?.data?.payload?.withdrawal_balance)) ||
            Number(response?.data?.payload?.withdrawal_balance) === 0
              ? "0.00"
              : Number(response?.data?.payload?.withdrawal_balance).toFixed(2),
        },
      ]);

      // showToast("Data fetched successfully", "success", 1000);
    } catch (error: any) {
      console.log(error);
      showToast(error?.response?.data?.message, "error", 1000);
    } finally {
      setIsProfileLoading(false);
    }
  };

  useEffect(() => {
    console.log(profileData);
    fetchProfileData();
  }, []);

  const RechargeButtonClicked = async () => {
    try {
      setRechargeLoading(true);
      const rechargeDetails: any = {
        amount: rechargeAmount,
      };
      const response = await axiosPrivate.post(
        "api/v1/recharge_wallet",
        rechargeDetails
      );
      const rechargeOrder = response.data.payload;
      await PayUsingRazorpar(rechargeOrder, fetchProfileData);
      console.log("after razorpay success");
      // fetchProfileData();
    } catch (error) {
      console.error("Purchase Error:", error);
    } finally {
      setRechargeLoading(false);
      setIsRechargeModal(false);
    }
  };

  const handleWithdraw = () => {
    setWithdrawLoading(false);
    if (formikRef.current) {
      formikRef.current.submitForm();
      // createProduct(formikRef.current.values, formikRef.current.setSubmitting);
    }
  };

  const WithdrawAmountFunc = async (values: any, setSubmitting: any) => {
    try {
      setWithdrawLoading(true);
      const params = {
        amount: values.amount,
        accountHolderName: values.accountHolderName,
        accountNumber: values.accountNumber,
        bankName: values.bankName,
        ifscCode: values.ifscCode,
      };
      // Appending values to FormData object

      const response = await axiosPrivate.post("api/v1/withdraw-amount", params);
      console.log(response);
      setSubmitting(false);
    } catch (error) {
      console.error("Withdraw Error:", error);
    } finally {
      setWithdrawLoading(false);
      setIsWithdrawModal(false);
    }
  };

  if (isProfileLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader loading={true} type="moon" size={30} color="#000000" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6">
      {/* Profile Card Start */}
      <div
        className="flex flex-col items-center justify-center rounded-md p-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: 'url("/profile-bg.png")' }}
      >
        <img
          src={"/image.jpg"}
          alt={"profile icon"}
          className="w-28 h-28 rounded-full border-2 border-yellow-400"
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
        </div>
      </div>
      {/* Profile Card Ends */}

      {/* Wallet and Income Grid Starts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7.5 mt-10">
        <div
          className="flex flex-col rounded-lg border border-gray-200 grow"
          style={{ boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, .03)" }}
        >
          <div className="flex min-h-[56px] justify-between items-center p-2 border-b border-gray-200">
            <p className="text-gray-500 font-medium text-base ml-4">Wallet</p>
          </div>

          <div className="flex px-2 lg:px-5 py-1 gap-2 my-3">
            {walletData.map((item, index) => (
              <React.Fragment key={index}>
                <div className="grid grid-cols-1 flex-1">
                  <span className="text-gray-900 text-center text-xl lg:text-xl font-semibold">
                    ₹{item.value}
                  </span>
                  <span className="text-gray-700 text-center text-sm">
                    {item.label}
                  </span>
                </div>
                {index < walletData.length - 1 && (
                  <span className="border-r border-r-gray-300 my-1"></span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex min-h-[56px] justify-around items-center p-2 border-t border-gray-200">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setIsRechargeModal(true)}
            >
              <img src="/credit-card-fill.png" className="w-5 h-5 mr-2 mt-1" />
              <p className="text-gray-500 font-medium text-base hover:text-blue-500">
                Recharge
              </p>
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setIsWithdrawModal(true)}
            >
              <img src="/top-up-fill.png" className="w-5 h-5 mr-2 mt-0.5" />
              <p className="text-gray-500 font-medium text-base hover:text-blue-500">
                Withdraw
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col rounded-lg border border-gray-200 grow"
          style={{ boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, .03)" }}
        >
          <div className="flex min-h-[56px] justify-between items-center p-2 border-b border-gray-200">
            <p className="text-gray-500 font-medium text-base ml-4">Services</p>
          </div>
          <div className="p-2 px-4">
            <div onClick={()=>{navigation('/market')}} className="cursor-pointer flex flex-col items-center justify-center rounded-xl w-20 h-20">
              {/* Icon */}
              <div className="flex items-center justify-center text-blue-600">
                <AiFillProduct size={25} />
              </div>

              {/* Text */}
              <p className="text-blue-600 text-xs font-medium mt-1">
                My Products
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Wallet and Income Grid Ends */}

      {/* Add Recharge Popup */}
      <Modal
        title="Add Amount"
        isOpen={isRechargeModal}
        onClose={() => setIsRechargeModal(false)}
        onSubmit={RechargeButtonClicked}
        loading={rechargeLoading}
        submitButtonText="Recharge"
      >
        <AddRechargeAmount
          rechargeAmount={rechargeAmount}
          setRechargeAmount={setRechargeAmount}
        />
      </Modal>
      {/* Add Recharge Popup */}

      {/* Withdraw Amount Modal */}

      {/* Withdraw Modal */}
      <Modal
        title="Withdraw Amount"
        isOpen={isWithdrawModal}
        onClose={() => setIsWithdrawModal(false)}
        onSubmit={() => handleWithdraw()}
        loading={withdrawLoading}
        submitButtonText="Withdraw"
      >
        <WithdrawAmount onSubmit={WithdrawAmountFunc} formikRef={formikRef} />
      </Modal>
      {/* Withdraw Amount modal */}
    </div>
  );
};

export default Profile;
