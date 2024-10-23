import express from "express";
import { order_create } from "../../controller/payment.controller.js/order.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";



const payment = express.Router();

//creat the razorpay order
payment.post('/order',verifyToken,order_create)


export {payment}