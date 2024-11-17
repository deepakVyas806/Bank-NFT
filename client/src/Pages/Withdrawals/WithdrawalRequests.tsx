import React, { useState } from "react";
import WithdrawalRequestCard from "./WithdrawalRequestCard";
import PageHeader from "../../Components/Utils/PageHeader";

const WithdrawalRequests: React.FC = () => {
  const [requests, setRequests] = useState([
    {
      id: "EL123456789",
      amount: "$1500",
      accountNumber: "1234567890",
      bankName: "Bank of Example",
      upiId: "user@upi",
      status: "Pending",
    },
    {
      id: "EL123456790",
      amount: "$2000",
      accountNumber: "9876543210",
      bankName: "Example National Bank",
      upiId: "example@upi",
      status: "Approved",
    },
  ]);

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Approved" } : req))
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req))
    );
  };

  return (
    <div className="p-4 bg-white">
      <PageHeader title="Withdrawal Requests" isButton={false} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">        
        {requests.map((request) => (
          <WithdrawalRequestCard
            key={request.id}
            item={request}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </div>
    </div>
  );
};

export default WithdrawalRequests;
