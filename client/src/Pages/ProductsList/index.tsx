import React, { useState, useEffect, useRef, useCallback } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "./ProductCard";
import Modal from "../../Components/Modal/Modal";
import CreateProduct from "../Admin/CreateProduct";
import { FormikProps } from "formik";
import PageHeader from "../../Components/Utils/PageHeader";
import { axiosPrivate } from "../../ApiServices/Axios";
// import { showToast } from "../../ToastServices/ToastServices";
import BuyProductDetails from "./BuyProductDetails";
import PayUsingRazorpar, { OrderDetails } from "../../GlobalFunctions/PayUsingRazorpay";
import GenerateReceiptNumber from "../../GlobalFunctions/GenerateReceiptNumber";

export interface Product {
  _id: string;
  product_name:string;
  product_price:string;
  daily_income:string;
  total_income:string;
  validity:string;
  product_image:string
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false); // Loader for payment
  const formikRef = useRef<FormikProps<any>>(null);
  // const [purchaseInfo, setPurchaseInfo] = useState<any>(null); // Store calculated data here

  // Fetch products once and set state
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axiosPrivate.get("/api/v1/get-products");
      setProducts(response.data.product || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Paginate products based on currentPage and itemsPerPage

  // const itemsPerPage = 10;
  // const paginatedProducts = products.slice(0, currentPage * itemsPerPage);

  // const loadMoreProducts = () => {
  //   if (products.length && currentPage * itemsPerPage < products.length) {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //   }
  // };
  const handleModalSubmit = () => {
    if (formikRef.current) {
      CreateProduct(formikRef.current.values, formikRef.current.setSubmitting);
    }
  };

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setIsBuyModalOpen(true);
  };

  const handlePurchase = async () => {
    if (!selectedProduct ) return;
    try {
      setPaymentLoading(true); // Start loading
      const orderDetails:OrderDetails = {
        amount: selectedProduct.product_price,
        currency: 'INR',
        receipt: GenerateReceiptNumber(),
        productid: selectedProduct._id,
        daily_income: selectedProduct.daily_income,
        total_income: selectedProduct.total_income,
      }
      await PayUsingRazorpar(orderDetails)
      // showToast("Purchase successful", "success", 1000);
    } catch (error) {
      console.error("Purchase Error:", error);
    } finally {
      setIsBuyModalOpen(false);
      setLoading(false);
      setPaymentLoading(false); // Stop loading
    }
  };

  return (
    <section className="bg-white min-h-screen p-6">
      <PageHeader
        title="Products"
        buttonText="Add product"
        onButtonClick={() => setIsCreateModalOpen(true)}
      />

      {/* <InfiniteScroll
        dataLength={paginatedProducts.length}
        next={loadMoreProducts}
        hasMore={currentPage * itemsPerPage < products.length}
        loader={<h4>Loading...</h4>}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
      > */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id}>
            <ProductCard Product={product} onBuyNow={handleBuyNow} />
          </div>
        ))}
      </div>
      {/* </InfiniteScroll> */}

      {/* Modal for creating a product */}
      <Modal
        title="Add Product"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleModalSubmit}
        loading={loading}
      >
        <CreateProduct formikRef={formikRef} />
      </Modal>

      {/* Modal for buying a product */}
      <Modal
        title={`Buy ${selectedProduct?.product_name || "Product"}`}
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        onSubmit={handlePurchase}
        loading={paymentLoading}
      >
        {selectedProduct && (
          <BuyProductDetails
            product={selectedProduct}
            // onCalculate={(data: any) => setPurchaseInfo(data)} // Receive calculated data
            onCalculate={()=>{}} // Receive calculated data
          />
        )}
      </Modal>
    </section>
  );
};

export default ProductList;
