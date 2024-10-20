import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router/general.route.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import multer from 'multer';
import morgan from "morgan";
import { fileURLToPath } from 'url';
import { logger } from "./logger.js";
import { proute } from "./router/product.route.js/add_Product.route.js";
import { invest_route } from "./router/product.route.js/invest.route.js";
import './controller/cronjob.js';

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 4000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
console.log(__filename)
const __dirname = path.dirname(__filename);
console.log(__dirname);
console.log(path.join(__dirname, 'public/uploads'))

// Middlewares
app.use(cookieParser());  // Parse cookies
app.use(cors({
    origin: true, // Allow all origins (update for production)
    credentials: true  // Allow credentials (required for cookies)
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Parse form data
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Morgan logging to both console and database
app.use(morgan('combined', {
  stream: {
      write: (message) => {
          logger.info(message.trim());
      }
  }
}));

// Routes
app.get("/", (req, res) => {
  console.log('cookies',req.cookies)
  res.status(200).json({ success: true, message: "GET READY SNOOK_CODERS" });
});



app.use('/api/v1', router);  // User routes
app.use('/api/v1', proute)
app.use('/api/v1',invest_route);  // Product-related routes

// Database Connection
try {
  const db = await mongoose.connect(process.env.MONGO_URL);
  if (db) {
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT} and database connected`);
    });
  }
} catch (error) {
  console.log("Database connection error:", error);
}
