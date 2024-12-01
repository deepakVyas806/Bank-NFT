// src/pages/ProductList/BuyProductDetails.tsx

import React from "react";
import { Product } from ".";

interface BuyProductDetailsProps {
  product: Product;
  onCalculate: any;
}

const BuyProductDetails: React.FC<BuyProductDetailsProps> = ({ product }) => {
  return (
    <div className="buy-product-details flex">
      {/* <h2 className="text-lg font-bold mb-2">Buy Product</h2> */}
      <img
        src={product.product_image}
        alt={product.product_name}
        className="mb-4 w-32 h-32 object-cover mr-4 rounded-sm"
      />
      <div>
        <div className="flex items-center space-x-2">
          <h3 className="text-md font-semibold">{product.product_name}</h3>
          <div className="text-[#1B84FF] inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[10px] font-medium bg-[#EFF6FF] border border-[rgba(27, 132, 255, .2)]">
            Valid for {product.validity} days
          </div>
        </div>
        <div className="flex items-center justify-center flex-wrap mt-2 gap-2">
          <div className="flex flex-col gap-1.5 border border-dashed border-gray-300 rounded-md px-1.5 py-1">
            <span className="text-gray-900 text-sm leading-none font-medium text-center">
              $ {product?.total_income}
            </span>
            <span className="text-gray-700 text-xs">Total Income</span>
          </div>
          <div className="flex flex-col gap-1.5 border border-dashed border-gray-300 rounded-md px-1.5 py-1">
            <span className="text-gray-900 text-sm leading-none font-medium text-center">
              {product?.daily_income} %
            </span>
            <span className="text-gray-700 text-xs">Daily Income</span>
          </div>
          {/* <div className="flex flex-col gap-1.5 border border-dashed border-gray-300 rounded-md px-1.5 py-1">
            <span className="text-gray-900 text-sm leading-none font-medium text-center">
              3
            </span>
            <span className="text-gray-700 text-xs">Purchase Limit</span>
          </div> */}
        </div>
        <div className="flex items-center mt-2">
          <p className="text-xs font-medium text-gray-500 hover:text-blue-400 cursor-pointer">
            Purchase Price:
          </p>
          <p className="text-sm font-medium ml-2">$ {product.product_price}</p>
        </div>
      </div>

      {/* Additional product info if needed */}
    </div>
  );
};

export default BuyProductDetails;
