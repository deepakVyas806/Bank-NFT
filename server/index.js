import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router/general.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { proute } from "./router/product.route.js/add_Product.route.js";
import { invest_route } from "./router/product.route.js/invest.route.js";
import "./controller/cronjob.js";

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware for CORS and cookie handling
app.use(
  cors({
    origin: true, // Frontend origin (change to your frontend domain in production)
    credentials: true, // Allow credentials (required for cookies)
  })
);

// Middlewares
app.use(cookieParser()); // Parse cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data
// app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  console.log("Request Cookies:", req.cookies); // Log the cookies
  if (!req.cookies.access_token) {
    console.error("No access_token cookie found.");
  } else {
    console.log("Access Token:", req.cookies.access_token);
  }
  res.status(200).json({ success: true, message: "GET READY SNOOK_CODERS" });
});

app.use("/api/v1", router); // User routes
app.use("/api/v1", proute); // Product routes
app.use("/api/v1", invest_route); // Investment routes

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT} and database connected`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error.message);
  });
