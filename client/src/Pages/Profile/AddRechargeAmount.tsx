import React, { useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import AuthInput from "../../Components/Input/AuthInput";
import * as Yup from "yup";
import { AiFillMoneyCollect } from "react-icons/ai";

interface AddRechargeAmountProps {
  rechargeAmount: number; // The initial recharge amount to display
  setRechargeAmount: (amount: number) => void; // Function to update recharge amount in parent
}

const AddRechargeAmount: React.FC<AddRechargeAmountProps> = ({
  rechargeAmount,
  setRechargeAmount,
}) => {
  // Preset amounts array
  const presetAmounts = [100, 200, 500, 1000, 2000];

  // Form validation schema
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("Amount is required")
      .min(100, "Minimum amount is 100"),
  });

  // Custom component for updating parent state when Formik changes
  const SyncAmountWithParent: React.FC = () => {
    const { values } = useFormikContext<{ amount: number }>();
    useEffect(() => {
      setRechargeAmount(values.amount);
    }, [values.amount]);
    return null;
  };

  // Common style for preset amount boxes
//   #1B84FF
  const presetBoxStyle =
    "flex-1 px-2 py-1.5 text-center rounded-md border border-gray-200 text-sm font-medium text-gray-600 bg-white cursor-pointer";

  return (
    <Formik
      initialValues={{ amount: rechargeAmount }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Submitted amount:", values.amount);
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          {/* Sync Formik value with parent component */}
          <SyncAmountWithParent />

          {/* AuthInput for entering custom amount */}
          {/* <Field
            name="amount"
            component={AuthInput}
            type="number"
            placeholder="Enter amount"
            label="Amount"
            icon={null}
            prefix=""
            required
          /> */}

          {/* Preset Amount Boxes */}
          <div className="flex space-x-1">
            {presetAmounts.map((presetAmount) => (
              <div
                key={presetAmount}
                className={presetBoxStyle}
                onClick={() => setFieldValue("amount", presetAmount)}
              >
                ₹ {presetAmount}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <AuthInput
              label="Amount"
              name="amount"
              type="decimal"
              placeholder="Enter recharge amount"
              prefix='₹'
              icon={<AiFillMoneyCollect />}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddRechargeAmount;
