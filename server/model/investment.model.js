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
    start_date:{
        type:Date,
        default:Date.now
    },
    last_run:{
        type:Date,
        default:Date.now
    },
    end_date:{
        type:Date,
    },
    
    created_At:{
        type:Date,
        default:Date.now
    },
    update_At:{
        type:Date,
        default:Date.now
    }
})

investmentSchema.pre('save', function (next) {
    this.update_At = Date.now(); // Update the 'update_At' field to the current date
    next();
});


export const pro_inv = mongoose.model('investment',investmentSchema)

