import mongoose, { mongo } from "mongoose";

const payment_schema = new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    user_id: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user_register"
    },
    razorpay_payment_id:{
        type:String
    },
    razorpay_order_id:{
        type:String
    },
    razorpay_signature:{
        type:String
    }

})

export  const payment_model = mongoose.model("payment",payment_schema)