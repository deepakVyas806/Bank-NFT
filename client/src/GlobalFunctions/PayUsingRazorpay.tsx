import axios from "axios";
import { BASE_URL } from "../ApiServices/Axios";

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
  recharge_id:string,
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
      currency: 'INR',
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
      handler: () => {
        console.log("Payment successful");
        if (onSuccess) onSuccess();
      },
      modal: {
        ondismiss: async () => {
          console.log("Payment modal closed or payment failed",rechargeOrder);
          const failureResponse = await axios.post(
            `${BASE_URL}api/v1/payment-failure`,
            { orderId: rechargeOrder.recharge_id, status: "failed" },
          );
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
