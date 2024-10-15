import mongoose, { mongo } from "mongoose";

const sessionSchema = mongoose.Schema({
  email: {
    type: String,
  },
  otp: {
    type: String,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    index: { expires: "5m" },
  },
});

export const sessionData = mongoose.model("session_data", sessionSchema);
