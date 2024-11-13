import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthInput from "../../Components/Input/AuthInput"; // Adjust the import based on the location of AuthInput component
import { AiOutlineUser } from "react-icons/ai"; // Adjust icons as per your preference

// Validation schema using Yup
const WithdrawSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .min(1, "Amount must be greater than zero"),
  accountHolderName: Yup.string().required("Account holder's name is required"),
  accountNumber: Yup.string().required("Account number is required"),
  bankName: Yup.string().required("Bank name is required"),
  ifscCode: Yup.string().required("IFSC code is required"),
});

interface WithdrawFormProps {
  onSubmit: any;
  formikRef?: React.Ref<any>;
}

const WithdrawAmount: React.FC<WithdrawFormProps> = ({
  onSubmit,
  formikRef,
}) => {
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    onSubmit(values, setSubmitting);
  };
  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        amount: "",
        accountHolderName: "",
        accountNumber: "",
        bankName: "",
        ifscCode: "",
      }}
      validationSchema={WithdrawSchema}
      onSubmit={handleSubmit}
    >
      {({}) => (
        <Form>
          {/* Amount */}
          <div>
            <AuthInput
              label="Amount"
              name="amount"
              type="number"
              placeholder="Enter withdrawal amount"
              required
              prefix="₹"
            />
          </div>

          {/* Account Holder's Name */}
          <div>
            <AuthInput
              label="Account Holder's Name"
              name="accountHolderName"
              type="text"
              placeholder="Enter account holder's name"
              required
              prefix=""
              icon={<AiOutlineUser />}
            />
          </div>

          {/* Account Number */}
          <div>
            <AuthInput
              label="Account Number"
              name="accountNumber"
              type="text"
              prefix=""
              placeholder="Enter account number"
              required
              icon={<AiOutlineUser />}
            />
          </div>

          {/* Bank Name */}
          <div>
            <AuthInput
              label="Bank Name"
              name="bankName"
              type="text"
              prefix=""
              placeholder="Enter bank name"
              required
              icon={<AiOutlineUser />}
            />
          </div>

          {/* IFSC Code */}
          <div>
            <AuthInput
              label="IFSC Code"
              name="ifscCode"
              type="text"
              placeholder="Enter IFSC code"
              required
              prefix=""
              icon={<AiOutlineUser />}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default WithdrawAmount;
