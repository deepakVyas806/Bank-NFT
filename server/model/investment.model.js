import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user_register'
    },
    investment_amount:{
        type:Number
    },
    daily_income:{
        type:Number
    },
    total_income:{
        type:Number
    },
    profit:{
      type:Number,
      default:0
    },
    last_run:{
        type:Number,
        default:() => Math.floor(Date.now()/1000)
    },
    end_date:{
        type:Number,
        default:() => Math.floor(Date.now()/1000)
    },
    
    created_At:{
        type:Number,
        default:() => Math.floor(Date.now()/1000) //UNIX timestamp in seconds
    },
    update_At:{
        type:Number,
        default:() => Math.floor(Date.now()/1000) //UNIX timestamp in seconds
    }
})

investmentSchema.pre('save', function (next) {
    this.update_At = Math.floor(Date.now()/1000) // Update the 'update_At' field to the current date
    next();
});


export const pro_inv = mongoose.model('investment',investmentSchema)

