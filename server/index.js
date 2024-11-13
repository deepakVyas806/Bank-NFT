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
  // HTML content with a banner image, title, and Snooker image
  const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Team Snooker Coder</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9; /* Light background */
                    text-align: center;
                    padding: 0;
                    margin: 0;
                }
                header {
                    background-color: #4CAF50; /* Green color */
                    color: white;
                    padding: 20px 0;
                }
                h1 {
                    margin: 0;
                    font-size: 36px;
                }
                .banner {
                    width: 100%;
                    height: auto;
                }
                #snookerImage {
                    width: 300px; /* Set desired width */
                    height: auto;
                    margin: 20px 0;
                }
                footer {
                    margin-top: 20px;
                    padding: 10px 0;
                    background-color: #333;
                    color: white;
                }
            </style>
        </head>
        <body>
            <header>
                <h1>Team Snooker Coder</h1>
            </header>
            <img class="banner" src="	https://t3.ftcdn.net/jpg/02/96/61/94/360_F_296619471_iEGweTy9VsokHtbCJsVmyez0d2rocmmA.jpg" alt="Banner Image" />
            
            <footer>
                <p>&copy; 2024 Team Snooker Coder. All rights reserved.</p>
            </footer>
        </body>
        </html>
    `;
  res.send(htmlContent);
});
// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`Server started at ${PORT} and database connected`);
      //await register_model.deleteMany({});
      //  await product_model.deleteMany({});
      //  await pro_inv.deleteMany({});
      // await order_model.deleteMany();
      //await user_product_model.deleteMany();
      // console.log("all products are delete");
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error.message);
  });
