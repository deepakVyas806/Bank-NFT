import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router/general.route.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'


dotenv.config(); // configuration of dot env
const PORT = process.env.PORT || 4000;

const app = express();

//Middlewares
app.use(cookieParser());
app.use(cors({
    origin:true,
    credentials:true
}))
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "GET READY SNOOK_CODERS" });
});

app.use('/api/v1',router);

try {
  
  const db = await mongoose.connect(process.env.MONGO_URL);
  if (db) {
    app.listen(PORT, () => {
      console.log(`server started at ${PORT} and databse also connected`);
    });
  }
} catch (error) {
  console.log("error databse is not connected ", error);
}
