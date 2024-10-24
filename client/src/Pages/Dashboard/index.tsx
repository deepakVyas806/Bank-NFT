import { useState } from 'react';
import { axiosPublic } from '../../ApiServices/Axios';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Dashboard() {
  const [amount, setAmount] = useState('');

  const payNow = async () => {
    try {
      // Create order by calling the server endpoint with Axios
      const response = await axiosPublic.post('/api/v1/order', {
        amount: amount,
        currency: 'INR',
        receipt: 'receipt#1',
        productid: '6718b6c9c6c923c43f7e4a12',
        daily_income: 100,
        total_income: 100
      }, { withCredentials: true });

      const order = response.data;
      console.log("order", order);

      // Open Razorpay Checkout
      const options = {
        key: 'rzp_test_Oz09n2OkZmcgNQ', // API key of Razorpay
        amount: order.data.amount, // Amount in paise
        currency: 'INR',
        name: 'Snook Coder',
        description: 'Test Transaction',
        order_id: order.data.id, // This is the order_id created in the backend
        callback_url: 'http://localhost:4000/api/v1/payment-success', // Your success URL
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        modal: {
          ondismiss: async function () {
            console.log('Payment modal closed or payment failed');

            // Send the failure status to your backend using Axios
            const failureResponse = await axiosPublic.post('/api/v1/payment-failure', {
              orderId: order.data.id, // Pass the order ID to identify the failed transaction
              status: 'failed',
            });

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

  return (
    <div>
      <h1>Razorpay Payment Gateway Integration</h1>
      <form id="payment-form" onSubmit={(e) => { e.preventDefault(); payNow(); }}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}
