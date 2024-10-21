import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  AiOutlineFile,
  AiOutlineDollar,
  AiOutlineCalendar,
  AiOutlineWallet,
  AiOutlineNumber,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import AuthInput, { Label } from "../../../Components/Input/AuthInput";
import { axiosPrivate } from "../../../ApiServices/Axios";

interface CreateProductProps {
  formikRef: React.Ref<any>;
}

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  product_name: Yup.string().required("Product name is required"),
  product_price: Yup.number()
    .required("Product price is required")
    .positive("Price must be a positive number"),
  daily_income: Yup.number()
    .required("Daily income is required")
    .positive("Daily income must be a positive number"),
  validity: Yup.number()
    .required("Validity is required")
    .positive("Validity must be a positive number"),
  total_income: Yup.number()
    .required("Total income is required")
    .positive("Total income must be a positive number"),
  purchase_limit: Yup.number()
    .required("Purchase limit is required")
    .integer("Purchase limit must be an integer")
    .min(1, "Purchase limit must be at least 1"),
  product_image: Yup.mixed().required("Product image is required"),
});

const CreateProduct: React.FC<CreateProductProps> = ({ formikRef }) => {
  const initialValues = {
    product_name: "",
    product_price: "",
    daily_income: "",
    validity: "",
    total_income: "",
    purchase_limit: "",
    product_image: null,
  };

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

    const response = await axiosPrivate.post("api/v1/add_product", formData);
    console.log(response);
    setSubmitting(false);
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    console.log(values);
    createProduct(values, setSubmitting);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    setFieldValue("product_image", file);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ setFieldValue }: any) => (
          <Form className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            {/* Product Name */}
            <AuthInput
              label="Product Name"
              name="product_name"
              type="text"
              placeholder="Enter product name"
              icon={<AiOutlineFile />}
              prefix=""  // Added prefix here
              required
            />
            {/* Product Price */}
            <AuthInput
              label="Product Price"
              name="product_price"
              type="number"
              placeholder="Enter product price"
              icon={<AiOutlineDollar />}
              prefix=""  // Added prefix here
              required
            />
            {/* Daily Income */}
            <AuthInput
              label="Daily Income"
              name="daily_income"
              type="number"
              placeholder="Enter daily income"
              icon={<AiOutlineWallet />}
              prefix=""  // Added prefix here
              required
            />
            {/* Validity */}
            <AuthInput
              label="Validity (days)"
              name="validity"
              type="number"
              placeholder="Enter validity"
              icon={<AiOutlineCalendar />}
              prefix=""  // Added prefix here
              required
            />
            {/* Total Income */}
            <AuthInput
              label="Total Income"
              name="total_income"
              type="number"
              placeholder="Enter total income"
              icon={<AiOutlineNumber />}
              prefix=""  // Added prefix here
              required
            />
            {/* Purchase Limit */}
            <AuthInput
              label="Purchase Limit"
              name="purchase_limit"
              type="number"
              placeholder="Enter purchase limit"
              icon={<AiOutlineShoppingCart />}
              prefix=""  // Added prefix here
              required
            />
            {/* Product Image */}
            <div className="lg:col-span-2">
              <Label label="Product Image" htmlFor="productImage" />
              <input
                name="product_image"
                type="file"
                accept="image/*"
                onChange={(event) => handleFileChange(event, setFieldValue)}
                className="block w-full text-sm text-gray-700 border border-gray-300 p-2 rounded-md"
              />
            </div>
            {/* Add your submit button and other components as necessary */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
