import React, { useState } from "react";

// Placeholder components for each tab
const Reserve = () => {
  return <div>Reserve Tab Content: Manage your reserves here.</div>;
};

const TodaysTransactions = () => {
  return <div>Today's Tab Content: View today's transactions here.</div>;
};

const Collection = () => {
  return <div>Collection Tab Content: Manage your collections here.</div>;
};

const ReserveMoney: React.FC = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState<number>(0);

  // Tab data with components as content
  const tabs = [
    { label: "Reserve", component: <Reserve /> },
    { label: "Today's", component: <TodaysTransactions /> },
    { label: "Collection", component: <Collection /> },
  ];

  // Function to handle tab switch
  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {/* <div
        className="flex flex-col rounded-lg border border-gray-200 grow"
        style={{ boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, .03)" }}
      ></div> */}
      {/* Tabs Navigation */}
      <div className="flex border-b mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => handleTabChange(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="text-gray-800">{tabs[activeTab].component}</div>
    </div>
  );
};

export default ReserveMoney;
