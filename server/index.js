import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router/general.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { proute } from "./router/product.route.js/add_Product.route.js";
import "./controller/cronjob.js";
// import { profileData } from "./controller/cronjob.js";
import { payment } from "./router/payment/payment.router.js";
import { payment_success } from "./router/payment/sucess.router.js";
// import { register_model } from "./model/register.model.js";
import { order_model } from "./model/order.model.js";
import { user_product_model } from "./model/user_product.js";
import { sessionData } from "./model/session.model.js";
// import {product_model} from "../server/model/product.model.js"
// import { pro_inv } from "./model/investment.model.js";

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware for CORS and cookie handling
app.use(
  cors({
    origin: true,
    credentials: true, // Allow credentials (required for cookies)
  })
);

// Middlewares
app.use(cookieParser()); // Parse cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data
// app.use("/uploads", express.static("uploads"));

app.use("/api/v1", router); // User routes
app.use("/api/v1", proute); // Product routes
// app.get("/api/v1/profile", profileData);
//this route related to payment verification and the orde creation
app.use("/api/v1", payment),
  //payment success call back
  app.use("/api/v1", payment_success);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "worked get request - snook coder",
  });
});
// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`Server started at ${PORT} and database connected`);

      //just for clearing the data from mongoose

      //await register_model.deleteMany({});
      //  await product_model.deleteMany({});
      //  await pro_inv.deleteMany({});
      // await order_model.deleteMany();
      //await user_product_model.deleteMany();
      // await sessionData.deleteMany({});
      // console.log("all products are delete");
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error.message);
  });
