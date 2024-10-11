import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import router from "./router/general.route.js";

dotenv.config(); // configuration of dot env
const PORT = process.env.PORT || 4000;

const app = express();

//Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "GET READY SNOOK_CODERS" });
});

app.get("/signup", (req, res) => {
  res.json({
    success: true,

    message: "sign up Deepak",
  });
});

app.use('/api/v1',router)

try {
  console.log("mongo db url is ",process.env.MONGO_URL)
  const db = await mongoose.connect(process.env.MONGO_URL);
  if (db) {
    app.listen(PORT, () => {
      console.log(`server started at ${PORT} and databse also connected`);
    });
  }
} catch (error) {
  console.log("error databse is not connected ", error);
}
