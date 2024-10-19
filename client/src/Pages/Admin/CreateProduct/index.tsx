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
import SubmitButton from "../../../Components/Button/SubmitButton/SubmitButton"; // Import the SubmitButton

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

const CreateProduct: React.FC = () => {
  const initialValues = {
    product_name: "",
    product_price: "",
    daily_income: "",
    validity: "",
    total_income: "",
    purchase_limit: "",
    product_image: null,
  };

  const handleSubmit = (values: any) => {
    console.log(values);
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
    <div className="max-w-md mx-auto bg-white px-8 py-4 border rounded-lg shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-1">
            {" "}
            {/* Combined space-y-1 class */}
            {/* Product Name */}
            <div>
              <AuthInput
                label="Product Name"
                name="product_name"
                type="text"
                placeholder="Enter product name"
                icon={<AiOutlineFile />}
                prefix=""
                required
              />
            </div>
            {/* Product Price */}
            <div>
              <AuthInput
                label="Product Price"
                name="product_price"
                type="number"
                placeholder="Enter product price"
                icon={<AiOutlineDollar />}
                prefix=""
                required
              />
            </div>
            {/* Daily Income */}
            <div>
              <AuthInput
                label="Daily Income"
                name="daily_income"
                type="number"
                placeholder="Enter daily income"
                icon={<AiOutlineWallet />}
                prefix=""
                required
              />
            </div>
            {/* Validity */}
            <div>
              <AuthInput
                label="Validity (days)"
                name="validity"
                type="number"
                placeholder="Enter validity"
                icon={<AiOutlineCalendar />}
                prefix=""
                required
              />
            </div>
            {/* Total Income */}
            <div>
              <AuthInput
                label="Total Income"
                name="total_income"
                type="number"
                placeholder="Enter total income"
                icon={<AiOutlineNumber />}
                prefix=""
                required
              />
            </div>
            {/* Purchase Limit */}
            <div>
              <AuthInput
                label="Purchase Limit"
                name="purchase_limit"
                type="number"
                placeholder="Enter purchase limit"
                icon={<AiOutlineShoppingCart />}
                prefix=""
                required
              />
            </div>
            {/* Product Image */}
            <div>
              <Label label="Product Image" htmlFor="productImage" />
              <input
                name="product_image"
                type="file"
                accept="image/*"
                onChange={(event) => handleFileChange(event, setFieldValue)}
                className="block w-full text-sm text-gray-700 border border-gray-300 p-2 rounded-md"
              />
            </div>
            {/* Submit Button */}
            <div>
              <SubmitButton
                isLoading={isSubmitting}
                buttonText="Submit"
                // Optional: Add buttonColor prop if needed
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
