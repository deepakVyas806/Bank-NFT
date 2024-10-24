const payNow = async () => {
  try {
    // Make sure the request sends cookies
    const response = await axiosPublic.post(
      "api/v1/order",
      {
        amount: amount,
        currency: 'INR',
        receipt: 'receipt#1',
        productid: '6718b6c9c6c923c43f7e4a12',
        daily_income: 100,
        total_income: 100,
      },
      {
        withCredentials: true, // Make sure credentials (cookies) are included
      }
    );

    const order = response.data;
    console.log("order", order);

    // Open Razorpay Checkout (this part stays the same)
    const options = {
      key: 'rzp_test_Oz09n2OkZmcgNQ',
      amount: order.data.amount,
      currency: 'INR',
      name: 'Snook Coder',
      description: 'Test Transaction',
      order_id: order.data.id,
      callback_url: 'http://localhost:4000/api/v1/payment-success',
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#F37254',
      },
      modal: {
        ondismiss: async function () {
          console.log('Payment modal closed or payment failed');

          // Send the failure status to your backend using Axios
          const failureResponse = await axiosPublic.post(
            'api/v1/payment-failure',
            {
              orderId: order.data.id,
              status: 'failed',
            },
            {
              withCredentials: true, // Ensure cookies are sent in case of failure
            }
          );

          console.log('Payment Failure:', failureResponse.data);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Payment Error:', error);
  }
};
