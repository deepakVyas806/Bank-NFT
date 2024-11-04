import mongoose from "mongoose";

const recharge_schema = new mongoose.Schema({
  recharge_id: {
    type: String,
    required: true, // Make it required if necessary
  },
  amount: {
    type: Number,
    required: true, // Make it required if necessary
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_register",
    required: true, // Make it required if necessary
  },
  status: {
    type: String,
    enum: ["process", "create", "paid", "failed"],
    default: "process",
  },
  receipt: {
    type: String,
  },
  payment_sign: {
    type: String,
    default: null,
  },
  payment_orderId: {
    type: String,
    default: null,
  },
  payment_paymentId: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000), // Use a function to get the current timestamp
  },
  updatedAt: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000), // Use a function for updatedAt as well
  },
});

// Pre-save middleware to update the updatedAt field
recharge_schema.pre("save", function (next) {
  this.updatedAt = Math.floor(Date.now() / 1000); // Update updatedAt to current UNIX timestamp
  next();
});

// Export the model
export const order_model = mongoose.model("order", recharge_schema);
