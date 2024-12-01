import mongoose from "mongoose"

const transactionSchema = mongoose.Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user_register"
    },
    
    transactionId:{
        type:String,
    },

    status:{
        type:Number
    },
    amount:{
        type:Number,

    },

    createdAt:{
        type:Number,
        default:()=>Math.floor(Date.now()/1000)
    },
    updatedAt:{
        type:Number,
        default:()=>Math.floor(Date.now()/1000)
    }

})

transactionSchema.pre('save',function(next){
    this.updatedAt = Math.floor(Date.now/1000);
    next();
})

const transaction_model = await mongoose.model('Transaction',transactionSchema)

export {transaction_model}