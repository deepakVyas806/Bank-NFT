import React, { useEffect, useRef, useState } from "react";
import WithdrawalRequestCard from "./WithdrawalRequestCard";
import PageHeader from "../../Components/Utils/PageHeader";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../../ApiServices/Axios";
import Loader from "../../Components/Loader/Loader";
import { showToast } from "../../ToastServices/ToastServices";
import NoDataAvailable from "../../Components/Utils/NoDataAvailable";

const WithdrawalRequests: React.FC = () => {
  const profileData = useSelector((state: any) => state.user.userProfile);
  const [isRequestsLoading, setisRequestsLoading] = useState(false);
  const [requests, setRequests] = useState<Array<any>>([]);
  const isMounted = useRef(false); // Tracks if the component has mounted
  const [isApproveLoading, setISApproveLoading] = useState(false);
  const [isRejectLoading, setISRejectLoading] = useState(false);

  const fetchWithdrawalrequestes = async () => {
    try {
      const route =
        profileData?.user_details?.email == "admin@gmail.com"
          ? "allwithdraw"
          : "userwithdraw";
      setisRequestsLoading(true);
      const response = await axiosPrivate.get(`/api/v1/${route}`);
      setRequests(response.data.payload || []); // Fetch all products
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
      showToast("Failed to load withdrawal requests", "error", 1000);
    } finally {
      setisRequestsLoading(false);
    }
  };
  useEffect(() => {
    if (!isMounted.current) {
      if (profileData) fetchWithdrawalrequestes();
      isMounted.current = true; // Mark as mounted
    }
  }, [profileData]);

  const handleApprove = async (item: any) => {
    try {
      setISApproveLoading(true);
      const params = {
        status: "paid",
        refId: item?.refId,
      };
      const response = await axiosPrivate.patch("api/v1/updateStatus", params);
      console.log(response);
      fetchWithdrawalrequestes();
      showToast("Withdrawal requested Approved successfully.", "success", 1000);
    } catch (error) {
      showToast("Status Update Failed", "error", 1000);
      console.error("Withdraw Error:", error);
    } finally {
      setISApproveLoading(false);
    }
  };

  const handleReject = async (item: any) => {
    try {
      setISRejectLoading(true);
      const params = {
        status: "reject",
        refId: item?._id,
      };
      const response = await axiosPrivate.patch("api/v1/updateStatus", params);
      console.log(response);
      fetchWithdrawalrequestes();
      showToast("Withdrawal requested Rejected successfully.", "success", 1000);
    } catch (error) {
      showToast("Status Update Failed", "error", 1000);
      console.error("Withdraw Error:", error);
    } finally {
      setISRejectLoading(false);
    }
  };
  if (isRequestsLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader loading={true} type="moon" size={30} color="#000000" />
      </div>
    );
  }
  return (
    <div className="p-4 bg-white">
      <PageHeader title="Withdrawal Requests" isButton={false} />
      {requests?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <WithdrawalRequestCard
              key={request.id}
              item={request}
              onApprove={handleApprove}
              onReject={handleReject}
              isAdmin={profileData?.user_details?.email == "admin@gmail.com"}
              isRejectLoading={isRejectLoading}
              isApproveLoading={isApproveLoading}
            />
          ))}
        </div>
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
};

export default WithdrawalRequests;
