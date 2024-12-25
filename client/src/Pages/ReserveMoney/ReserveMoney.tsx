import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { fetchProfileData } from "../../GlobalFunctions/FetchProfileDetails";
import { useDispatch } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import { showToast } from "../../ToastServices/ToastServices";
import { axiosPrivate } from "../../ApiServices/Axios";
import { HiCheck } from "react-icons/hi";
import NoDataAvailable from "../../Components/Utils/NoDataAvailable";

// Placeholder components for each tab
const Reserve = ({ data, action, activeTab }: any) => {
  const productsNotBought = data?.products?.filter(
    (product: any) =>
      !product?.user_product?.buy && !product?.user_product?.sell
  );
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleActionClick = async (tab: number, item: any) => {
    const itemId = item?.user_product?.product_id?._id;
    setLoadingStates((prev) => ({ ...prev, [itemId]: true }));

    try {
      await action(tab, item);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [itemId]: false }));
    }
  };
  return (
    <>
      {productsNotBought?.length > 0 ? (
        productsNotBought?.map((item: any, index: number) => (
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
              onClick={() => handleActionClick(activeTab, item)}
              className="flex w-40 mt-4 md:mt-0 justify-around shadow-md items-center border-t py-1.5 rounded-md border-gray-200"
              style={{
                background: "linear-gradient(90deg, #5cbffe, #a0f5d0, #ffd7c8)",
              }}
            >
              <div className="inline-flex items-center cursor-pointer">
                <p className="text-gray-800 font-semibold text-sm hover:text-black uppercase flex items-center">
                  {loadingStates[item?.user_product?.product_id?._id] ? (
                    <Loader
                      loading={true}
                      type={"beat"}
                      size={80}
                      color="#000000"
                    />
                  ) : (
                    <span>Confirm</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <NoDataAvailable message="No Tasks Available" />
        </div>
      )}
    </>
  );
};

const TodaysTransactions = ({ data }: any) => {
  const productsNotBought = data?.products?.filter(
    (product: any) => product?.user_product?.buy && product?.user_product?.sell
  );
  return (
    <>
      {productsNotBought?.length > 0 ? (
        productsNotBought?.map((item: any, index: number) => (
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
                  <HiCheck />
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
            {/* <div
            onClick={() => action(activeTab, item)}
            className="flex w-40 mt-4 md:mt-0 justify-around shadow-md items-center border-t py-1.5 rounded-md border-gray-200"
            style={{
              background: "linear-gradient(90deg, #5cbffe, #a0f5d0, #ffd7c8)",
            }}
          >
            <div className="inline-flex items-center cursor-pointer">
              <p className="text-gray-800 font-semibold text-sm hover:text-black uppercase flex items-center">
                {isBuySellLoading ? (
                  <Loader
                    loading={isBuySellLoading}
                    type={"beat"}
                    size={80}
                    color="#ffffff"
                  />
                ) : (
                  <span>Confirm</span>
                )}
              </p>
            </div>
          </div> */}
          </div>
        ))
      ) : (
        <div>
          <NoDataAvailable message="No Tasks Available" />
        </div>
      )}
    </>
  );
};

const Collection = ({ data, action, activeTab }: any) => {
  const productsNotBought = data?.products?.filter(
    (product: any) => product?.user_product?.buy && !product?.user_product?.sell
  );
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleActionClick = async (tab: number, item: any) => {
    const itemId = item?.user_product?.product_id?._id;
    setLoadingStates((prev) => ({ ...prev, [itemId]: true }));

    try {
      await action(tab, item);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [itemId]: false }));
    }
  };
  return (
    <>
      {productsNotBought?.length > 0 ? (
        productsNotBought?.map((item: any, index: number) => (
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
              onClick={() => handleActionClick(activeTab, item)}
              className="flex w-40 mt-4 md:mt-0 justify-around shadow-md items-center border-t py-1.5 rounded-md border-gray-200"
              style={{
                background: "linear-gradient(90deg, #5cbffe, #a0f5d0, #ffd7c8)",
              }}
            >
              <div className="inline-flex items-center cursor-pointer">
                <p className="text-gray-800 font-semibold text-sm hover:text-black uppercase flex items-center">
                  {loadingStates[item?.user_product?.product_id?._id] ? (
                    <Loader
                      loading={true}
                      type={"beat"}
                      size={80}
                      color="#000000"
                    />
                  ) : (
                    <div className="flex">
                      <span className="mr-1">Sell at 3%</span>{" "}
                      <MdTrendingUp size={18} />
                    </div>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <NoDataAvailable message="No Tasks Available" />
        </div>
      )}
    </>
  );
};

const ReserveMoney: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuySellLoading, setIsBuySellLoading] = useState(false);

  const setData = async () => {
    setIsLoading(true);
    const res = await fetchProfileData(dispatch);
    setProfileData(res || []); // Default to empty array if no data
    setIsLoading(false);
  };

  useEffect(() => {
    setData();
  }, [dispatch]);

  // Action function to be passed to components
  const handleAction = async (id: any, item: any) => {
    console.log(item);
    switch (id) {
      case 0:
        try {
          setIsBuySellLoading(true);
          await axiosPrivate.post("/api/v1/buyTask", {
            productId: item?.user_product?.product_id?._id,
          });
          setData();
          showToast("Task Buyed Successfully", "success", 1000);
          handleTabChange(2);
          // setProducts(response.data.payload || []); // Fetch all products
        } catch (error) {
          console.error("Error fetching products:", error);
          showToast("Failed to Buy Task", "error", 1000);
        } finally {
          setIsBuySellLoading(false);
        }
        // Buy Api Call
        console.log("reserrve confirm / buy");
        break;
      case 2:
        try {
          setIsBuySellLoading(true);
          await axiosPrivate.post("/api/v1/sellTask", {
            productId: item?.user_product?.product_id?._id,
          });
          setData();
          showToast("Task Completed Successfully", "success", 1000);
          handleTabChange(1);
          // setProducts(response.data.payload || []); // Fetch all products
        } catch (error) {
          console.error("Error fetching products:", error);
          showToast("Error Completing task", "error", 1000);
        } finally {
          setIsBuySellLoading(false);
        }
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
    <div className="p-4 bg-white shadow-lg rounded-lg h-full">
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
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Loader loading={true} type="moon" size={30} color="#000000" />
        </div>
      ) : (
        <div className="text-gray-800">
          <ActiveComponent
            isBuySellLoading={isBuySellLoading}
            activeTab={activeTab}
            data={profileData}
            action={handleAction}
          />
        </div>
      )}
    </div>
  );
};

export default ReserveMoney;
