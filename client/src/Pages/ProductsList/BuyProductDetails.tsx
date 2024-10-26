// src/pages/ProductList/BuyProductDetails.tsx

import React from "react";
import { Product } from ".";

interface BuyProductDetailsProps {
  product: Product;
  onCalculate:any
}

const BuyProductDetails: React.FC<BuyProductDetailsProps> = ({ product }) => {
  return (
    <div className="buy-product-details">
      <h2 className="text-lg font-bold mb-2">Buy Product</h2>
      <img src={product.product_image} alt={product.name} className="mb-4 w-32 h-32 object-cover" />
      <h3 className="text-md font-semibold">{product.name}</h3>
      <p className="text-gray-700">Price: ₹{product.price}</p>

      {/* Additional product info if needed */}
      <p className="text-gray-600 mt-2">Description of the product...</p>      
    </div>
  );
};

export default BuyProductDetails;
