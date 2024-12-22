import mongoose, { mongo, Mongoose } from "mongoose";

//o meanms oppsoitye
//s meanms self 

const referralSchema = new mongoose.Schema({
    
    user_referral_o:{
        user_referral_code_o:{type:String,default:'demo'},
        user_id_o:{type:mongoose.Schema.Types.ObjectId,ref:"user_register"}
    },

    user_referral_s:{
        user_referral_code_s:{type:String,default:'demo'},
        user_id_s:{type:mongoose.Schema.Types.ObjectId,ref:"user_register"}
    },

    activated_bonus:{
        type:Boolean,
        default:false
    },

    createdAt:{
        type:Number,
        default:()=>Math.floor(Date.now()/1000),
    },
    updatedAt:{
          type:Number,
          default:()=>Math.floor(Date.now()/1000)
    }
    
})

referralSchema.pre('save',function(next){
   this.updatedAt = Math.floor(Date.now()/1000);
   next();
})

export const referral_model = mongoose.model("referral",referralSchema)