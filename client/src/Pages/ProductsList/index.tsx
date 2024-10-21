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
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal open/close
  const [loading, setLoading] = useState(false); // Loading state for API call
  const formikRef = useRef<FormikProps<any>>(null);

  const createProduct = async (values: any, setSubmitting: any) => {
    const formData = new FormData();

    // Appending values to FormData object
    formData.append("product_name", values.product_name);
    formData.append("product_price", values.product_price);
    formData.append("daily_income", values.daily_income);
    formData.append("validity", values.validity);
    formData.append("total_income", values.total_income);
    formData.append("purchase_limit", values.purchase_limit);
    formData.append("product_image", values.product_image);

    try {
      setLoading(true); // Set loading to true before the API call
      const response = await axiosPrivate.post("api/v1/add_product", formData);
      console.log(response);
      // Optionally handle the response or refresh the product list here
    } catch (error) {
      console.error("Error creating product:", error);
      // Optionally show an error message to the user
    } finally {
      setIsModalOpen(false);
      showToast('Product added successfully.','success',1000)
      setSubmitting(false); // Always set submitting to false when done
      setLoading(false); // Set loading to false after the API call completes
    }
  };

  const handleModalSubmit = () => {
    // If formikRef exists, trigger submit
    if (formikRef.current) {
      createProduct(formikRef.current.values, formikRef.current.setSubmitting);
    }
  };

  const fetchProducts = async (page: number) => {
    // Simulating a delay for fetching products
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Static data for now
    const staticProducts: Product[] = Array.from(
      { length: 10 },
      (_, index) => ({
        id: (page - 1) * 10 + index + 1,
        name: `Product ${(page - 1) * 10 + index + 1}`,
        price: Math.floor(Math.random() * 100) + 10,
        image: "https://via.placeholder.com/150",
      })
    );

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
      <PageHeader
        title="Products"
        buttonText="Add product"
        onButtonClick={() => setIsModalOpen(true)}
      />

      <InfiniteScroll
        dataLength={products.length}
        next={loadMoreProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
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

      <Modal
        title="Add Product"
        isOpen={isModalOpen} // Use state to control modal visibility
        onClose={() => setIsModalOpen(false)} // Close modal
        onSubmit={handleModalSubmit} // Submit function from Modal
        loading={loading} // Pass loading state to Modal
      >
        <CreateProduct formikRef={formikRef} /> {/* Pass ref to Formik */}
      </Modal>
    </section>
  );
};

export default ProductList;
