import mongoose from "mongoose";

const withdraw_schema = new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user_register'
  },

  amount: {
    type: Number,
    default: 0,
  },
  account_no: {
    type: String,
    default: "demo_account",
  },
  ifsc_code: {
    type: String,
    default: "demo_ifsc",
  },
  bank_name: {
    type: String,
    default: "demo_bank",
  },
  upi_id: {
    type: String,
    default: "demo@bank",
  },
  status: {
    type: String,
    default: "process",
    enum: ["process", "paid", "reject"],
  },
  account_holder_name:{
    type:String,
    default:'demo'
  },
  created_at: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },
  update_at: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  }

});

withdraw_schema.pre("save", function (next) {
  this.update_at = Math.floor(Date.now() / 1000);
  next();
});

export const withdraw_model = mongoose.model("withdraw", withdraw_schema);
