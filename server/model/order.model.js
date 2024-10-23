import mongoose, { mongo } from 'mongoose';

const order_schmea = new mongoose.Schema({

    orderId:{
        type:'String'
    },
    amount:{
        type:Number
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user_register"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    status:{
        type:String,
        enum:['process','create','paid','failed'],
        default:'process'
    },
    receipt:{
        type:String
    },
    payment_sign:{
        type:String
    },
    payment_orderId:{
        type:String
    },
    payment_paymentId:{
        type:String
    },
    daily_income:{
        type:Number
    },
    total_income:{
        type:Number
    }
})


export const order_model = mongoose.model('order',order_schmea)