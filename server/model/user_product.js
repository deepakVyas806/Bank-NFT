import mongoose, { mongo } from "mongoose";

const user_product_schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_register",
  },

  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },

  daily_income: {
    type: Number,
    default: 0,
  },

  total_income: {
    type: Number,
    default: 0,
  },

  last_run: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },

  withdrawl_flag: {
    type: Number,
    default: 0,
  },

  validity: {
    type: Number,
    default: 0,
  },

  start_date: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },

  end_date: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },

  createdAt: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },
  updatedAt: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },
});

user_product_schema.pre("save", function (next) {
  this.updatedAt = Math.floor(Date.now() / 1000);
});

export const user_product_model = mongoose.model(
  user_product,
  user_product_schema
);
