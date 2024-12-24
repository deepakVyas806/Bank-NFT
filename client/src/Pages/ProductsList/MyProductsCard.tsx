// src/components/ProductCard/ProductCard.tsx

import React from "react";
// import { Product } from ".";

interface ProductCardProps {
  Product: any;
//   onBuyNow: (product: Product) => void;
}

const MyProductsCard: React.FC<ProductCardProps> = ({ Product }) => {
  return (
    <div
      className="flex flex-col rounded-lg border border-gray-200 grow pb-2"
      style={{ boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, .03)" }}
    >
      <div className="flex flex-col justify-center items-left grow">
        <div className="flex">
          <img src={Product?.user_product?.product_id?.product_image} className="w-1/2 h-32 rounded-md ml-2 mt-2" />
          <div className="flex flex-col justify-between items-center w-1/2 my-3">
            <div className="flex flex-col items-center">
              <p className="text-[9px] font-medium text-gray-500 hover:text-blue-400 cursor-pointer">
                Product name
              </p>
              <p className="text-sm font-medium text-gray-900 hover:text-blue-400 cursor-pointer">
                {Product?.user_product?.product_id?.product_name}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[9px] font-medium text-gray-500 hover:text-blue-400 cursor-pointer">
                Purchase Price
              </p>
              <p className="text-sm font-medium text-gray-900 hover:text-blue-400 cursor-pointer">
                $ {Product?.user_product?.product_id?.product_price}
              </p>
            </div>
            <div className="">
              <div className="text-[#1B84FF] inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[10px] font-medium bg-[#EFF6FF] border border-[rgba(27, 132, 255, .2)]">
                Valid for {Product?.user_product?.product_id?.validity} days
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center flex-wrap mt-2 gap-2">
          <div className="flex flex-col gap-1.5 border border-dashed border-gray-300 rounded-md px-1.5 py-1">
            <span className="text-gray-900 text-sm leading-none font-medium text-center">
              ${Product?.user_product?.total_income?.toFixed(2)}
            </span>
            <span className="text-gray-700 text-xs">Total Income</span>
          </div>
          <div className="flex flex-col gap-1.5 border border-dashed border-gray-300 rounded-md px-1.5 py-1">
            <span className="text-gray-900 text-sm leading-none font-medium text-center">
              ${Product?.user_product?.daily_income}
            </span>
            <span className="text-gray-700 text-xs">Daily Income</span>
          </div>
          <div className="flex flex-col gap-1.5 border border-dashed border-gray-300 rounded-md px-1.5 py-1">
            <span className="text-gray-900 text-sm leading-none font-medium text-center">
              Available
            </span>
            <span className="text-gray-700 text-xs">Purchase Limit</span>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-around items-center mt-2 border-t p-2 border-gray-200">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => onBuyNow(Product)}
        >
          <p className="text-gray-500 font-medium text-sm hover:text-blue-500">
            Buy now
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default MyProductsCard;
