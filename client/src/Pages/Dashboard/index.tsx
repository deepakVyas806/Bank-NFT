import React from 'react';
import axios from 'axios';
import { axiosPrivate } from '../../ApiServices/Axios';

const Dashboard: React.FC = () => {
  const amount = 500; // Example amount, you can replace it with state or props

  const payNow = async () => {
    try {
      const response = await axiosPrivate.post(
        "api/v1/order",
        {
          amount: amount,
          currency: 'INR',
          receipt: 'receipt#1',
          productid: '6718b6c9c6c923c43f7e4a12',
          daily_income: 100,
          total_income: 100,
        },        
      );

      const order = response.data;
      console.log("order", order);

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

            const failureResponse = await axios.post(
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

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button
        onClick={payNow}
        className="bg-blue-500 text-white p-2 rounded-lg"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Dashboard;
