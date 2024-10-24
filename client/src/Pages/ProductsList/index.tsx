// src/pages/ProductList/ProductList.tsx

import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "./ProductCard";
import Modal from "../../Components/Modal/Modal";
import CreateProduct from "../Admin/CreateProduct";
import { FormikProps } from "formik";
import PageHeader from "../../Components/Utils/PageHeader";
import { axiosPrivate } from "../../ApiServices/Axios";
import { showToast } from "../../ToastServices/ToastServices";

interface Product {
  _id: number;
  name: string;
  price: number;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const formikRef = useRef<FormikProps<any>>(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axiosPrivate.get("/api/v1/get-products");
      return response.data.product; // Assuming API returns a 'product' array
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  // Load all products on mount
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  // Get paginated products
  const paginatedProducts = products
  

  // Handle next page
  const loadMoreProducts = () => {
    if (currentPage * itemsPerPage >= products.length) return;
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const createProduct = async (values: any, setSubmitting: any) => {
    const formData = new FormData();
    formData.append("product_name", values.product_name);
    formData.append("product_price", values.product_price);
    formData.append("daily_income", values.daily_income);
    formData.append("validity", values.validity);
    formData.append("total_income", values.total_income);
    formData.append("purchase_limit", values.purchase_limit);
    formData.append("product_image", values.product_image);

    try {
      setLoading(true); // Set loading to true before the API call
      const response = await axiosPrivate.post("/api/v1/add_product", formData);
      console.log(response);
      showToast("Product added successfully.", "success", 1000);
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsModalOpen(false);
      setSubmitting(false); // Set submitting to false when done
      setLoading(false); // Set loading to false after the API call completes
    }
  };

  const handleModalSubmit = () => {
    if (formikRef.current) {
      createProduct(formikRef.current.values, formikRef.current.setSubmitting);
    }
  };

  return (
    <section className="bg-white min-h-screen p-6">
      <PageHeader
        title="Products"
        buttonText="Add product"
        onButtonClick={() => setIsModalOpen(true)}
      />

      <InfiniteScroll
        dataLength={paginatedProducts.length}
        next={loadMoreProducts}
        hasMore={currentPage * itemsPerPage < products.length}
        loader={<h4>Loading...</h4>}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {paginatedProducts.map((product) => (
          <div key={product._id}>
            <ProductCard
          Product={product}
          />
          </div>
        ))}
      </InfiniteScroll>

      <Modal
        title="Add Product"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        loading={loading}
      >
        <CreateProduct formikRef={formikRef} />
      </Modal>
    </section>
  );
};

export default ProductList;
