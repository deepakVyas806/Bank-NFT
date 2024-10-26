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
  
  
   try {
      console.log(`req.body of after the order`,req.body)
      const {paymentId,orderId,signature} = req.body
     

      if(!paymentId || !orderId || !signature){
         return response_message(res,400,false,`Bad Request - order id, payment id and signature is needed `)
      } 

      console.log("payment order and signature and payment id ",req.body)

      //find the order realted to this entry
      const order = await order_model.findOne({orderId:orderId})
  
      if(!order){
         return response_message(res,404,false,`Data Not Found - no order find `)
      }

      order.payment_orderId=orderId;
      await order.save();

      console.log(`order id set `,order)
      const body = orderId + '|' + paymentId;

      const expectedSignature = crypto
      .createHmac('sha256', process.env.razor_secret)  // Use your Razorpay secret key here
      .update(body.toString())
      .digest('hex');
      console.log('expected signature',expectedSignature);
      console.log('originalk signature',signature)

      const isAuthenticate = expectedSignature === signature;

      if(isAuthenticate){
       //enrty in updated order table
       order.status = 'paid';
       order.payment_paymentId=paymentId;
       order.payment_sign = signature;
       await order.save();
    
       //new investment enrtry created
       //find the corresponding product 
       const product_details = await product_model.findOne({_id:order.productId})
       console.log(`product details after succes `,product_details)
        const user_investment = await pro_inv.create({
          userId:order.userId,
          productId:order.productId,
          investment_amount:order.amount,
          daily_income:order.daily_income,
          total_income:order.total_income ,
          end_date:Math.floor(Date.now()/1000) + product_details.validity * 24 * 60 * 60
       })

       const investment = await user_investment.save();
        
         console.log('payment entry save succesfully ',order)
        // return res.redirect(`https://betting-app-frontend-neon.vercel.app/paymentsuccess?refrence=${razorpay_payment_id}`);
        return response_message(res,200,true,'order and investment entries are done- payment succesfully chekced',investment)
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

const payment_success_fail = async(req,res)=>{

   try {
      const {orderId,status} = req.body

      if(!orderId||!status){
         return response_message(res,400,false,'Bad Request - orderId and status needed',null)
      }

      console.log(`order id `,orderId)
      const order = await order_model.findOne({orderId:orderId})
   
      if(!order){
         return response_message(res,404,false,'Data Not Found - order not found',null)
      }

      order.status = status;
      await order.save();
      response_message(res,200,false,`payment failed and order status updated`,order)
   } catch (error) {
      response_message(res,500,false,`error in failure state`,null)
   }
}

export {payment_success_con,payment_success_fail}
