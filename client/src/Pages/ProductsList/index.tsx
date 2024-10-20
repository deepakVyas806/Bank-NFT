// src/pages/ProductList/ProductList.tsx

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Simulated API call function
  const fetchProducts = async (page: number) => {
    // Simulating a delay for fetching products
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Static data for now
    const staticProducts: Product[] = Array.from({ length: 10 }, (_, index) => ({
      id: (page - 1) * 10 + index + 1,
      name: `Product ${(page - 1) * 10 + index + 1}`,
      price: Math.floor(Math.random() * 100) + 10,
      image: "https://via.placeholder.com/150",
    }));

    return staticProducts;
  };

  const loadMoreProducts = async () => {
    const newProducts = await fetchProducts(page);
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);

    if (newProducts.length < 10) {
      setHasMore(false);
    }
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);

  return (
    <section className="bg-white min-h-screen p-6">
      <InfiniteScroll
        dataLength={products.length}
        next={()=>{}}
        // next={loadMoreProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </InfiniteScroll>
    </section>
  );
};

export default ProductList;
