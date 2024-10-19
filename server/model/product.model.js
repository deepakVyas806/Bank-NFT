import mongoose from "mongoose";

const product_schema = new mongoose.Schema({
    product_name:{
        type:String
    },
    product_price:{
        type:Number
    },

    daily_income:{
        type:Number,
    },

    product_image:{
        type:String
    },

    validity:{
        type:Number
    },

    total_income:{
        type:Number,
    },

    purcahse_limit:{
        type:Number
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

product_schema.pre('save', function (next) {
    this.update_At = Date.now(); // Update the 'update_At' field to the current date
    next();
});


export const product_model = mongoose.model('product',product_schema)