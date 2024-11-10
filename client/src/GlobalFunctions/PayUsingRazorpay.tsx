import axios from "axios";
import { BASE_URL } from "../ApiServices/Axios";
import { showToast } from "../ToastServices/ToastServices";


export interface OrderDetails {
  amount: string;
  currency: string;
  receipt: string;
  productid: string;
  daily_income: string;
  total_income: string;
}

interface RechargeDetails {
  amount: string;
  recharge_id: string;
}

const PayUsingRazorpar = async (
  rechargeOrder: RechargeDetails,
  onSuccess?: () => void,
  onFailure?: (error: any) => void
) => {
  try {
    const options = {
      key: "rzp_test_Oz09n2OkZmcgNQ",
      amount: rechargeOrder.amount,
      currency: "INR",
      name: "AD's Snook Coder",
      description: "Test Transaction",
      order_id: rechargeOrder.recharge_id,
      callback_url: `${BASE_URL}api/v1/payment-success`,
      prefill: {
        name: "Deepak Vyas",
        email: "vyasdeepak608@gmail.com",
        contact: "6378506435",
      },
      theme: {
        color: "#6273bf",
      },
      handler: async (response: any) => {
        console.log("Payment successful", response);
        try {
          await axios.post(
            `${BASE_URL}api/v1/payment-success`,
            {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            } // Send Razorpay response to the server
          );
          if (onSuccess) onSuccess();
          showToast("Payment successful", "success", 1000);
          // console.log("Payment Success Server Response:", successResponse);
        } catch (error) {
          showToast("Error setting payment status", "error", 1000);
          console.error("Error in Payment Success Callback:", error);

        }
      },
      //Success handler
      // handler: function (response: any) {
      //   alert(response.razorpay_payment_id);
      //   alert(response.razorpay_order_id);
      //   alert(response.razorpay_signature);
      // },
      modal: {
        ondismiss: async () => {
          console.log("Payment modal closed or payment failed", rechargeOrder);
          const failureResponse = await axios.post(
            `${BASE_URL}api/v1/payment-failure`,
            { orderId: rechargeOrder.recharge_id, status: "failed" }

          );
          showToast("payment failed", "error", 1000);
          console.log("Payment Failure:", failureResponse);
          if (onFailure) onFailure(failureResponse.data);
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment Error:", error);
    if (onFailure) onFailure(error);
  }
};

export default PayUsingRazorpar;
