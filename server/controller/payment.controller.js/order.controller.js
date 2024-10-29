import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
dotenv.config();
import Razorpay from "razorpay";
import { response_message } from "../../responses.js";
import { order_model } from "../../model/order.model.js";

const recharge_create = async (req, res) => {
  try {
    const { amount, receipt } = req.body;

    if (!amount) {
      response_message(res, 400, false, "amount is required", null);
    }

    // Convert productid to ObjectId
    console.log("req access verifuiction", req.access_verification);
    const userId = req.access_verification._id; // Ensure this is set correctly

    // Razorpay order creation
    var instance = new Razorpay({
      key_id: process.env.razor_api,
      key_secret: process.env.razor_secret,
    });

    var options = {
      amount: amount * 100, // Amount in smallest currency unit
      currency: "INR",
      receipt: receipt || "demo_backend_xyz",
    };

    // Create Razorpay order
    const razorOrderData = await instance.orders.create(options);
    console.log("razorOrderData", razorOrderData);
    // Prepare order details
    const orderDetails = {
      recharge_id: razorOrderData.id,
      amount: amount,
      status: "create",
      receipt: receipt,
      userId: userId || "random-user-id",
    };

    // Create and save order
    const order = new order_model(orderDetails);
    await order.save();
    console.log(`order entries in datanase after saving it `, order);
    return response_message(
      res,
      200,
      true,
      `Order created successfully`,
      order
    );
  } catch (error) {
    console.log(`Error in the order_create API: ${error.message}`);
    return response_message(
      res,
      500,
      false,
      `Error in catch API: ${error}`,
      null
    );
  }
};

export { recharge_create };
