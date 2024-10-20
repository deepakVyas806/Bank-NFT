// src/components/ProductCard/ProductCard.tsx

import React from "react";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image }) => {
  return (
    <div
      className="flex flex-col rounded-lg border border-gray-200 grow"
      style={{ boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, .03)" }}
    >
      {/* <div className="p-3">
        <div className="text-[#1B84FF] inline-flex items-center justify-center rounded-md px-2 py-1 text-[10px] font-medium bg-[#EFF6FF] border border-[rgba(27, 132, 255, .2)]">
          Validity 10 days
        </div>
      </div> */}
      <div className="flex flex-col justify-center items-left grow">
        <img src="/product-example.jpg" className="w-full h-32 rounded-t-md" />
        <div className="flex flex-col items-center ml-2">
          <p className="text-base font-medium text-gray-900 hover:text-blue-400 cursor-pointer">
            {name}
          </p>
          <p className="text-sm text-gray-700">&#8377; {price}</p>
        </div>
        <div className="flex items-center justify-center flex-wrap mt-2 gap-2">
          <div className="flex flex-col gap-1.5 border border-dashed border-gray-300 rounded-md px-1.5 py-1">
            <span className="text-gray-900 text-sm leading-none font-medium text-center">
              &#8377; 100
            </span>
            <span className="text-gray-700 text-xs">Total Income</span>
          </div>
          <div className="flex flex-col gap-1.5 border border-dashed border-gray-300 rounded-md px-1.5 py-1">
            <span className="text-gray-900 text-sm leading-none font-medium text-center">
              &#8377; 10
            </span>
            <span className="text-gray-700 text-xs">Daily Income</span>
          </div>
          <div className="flex flex-col gap-1.5 border border-dashed border-gray-300 rounded-md px-1.5 py-1">
            <span className="text-gray-900 text-sm leading-none font-medium text-center">
              3
            </span>
            <span className="text-gray-700 text-xs">Purchase Limit</span>
          </div>
        </div>
      </div>
      <div className="flex justify-around items-center mt-2 border-t p-2 border-gray-200">
        <div className="flex items-center cursor-pointer">
          <p className="text-gray-500 font-medium text-base hover:text-blue-500">
            View Details
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
