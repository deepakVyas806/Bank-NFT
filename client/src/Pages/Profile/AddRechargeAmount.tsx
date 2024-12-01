import React, { useState, forwardRef } from "react";
import { Formik, Form } from "formik";
import AuthInput from "../../Components/Input/AuthInput";
import * as Yup from "yup";
import { AiFillMoneyCollect } from "react-icons/ai";
import { QRCodeSVG } from "qrcode.react";
import { useMediaQuery } from "react-responsive";
import { FaCopy, FaRegCopy } from "react-icons/fa";

interface AddRechargeAmountProps {
  formikRef?: React.Ref<any>;
  onSubmit: any;
}

const AddRechargeAmount: React.FC<AddRechargeAmountProps> = forwardRef(
  ({ formikRef, onSubmit }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const [isReferalCodeCopied, setIsReferalCodeCopied] = useState(false);
    const WalletAddress = `TGKgkCyws4TMGYc71kqMPJck4kpQ1Ms8yy`;

    const validationSchema = Yup.object({
      transactionID: Yup.string().required("Transaction ID is required"),
    });
    const handleSubmit = (values: any, { setSubmitting }: any) => {
      onSubmit(values, setSubmitting);
    };
    return (
      <Formik
        initialValues={{ transactionID: "" }}
        validationSchema={validationSchema}
        innerRef={formikRef}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div
              className={`flex flex-col justify-center items-center ${
                isMobile ? "mt-2" : ""
              }`}
            >
              <p className="text-xs font-medium text-gray-600 mb-2">
                Scan and Pay!
              </p>
              <QRCodeSVG value={WalletAddress} size={150} />
              <p className="text-sm font-normal text-gray-600 mt-4 mb-1">
                Or You can deposite amount at below address!
              </p>
              <div
                className="flex flex-col items-center rounded-lg border border-gray-200 p-2 mt-2"
                style={{ boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, .03)" }}
              >
                <p className="text-xs text-gray-500 font-medium mb-0.5">
                  USDT Wallet Address
                </p>
                <div className="flex">
                  <p className="text-sm font-medium text-black">
                    {WalletAddress}
                  </p>
                  <button
                  type="button"
                    className="ml-2"
                    onClick={() => {
                      setIsReferalCodeCopied(true);
                      navigator.clipboard.writeText(WalletAddress);
                      setTimeout(() => {
                        setIsReferalCodeCopied(false);
                      }, 2000);
                    }}
                  >
                    {isReferalCodeCopied ? (
                      <FaCopy size={15} className="mt-0.5" />
                    ) : (
                      <FaRegCopy size={15} className="mt-0.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="border border-t border-gray-200 mt-8 shadow-md"></div>
            <div className="text-xs mb-2 font-medium text-center mt-2">
              After successful payment, Enter transaction ID to verify your
              payment.
            </div>
            <div>
              <AuthInput
                label="Transaction ID"
                name="transactionID"
                type="text"
                placeholder="Enter transaction ID"
                prefix=""
                icon={<AiFillMoneyCollect />}
              />
            </div>
            <div className="text-xs font-medium mt-4 text-gray-400">
              NOTE: Without verifying Transaction ID, amount will not be
              deposited to your account.
            </div>
          </Form>
        )}
      </Formik>
    );
  }
);

export default AddRechargeAmount;
