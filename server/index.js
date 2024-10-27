import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // configuration of dot env
const PORT = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "GET READY SNOOK_CODERS" });
});

app.get("/signup", (req, res) => {
  res.json({
    success: true,

    message: "sign up Deepak",
  });
});

try {
  const db = await mongoose.connect(
    "mongodb+srv://root:root@cluster0.qlsvim7.mongodb.net/BET-APP?retryWrites=true&w=majority&appName=Cluster0"
  );
  if (db) {
    app.listen(PORT, () => {
      console.log(`server started at ${PORT} and databse also connected`);
    });
  }
} catch (error) {
  console.log("error databse is not connected ", error);
}
