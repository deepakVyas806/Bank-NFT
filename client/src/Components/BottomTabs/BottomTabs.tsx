import React from "react";
import { AiOutlineInbox } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdShare, MdTrendingUp } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const BottomTabs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define tab items in an array
  const tabs = [
    { name: "Explore", path: "/market", Icon: <FiSearch size={15} /> },
    {
      name: "Withdrawal Requests",
      path: "/requests",
      Icon: <AiOutlineInbox size={15} />,
    },
    { name: "Earn Money", path: "/reserve", Icon: <MdTrendingUp size={18} /> },
    { name: "Referral", path: "/referAndEarn", Icon: <MdShare size={15} /> },
    { name: "My", path: "/profile", Icon: <FaUserCircle size={15} /> },
  ];

  return (
    <div className="fixed bottom-2 left-0 w-full justify-center items-center">
      <div
        // className="text-sm bg-white text-black shadow-lg border rounded-md flex justify-around py-2 z-50 mx-2"
        className="text-sm bg-gray-900 text-black shadow-lg border rounded-full flex justify-around py-1.5 z-50 mx-2"
        style={{ boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, .03)" }}
      >
        {tabs.map((item) => (
          <React.Fragment key={item.name}>
            {/* Render the button */}
            <button
              onClick={() => {
                navigate(item.path);
              }}
              className={`px-3.5 flex space-x-2 py-2 items-center text-xs shadow-lg ${
                location.pathname === item.path
                  ? "text-black font-semibold bg-white rounded-full "
                  : "text-gray-400"
              }`}
            >
              <div>{item.Icon}</div>
              <div>{location.pathname === item.path && item.name}</div>
            </button>
            {/* Add a divider except for the last item */}
            {/* {index < tabs.length - 1 && (
              <span className="border-r border-r-gray-300 my-1"></span>
            )} */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BottomTabs;

// // Old Code
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const BottomTabs: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Define tab items in an array
//   const tabs = [
//     { name: "Explore", path: "/market" },
//     { name: "Earn", path: "/earn" },
//     { name: "Reserve", path: "/reserve" },
//     { name: "Referral", path: "/referAndEarn" },
//     { name: "My", path: "/profile" },
//   ];

//   return (
//     <div className="fixed bottom-2 left-0 w-full justify-center items-center">
//       <div
//         className="text-sm bg-white text-black shadow-lg border rounded-md flex justify-around py-2 z-50 mx-2"
//         style={{ boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, .03)" }}
//       >
//         {tabs.map((item, index) => (
//           <React.Fragment key={item.name}>
//             {/* Render the button */}
//             <button
//               onClick={() => {
//                 navigate(item.path);
//               }}
//               className={`px-3 ${
//                 location.pathname === item.path
//                   ? "text-blue-500 font-semibold"
//                   : ""
//               }`}
//             >
//               {item.name}
//             </button>
//             {/* Add a divider except for the last item */}
//             {index < tabs.length - 1 && (
//               <span className="border-r border-r-gray-300 my-1"></span>
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BottomTabs;
