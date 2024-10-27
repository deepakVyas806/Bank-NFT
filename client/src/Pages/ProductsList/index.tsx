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
import PayUsingRazorpar, {
  OrderDetails,
} from "../../GlobalFunctions/PayUsingRazorpay";
import GenerateReceiptNumber from "../../GlobalFunctions/GenerateReceiptNumber";
import NoDataAvailable from "../../Components/Utils/NoDataAvailable";
import Loader from "../../Components/Loader/Loader";

export interface Product {
  _id: string;
  product_name: string;
  product_price: string;
  daily_income: string;
  total_income: string;
  validity: string;
  product_image: string;
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
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  // const [purchaseInfo, setPurchaseInfo] = useState<any>(null); // Store calculated data here

  // Fetch products once and set state
  const fetchProducts = useCallback(async () => {
    try {
      setIsProductsLoading(true);
      const response = await axiosPrivate.get("/api/v1/get-products");
      setProducts(response.data.payload || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsProductsLoading(false);
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
      fetchProducts();
      setSubmitting(false);
    } catch (error) {
      console.error("Purchase Error:", error);
    } finally {
      setLoading(false);
      setIsCreateModalOpen(false);
    }
  };
  const handleModalSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm()
      // createProduct(formikRef.current.values, formikRef.current.setSubmitting);
    }
  };

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setIsBuyModalOpen(true);
  };

  const handlePurchase = async () => {
    if (!selectedProduct) return;
    try {
      setPaymentLoading(true); // Start loading
      const orderDetails: OrderDetails = {
        amount: selectedProduct.product_price,
        currency: "INR",
        receipt: GenerateReceiptNumber(),
        productid: selectedProduct._id,
        daily_income: selectedProduct.daily_income,
        total_income: selectedProduct.total_income,
      };
      await PayUsingRazorpar(orderDetails);
      // showToast("Purchase successful", "success", 1000);
    } catch (error) {
      console.error("Purchase Error:", error);
    } finally {
      setIsBuyModalOpen(false);
      setPaymentLoading(false); // Stop loading
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
    <section className="bg-white min-h-full p-6">
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
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard Product={product} onBuyNow={handleBuyNow} />
            </div>
          ))}
        </div>
      ) : (
        <NoDataAvailable />
      )}
      {/* </InfiniteScroll> */}

      {/* Modal for creating a product */}
      <Modal
        title="Add Product"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleModalSubmit}
        loading={loading}
      >
        <CreateProduct formikRef={formikRef} onSubmit={createProduct}/>
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
            onCalculate={() => {}} // Receive calculated data
          />
        )}
      </Modal>
    </section>
  );
};

export default ProductList;
