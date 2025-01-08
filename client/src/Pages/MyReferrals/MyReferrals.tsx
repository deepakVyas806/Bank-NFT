import React, { useEffect, useRef, useState } from "react";
import PageHeader from "../../Components/Utils/PageHeader";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../../ApiServices/Axios";
import Loader from "../../Components/Loader/Loader";
import { showToast } from "../../ToastServices/ToastServices";
import NoDataAvailable from "../../Components/Utils/NoDataAvailable";

const MyReferrals: React.FC = () => {
  const profileData = useSelector((state: any) => state.user.userProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [referrals, setReferrals] = useState<Array<any>>([]);
  const isMounted = useRef(false); // Tracks if the component has mounted

  const fetchReferrals = async () => {
    try {
    //   const route =
    //     profileData?.user_details?.user?.role?.toLowerCase() === "admin"
    //       ? "allreferrals"
    //       : "userreferrals";
      setIsLoading(true);
      const response = await axiosPrivate.get(`/api/v1/referrals_entry`);
      setReferrals(response.data.payload || []); // Fetch referrals
    } catch (error) {
      console.error("Error fetching referrals:", error);
      showToast("Failed to load referrals", "error", 1000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
    //   setReferrals([
    //     {
    //       userName: "John Doe",
    //       email: "johndoe@gmail.com",
    //       mobile: "9999999999",
    //     },
    //     {
    //       userName: "Jane Smith",
    //       email: "janesmith@gmail.com",
    //       mobile: "8888888888",
    //     },
    //     {
    //       userName: "Alice Brown",
    //       email: "alicebrown@gmail.com",
    //       mobile: "7777777777",
    //     },
    //   ]); // Placeholder referrals
    fetchReferrals()
      isMounted.current = true; // Mark as mounted
    }
  }, [profileData]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader loading={true} type="moon" size={30} color="#000000" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white">
      <PageHeader title="My Referrals" isButton={false} />
      {referrals?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {referrals.map((referral, index) => (
            <ReferralCard key={index} item={referral} />
          ))}
        </div>
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
};

export default MyReferrals;

const ReferralCard: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="flex rounded-lg justify-between border border-gray-200 grow p-2 items-center">
      <div className="flex items-center">        
        <img
          src={"/boy.png"}
          alt={"profile icon"}
          className="w-12 h-12 rounded-full border-2 border-yellow-400 mr-4"
        />
        <div>
          <p className="font-medium text-sm text-black">{item.userName}</p>
          <p className="text-xs text-gray-600">{item.email}</p>
          {/* <p className="text-xs text-gray-600">{item.mobile}</p> */}
        </div>
      </div>
      <div className="text-sm font-medium text-green-700">+ $10</div>
    </div>
  );
};
