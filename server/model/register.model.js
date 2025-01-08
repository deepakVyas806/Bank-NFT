import mongoose from "mongoose";

const register_schema = new mongoose.Schema({
  username: {
    type: String,
    default: "root@username",
  },
  firstname: {
    type: String,
    default: "root@firstname",
  },
  lastname: {
    type: String,
    default: "root@lastname",
  },
  email: {
    type: String,
    default: "root@email.com",
  },
  phone: {
    type: String,
    default: "********234",
  },
  otp: {
    type: Number,
    default: 0, // Use 0 or null for default number
  },
  referral: {
    type: String,
    default: "root@referral",
  },
  referral_amount: {
    type: Number,
    default: "0",
  },
  referral_amount_status: {
    type: Boolean,
    default: "false",
  },

  selfReferral: {
    type: String,
    default: "root@referral",
  },
  referal_income: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: true, // Consider making this required
  },
  cpassword: {
    type: String,
    required: true, // Consider making this required
  },
  refreshToken: {
    token: {
      type: String,
      default: null,
    },
    expiryDate: {
      type: Number,
      default: () => Math.floor(Date.now() / 1000),
    },
  },
  wallet_balance: {
    type: Number,
    default: 0,
  },
  withdrawl_balance: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  createdAt: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000), // Set default for createdAt
  },
  updatedAt: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000), // Set default for updatedAt
  },
});

// Middleware to set updatedAt before saving
register_schema.pre("save", function (next) {
  this.updatedAt = Math.floor(Date.now() / 1000);
  next();
});

// Create the model from the schema
export const register_model = mongoose.model("user_register", register_schema);
