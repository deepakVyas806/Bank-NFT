import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto'
import { response_message } from "../../responses.js";
import { payment_model } from '../../model/payment.model.js';
import { order_model } from '../../model/order.model.js';
import { pro_inv } from '../../model/investment.model.js';
import { product_model } from '../../model/product.model.js';


const payment_success_con = async(req,res)=>{
  
   console.log(req.body);

   try {
      
      
      const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body
      //console.log("req body on failyure",req.body)

      //find the order realted to this entry
      const order = await order_model.findOne({orderId:razorpay_order_id})

      if(!order){
         return response_message(res,400,false,`there is no order pleae buy now`)
      }

      order.payment_orderId=razorpay_order_id;
      await order.save();

      console.log(order)
      const body = razorpay_order_id + '|' + razorpay_payment_id;

      const expectedSignature = crypto
      .createHmac('sha256', process.env.razor_secret)  // Use your Razorpay secret key here
      .update(body.toString())
      .digest('hex');
      console.log('expected signature',expectedSignature);
      console.log('originalk signature',razorpay_signature)

      const isAuthenticate = expectedSignature === razorpay_signature;

      if(isAuthenticate){
       //enrty in updated order table
       order.status = 'paid';
       order.payment_paymentId=razorpay_payment_id;
       order.payment_sign = razorpay_signature;
       await order.save();
    
       //new investment enrtry created
       //find the corresponding product 
       const product_details = await product_model.findOne({_id:order.productId})
       console.log(`product`,product_details)
        const user_investment = await pro_inv.create({
          userId:order.userId,
          productId:order.productId,
          investment_amount:order.amount,
          daily_income:order.daily_income,
          total_income:order.total_income ,
          end_date:new Date(Date.now() + product_details.validity * 24 * 60 * 60 * 1000)
       })

       await user_investment.save();
        
         console.log('payment entry save succesfully ',order)
         return res.redirect(`http://localhost:5173/paymentsuccess?refrence=${razorpay_payment_id}`);
      }
      else{
         order.status = 'failed';
         await order.save();
         return response_message(res,400,false,`signature niot valid`,null)
      }

   } catch (error) {
      return response_message(res,500,false,`razorpay callback fail ${error.message}`,null)
   }

   
}

const paymetn_success_fail = async(req,res)=>{
    
   try {
      const {orderId,status} = req.body
     const order = await order_model.findOne({orderId:orderId})
      order.status = status;
      await order.save();
      response_message(res,500,`payment failed`,null)
   } catch (error) {
      response_message(res,500,`error in failure state`,null)
   }
}

export {payment_success_con,paymetn_success_fail}