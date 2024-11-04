import express from "express";
import { recharge_create } from "../../controller/payment.controller.js/order.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const payment = express.Router();

//creat the razorpay order
payment.post("/recharge_wallet", verifyToken, recharge_create);

export { payment };
