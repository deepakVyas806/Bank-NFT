import axios from "axios";
import { axiosPrivate } from "../ApiServices/Axios";

export interface OrderDetails {
  amount: string;
  currency: string;
  receipt: string;
  productid: string;
  daily_income: string;
  total_income: string;
}

const PayUsingRazorpar = async (
  orderDetails: OrderDetails,
  onSuccess?: () => void,
  onFailure?: (error: any) => void
) => {
  try {
    const response = await axiosPrivate.post("api/v1/order", orderDetails);
    const order = response.data;

    const options = {
      key: "rzp_test_Oz09n2OkZmcgNQ",
      amount: order.data.amount,
      currency: orderDetails.currency,
      name: "Snook Coder",
      description: "Test Transaction",
      order_id: order.data.id,
      callback_url: "http://localhost:4000/api/v1/dashboard",
      prefill: {
        name: "Deepak Vyas",
        email: "vyasdeepak608@gmail.com",
        contact: "6378506435",
      },
      theme: {
        color: "#F37254",
      },
      handler: () => {
        console.log("Payment successful");
        if (onSuccess) onSuccess();
      },
      modal: {
        ondismiss: async () => {
          console.log("Payment modal closed or payment failed");
          const failureResponse = await axios.post(
            "api/v1/payment-failure",
            { orderId: order.data.id, status: "failed" },
            { withCredentials: true }
          );
          console.log("Payment Failure:", failureResponse.data);
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
