import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { fetchProfileData } from "../../GlobalFunctions/FetchProfileDetails";
import { useDispatch } from "react-redux";

// Placeholder components for each tab
const Reserve = ({ data, action }: any) => {
  return (
    <>
      {data?.products?.map(
        (item: any, index: number) =>
          !item?.user_product?.buy &&
          !item?.user_product?.buy && (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-center rounded-lg border border-gray-200 grow p-4"
            >
              {/* Section 1 */}
              <div className="flex space-x-3 items-center">
                <div
                  className="flex items-center justify-center w-7 h-7 rounded-full shadow-md border border-gray-200 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(90deg, #5cbffe, #a0f5d0, #ffd7c8)",
                  }}
                  onClick={() => console.log("Button clicked!")} // Add your onClick handler
                >
                  <span className="text-xs font-medium text-gray-800">
                    {index + 1}
                  </span>
                </div>
                <div className="relative">
                  <div className="flex w-40 items-center space-x-4 bg-gray-50 border border-inputborder rounded-lg p-2.5">
                    {/* Icon */}
                    {/* <span className="pr-2 text-gray-500 text-xs text-nowrap">
                      {"LV 1"}
                    </span> */}
                    {/* Input Field */}
                    <input
                      value={`Return  3%  (+ $${
                        Number(item?.user_product?.product_id?.product_price) *
                        (3 / 100)
                      })`}
                      disabled
                      className={`bg-transparent flex-1 focus:outline-none text-inputlabel text-xs font-normal`}
                    />
                  </div>
                  <div className="absolute right-2 top-3.5">
                    <FaChevronDown size={10} />
                  </div>
                </div>

                {/* Section 2 */}
                <div className="relative">
                  <div className="flex items-center bg-gray-50 border border-inputborder rounded-lg p-2.5">
                    {/* Icon */}
                    <input
                      value={`$${item?.user_product?.product_id?.product_price}`}
                      disabled
                      className={`bg-transparent flex-1 focus:outline-none text-inputlabel text-xs font-normal`}
                    />
                  </div>
                  <div className="absolute right-2 top-3.5">
                    <FaChevronDown size={10} />
                  </div>
                </div>
              </div>
              <div
                onClick={action}
                className="flex w-40 mt-4 md:mt-0 justify-around shadow-md items-center border-t py-1.5 rounded-md border-gray-200"
                style={{
                  background:
                    "linear-gradient(90deg, #5cbffe, #a0f5d0, #ffd7c8)",
                }}
              >
                <div className="inline-flex items-center cursor-pointer">
                  <p className="text-gray-800 font-semibold text-sm hover:text-black uppercase flex items-center">
                    <span>Confirm</span>
                  </p>
                </div>
              </div>
            </div>
          )
      )}
    </>
  );
};

const TodaysTransactions = () => {
  return <div>Today's Tab Content: View today's transactions here.</div>;
};

const Collection = ({ data, action }: any) => {
  return (
    <>
      {data?.products?.map(
        (item: any, index: number) =>
          item?.user_product?.buy &&
          !item?.user_product?.buy && (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-center rounded-lg border border-gray-200 grow p-4"
            >
              {/* Section 1 */}
              <div className="flex space-x-3 items-center">
                <div
                  className="flex items-center justify-center w-7 h-7 rounded-full shadow-md border border-gray-200 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(90deg, #5cbffe, #a0f5d0, #ffd7c8)",
                  }}
                  onClick={() => console.log("Button clicked!")} // Add your onClick handler
                >
                  <span className="text-xs font-medium text-gray-800">
                    {index + 1}
                  </span>
                </div>
                <div className="relative">
                  <div className="flex w-40 items-center space-x-4 bg-gray-50 border border-inputborder rounded-lg p-2.5">
                    {/* Icon */}
                    {/* <span className="pr-2 text-gray-500 text-xs text-nowrap">
                      {"LV 1"}
                    </span> */}
                    {/* Input Field */}
                    <input
                      value={`Return  3%  (+ $${
                        Number(item?.user_product?.product_id?.product_price) *
                        (3 / 100)
                      })`}
                      disabled
                      className={`bg-transparent flex-1 focus:outline-none text-inputlabel text-xs font-normal `}
                    />
                  </div>
                  <div className="absolute right-2 top-3.5">
                    <FaChevronDown size={10} />
                  </div>
                </div>

                {/* Section 2 */}
                <div className="relative">
                  <div className="flex items-center bg-gray-50 border border-inputborder rounded-lg p-2.5">
                    {/* Icon */}
                    <input
                      value={`$${item?.user_product?.product_id?.product_price}`}
                      disabled
                      className={`bg-transparent flex-1 focus:outline-none text-inputlabel text-xs font-normal `}
                    />
                  </div>
                  <div className="absolute right-2 top-3.5">
                    <FaChevronDown size={10} />
                  </div>
                </div>
              </div>
              <div
                onClick={action}
                className="flex w-40 mt-4 md:mt-0 justify-around shadow-md items-center border-t py-1.5 rounded-md border-gray-200"
                style={{
                  background:
                    "linear-gradient(90deg, #5cbffe, #a0f5d0, #ffd7c8)",
                }}
              >
                <div className="inline-flex items-center cursor-pointer">
                  <p className="text-gray-800 font-semibold text-sm hover:text-black uppercase flex items-center">
                    <span className="mr-1">Sell at 3%</span>{" "}
                    <MdTrendingUp size={18} />
                  </p>
                </div>
              </div>
            </div>
          )
      )}
    </>
  );
};

const ReserveMoney: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState<any[]>([]);

  useEffect(() => {
    const setData = async () => {
      const res = await fetchProfileData(dispatch);
      setProfileData(res || []); // Default to empty array if no data
    };
    setData();
  }, [dispatch]);

  // Action function to be passed to components
  const handleAction = (id: any) => {
    switch (id) {
      case 0:
        // Buy Api Call
        console.log("reserrve confirm / buy");
        break;
      case 2:
        // Sell Api Call
        console.log("collection sell / sell");
        break;

      default:
        break;
    }
  };

  const tabs = [
    { id: 1, label: "Reserve", component: Reserve },
    { id: 2, label: "Today's", component: TodaysTransactions },
    { id: 3, label: "Collection", component: Collection },
  ];

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {/* Tabs Navigation */}
      <div className="flex border-b mb-4 justify-center items-center">
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
      <div className="text-gray-800">
        <ActiveComponent
          data={profileData}
          action={() => handleAction(activeTab)}
        />
      </div>
    </div>
  );
};

export default ReserveMoney;
