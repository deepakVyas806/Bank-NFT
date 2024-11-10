import mongoose, { mongo } from "mongoose";

const sessionSchema = mongoose.Schema({
  email: {
    type: String,
  },
  otp: {
    type: String,
  },
  expiresAt: {
    type: Number,
    default: Math.floor(Date.now() / 1000) + 5 * 60,
    index: { expires: "5m" },
  },
});

export const sessionData = mongoose.model("session_data", sessionSchema);
