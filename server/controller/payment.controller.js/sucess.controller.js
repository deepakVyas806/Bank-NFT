import express from "express";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import { response_message } from "../../responses.js";
import { payment_model } from "../../model/payment.model.js";
import { order_model } from "../../model/order.model.js";
import { product_model } from "../../model/product.model.js";
import { register_model } from "../../model/register.model.js";

const payment_success_con = async (req, res) => {
  try {
    const { paymentId, orderId, signature } = req.body;

    console.log(`req.body of `, req.body);

    if (!paymentId || !orderId || !signature) {
      return response_message(
        res,
        400,
        false,
        `Bad Request - order id, payment id and signature is needed `
      );
    }

    //find the order realted to this entry
    const order = await order_model.findOne({ recharge_id: orderId });

    if (!order) {
      return response_message(
        res,
        404,
        false,
        `Data Not Found - no order find `
      );
    }

    order.payment_orderId = orderId;
    await order.save();

    console.log(`order id set `, order);
    const body = orderId + "|" + paymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.razor_secret) // Use your Razorpay secret key here
      .update(body.toString())
      .digest("hex");
    console.log("expected signature", expectedSignature);
    console.log("originalk signature", signature);

    const isAuthenticate = expectedSignature === signature;

    if (isAuthenticate) {
      //enrty in updated order table
      order.status = "paid";
      order.payment_paymentId = paymentId;
      order.payment_sign = signature;
      await order.save();

      // update the user wallet
      const user = await register_model.findOne({ _id: order.userId });
      user.wallet_balance += order.amount;
      user.save();

      console.log(`order paid `, order);
      // return res.redirect(`https://betting-app-frontend-neon.vercel.app/paymentsuccess?refrence=${razorpay_payment_id}`);
      return response_message(
        res,
        200,
        true,
        "order status changes plese check the user wallet now",
        order
      );
    } else {
      order.status = "failed";
      await order.save();
      return response_message(res, 400, false, `signature niot valid`, null);
    }
  } catch (error) {
    return response_message(
      res,
      500,
      false,
      `razorpay callback fail ${error.message}`,
      null
    );
  }
};

const payment_success_fail = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return response_message(
        res,
        400,
        false,
        "Bad Request - orderId and status needed",
        null
      );
    }

    console.log(`order id `, orderId);
    const order = await order_model.findOne({ recharge_id: orderId });
    console.log(`orderId`, order);
    if (!order) {
      return response_message(
        res,
        404,
        false,
        "Data Not Found - order not found",
        null
      );
    }

    order.status = status;
    await order.save();
    response_message(
      res,
      200,
      false,
      `payment failed and order status updated`,
      order
    );
  } catch (error) {
    response_message(res, 500, false, `error in failure state`, null);
  }
};

export { payment_success_con, payment_success_fail };
