import express from 'express';
import dotenv from 'dotenv';
import mongoose, { mongo } from 'mongoose';
dotenv.config();
import Razorpay from 'razorpay';
import { response_message } from '../../responses.js';
import { order_model } from '../../model/order.model.js';

console.log(process.env.razor_api )
const order_create = async(req, res) => {

    try {
       
        const {amount,productid,receipt,daily_income,total_income} = req.body;
        console.log(`req.body`,req.body)
        const productId = new mongoose.Types.ObjectId(productid)
        const userId = req.access_verification;
        
        console.log(`userId`,userId)
        var instance = new Razorpay({ key_id:process.env.razor_api , key_secret:process.env.razor_secret})
    
        var options = {
            amount: amount*100,  // amount in the smallest currency unit
            currency: "INR",
            receipt:receipt||"order_rcptid_11",
        };
       const order = await  instance.orders.create(options);
       //dont resolve the fiunstion withinh it 
       //make sure await will work
       
       // entry created in order model 
       await order_model.create({
           orderId:order.id,
           amount:amount,
           status:'create',
           receipt:receipt,
           userId:userId||'random -user-id',
           productId:productId||'random-product-id',
           daily_income:daily_income,
           total_income:total_income
       })

       if(!order){
         return response_message(res,400,false,`order creation fail`,null);
       }

       return response_message(res,200,true,`order carted succesfully`,order)
       

    } catch (error) {
        console.log(`error in the order_create api ${error.message}`);
        return response_message(res, 500, false, `erorr in catch api ${error}`, null)
    }
}

export { order_create }