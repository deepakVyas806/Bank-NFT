import React, { useState, useEffect, useRef, useCallback } from "react";
import ProductCard from "./ProductCard";
import Modal from "../../Components/Modal/Modal";
import CreateProduct from "../Admin/CreateProduct";
import PageHeader from "../../Components/Utils/PageHeader";
import { axiosPrivate } from "../../ApiServices/Axios";
import NoDataAvailable from "../../Components/Utils/NoDataAvailable";
import Loader from "../../Components/Loader/Loader";
import { showToast } from "../../ToastServices/ToastServices";
import { useSelector } from "react-redux";
import { FormikProps } from "formik";
import BuyProductDetails from "./BuyProductDetails";
import MyProductsCard from "./MyProductsCard";

export interface Product {
  _id: string;
  product_name: string;
  product_price: string;
  daily_income: string;
  total_income: string;
  validity: string;
  product_image: string;
}

interface ProductListProps {
  isMyProducts?: boolean; // To determine page type
}

const ProductList: React.FC<ProductListProps> = ({ isMyProducts = false }) => {
  // const isMounted = useRef(false); // Prevent multiple executions
  const profileData = useSelector((state: any) => state.user.userProfile); // Fetch user profile from Redux store

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isCreateProductButton, setIsCreateProductButton] = useState(false);
  const formikRef = useRef<FormikProps<any>>(null);

  // Fetch products dynamically based on the page type
  const fetchProducts = useCallback(async () => {
    try {
      if (isMyProducts) {
        setProducts(profileData?.products || []); // Fetch products from user's profile
        return;
      }
      if (
        !isMyProducts &&
        profileData?.user_details?.user?.role?.toLowerCase() == "admin"
      )
        setIsCreateProductButton(true);

      setIsProductsLoading(true);
      const response = await axiosPrivate.get("/api/v1/get-products");
      setProducts(response.data.payload || []); // Fetch all products
    } catch (error) {
      console.error("Error fetching products:", error);
      showToast("Failed to load products", "error", 1000);
    } finally {
      setIsProductsLoading(false);
    }
  }, [isMyProducts, profileData]);

  // Run fetchProducts only once per page
  useEffect(() => {
    // if (!isMounted.current) {
    fetchProducts();
    // isMounted.current = true;
    // }
  }, [fetchProducts, isMyProducts]);

  // Create Product Handler
  const createProduct = async (values: any, setSubmitting: any) => {
    try {
      setLoading(true);
      const formData = new FormData();

      // Appending values to FormData object
      formData.append("product_name", values.product_name);
      formData.append("product_price", values.product_price);
      formData.append("daily_income", values.daily_income);
      formData.append("validity", values.validity);
      formData.append("total_income", values.total_income);
      formData.append("purchase_limit", values.purchase_limit);
      formData.append("product_image", values.product_image);

      const response = await axiosPrivate.post("api/v1/add_product", formData);
      console.log(response);
      showToast("Product added successfully", "success", 1000);
      fetchProducts();
      setSubmitting(false);
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || "Failed to add product",
        "error",
        1000
      );
      console.error("Add Product Error:", error);
    } finally {
      setLoading(false);
      setIsCreateModalOpen(false);
    }
  };

  // Buy Now Handler
  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setIsBuyModalOpen(true);
  };

  // Purchase Handler
  const handlePurchase = async () => {
    if (!selectedProduct) return;
    try {
      setPaymentLoading(true); // Start loading
      await axiosPrivate.post(`api/v1/buy/${selectedProduct?._id}`, {
        invest_amount: selectedProduct?.product_price,
        daily_income: selectedProduct?.daily_income,
      });
      showToast("Purchase successful", "success", 1000);
    } catch (error) {
      console.error("Purchase Error:", error);
      showToast("Purchase failed", "error", 1000);
    } finally {
      setIsBuyModalOpen(false);
      setPaymentLoading(false); // Stop loading
    }
  };

  // Handle Modal Submission
  const handleModalSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  if (isProductsLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader loading={true} type="moon" size={30} color="#000000" />
      </div>
    );
  }

  return (
    <section className="min-h-full p-6" style={{
      background: "linear-gradient(#F9FCFF, #F9FFFD, #ffffff)",
      // background: "linear-gradient(#EAF7FF, #EFFFF7, #ffffff)",
    }}>
      <PageHeader
        title={isMyProducts ? "My Products" : "Market"}
        buttonText="Add Product"
        onButtonClick={() => setIsCreateModalOpen(true)}
        isButton={isCreateProductButton} // Show button only for the Market page
      />

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {isMyProducts
            ? products.map((product: any) => (
                <div key={product.user_product._id}>
                  <MyProductsCard
                    Product={product}
                    // onBuyNow={handleBuyNow}
                  />
                </div>
              ))
            : products.map((product) => (
                <div key={product._id}>
                  <ProductCard Product={product} onBuyNow={handleBuyNow} />
                </div>
              ))}
        </div>
      ) : (
        <NoDataAvailable />
      )}

      {/* Modal for creating a product */}
      <Modal
        title="Add Product"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleModalSubmit}
        loading={loading}
      >
        <CreateProduct formikRef={formikRef} onSubmit={createProduct} />
      </Modal>

      {/* Modal for buying a product */}
      <Modal
        title={`Buy ${selectedProduct?.product_name || "Product"}`}
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        onSubmit={handlePurchase}
        loading={paymentLoading}
        submitButtonText="BUY NOW"
      >
        {selectedProduct && (
          <BuyProductDetails product={selectedProduct} onCalculate={() => {}} />
        )}
      </Modal>
    </section>
  );
};

export default ProductList;
