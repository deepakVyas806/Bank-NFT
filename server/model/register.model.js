import mongoose from "mongoose";

const register_schema = new mongoose.Schema({

    username:{
        type:String,
        default:'root@username'
    },
    firstname:{
        type:String,
        default:'root@firstname'
    },
    lastname:{
        type:String,
        default:'root@lastname'
    },
    email:{
        type:String,
        default:'root@email.com'
    },
    phone:{
        type:String,
        default:'********234'
    },
    otp:{
        type:Number,
        default:"****"
    },
    referral:{
        type:String,
        default:'root@referral'
    },
    password:{
        type:String,
        default:'root@passowrd'
    },
    otp:{
       type:String,
       default:'***123'
    },
    cpassword:{
        type:String,
        default:'root@cpassowrd'
    },
    refreshToken:{
        token:{
        type:String,
        default:null
        },
        expiryDate:{
            type:Date,
            default:null
        }
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
    
})

export const register_model = mongoose.model('user_register',register_schema)