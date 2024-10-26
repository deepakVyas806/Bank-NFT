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
    const order = response.data.payload;
    const options = {
      key: "rzp_test_Oz09n2OkZmcgNQ",
      amount: order.amount,
      currency: orderDetails.currency,
      name: "Snook Coder",
      description: "Test Transaction",
      order_id: order.orderId,
      callback_url: "http://localhost:4000/api/v1/payment-success", //we can change this not immedidate beacuse below handler works for us for success
      prefill: {
        name: "Deepak Vyas",
        email: "vyasdeepak608@gmail.com",
        contact: "6378506435",
      },
      theme: {
        color: "#F37254",
      },
      // This handler runs after a successful payment.
      handler: async (response: any) => {
        console.log("Payment successful");

        // Call your backend success API with the Razorpay response details.
        try {
          const successResponse = await axiosPrivate.post(
            "api/v1/payment-success",
            {
              orderId: order.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }
          );
          console.log("Payment success response:", successResponse.data);
          if (onSuccess) onSuccess();
        } catch (error) {
          console.error("Error in success API call:", error);
          if (onFailure) onFailure(error);
        }
      },
      modal: {
        ondismiss: async () => {
          console.log("Payment modal closed or payment failed");
          const failureResponse = await axiosPrivate.post(
            "/api/v1/payment-failure",
            { orderId: order.orderId, status: "failed" }
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
