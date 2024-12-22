import express from "express";
import { product_model } from "../../model/product.model.js";
import { user_product_model } from "../../model/user_product.js";
import { register_model } from "../../model/register.model.js";
import {response_message} from "../../responses.js"
import { referral_model } from "../../model/referal.model.js";

//constroller to get the products

const get_product = async (req, res) => {
  const product = await product_model.find().sort({ createdAt: -1 });

  try {
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Date Not Found - product not availabvle",
      });
    }

    return res.status(200).json({
      success: true,
      message: "list of all products successfulyy",
      payload: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "erro in get api",
      error: error.message,
    });
  }
};

// Controller to buy a product
const buy_product = async (req, res) => {
  try {
    const { invest_amount, daily_income } = req.body;
    const { product_id } = req.params;
    const user_id = req.access_verification._id;
    
    // Check the user's wallet balance
    const user = await register_model.findOne({ _id: user_id });
    if (!user) {
      return response_message(res, 404, false, "User not found", null);
    }
    if (user.wallet_balance < invest_amount) {
      return response_message(res, 400, false, "Insufficient balance in recharge wallet. Please recharge.", null);
    }

    // Find the product
    const product = await product_model.findOne({ _id: product_id });
    if (!product) {
      return response_message(res, 404, false, "Product not found", null);
    }

    // Create a new entry in user_product table
    const up_data = await  user_product_model.create({
      user_id: user_id,
      product_id: product_id,
      daily_income: daily_income,
      invest_amount: invest_amount,
      validity: product.validity,
      end_date: Math.floor(Date.now() / 1000) + product.validity * 24 * 60 * 60,
    });


    console.log("up:", up_data);

    // Deduct the investment amount from the user's wallet balance
    user.wallet_balance -= invest_amount;
    await user.save();

    // Find the user product entry after creation (this step is optional since `up` already contains the data)
    const user_product = await user_product_model.findOne({ user_id: user_id, product_id: product_id });
    console.log("user product:", user_product);
 
    //make the activated_bonus false in referral table and add the 10 % of the product amount in qwithrdwa balacjke and refeeral abaklce both 
    const referral_data = await referral_model.findOne({
       "user_referral_s.user_id_s":user_id
    })
    
    console.log("referral dtaa to upodated",referral_data);
    
    // if it is false then only update the things 
    if(referral_data.activated_bonus===false){

      const referral_user_o = await register_model.findOne({_id:referral_data.user_referral_o.user_id_o});
      console.log("referral_user_o register user",referral_user_o)
      const amount = invest_amount * 0.10;
      referral_user_o.referal_income += amount;
      referral_user_o.withdrawl_balance += amount;
      await referral_user_o.save();

      referral_data.activated_bonus = true;
      await referral_data.save();
    }

    return response_message(res, 200, true, "Purchase successful", user_product);

  } catch (error) {
    return response_message(res, 500, false, "Error in buy_product API", error.message);
  }
};



export { get_product, buy_product };
