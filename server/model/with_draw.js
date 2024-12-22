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
 
  status: {
    type: String,
    default: "process",
    enum: ["process", "paid", "reject"],
  },

  USDTWalletAddress:{
    type:String,
    default:'root_usdt'
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
