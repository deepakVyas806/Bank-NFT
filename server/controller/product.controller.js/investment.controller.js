import { pro_inv } from "../../model/investment.model.js";
import { product_model } from "../../model/product.model.js";

const invest_user = async(req,res)=>{

    console.log(req.access_verification);
    const {_id} = req.access_verification
    const product_id = req.params.id
    const {investment_amount} = req.body
    console.log(product_id);

    try {
        const product_details = await product_model.findById(product_id);
        if(!product_details){
            return res.status(500).json({success:false,message:'there is no product'})
        }
  
        const daily_income = await investment_amount/product_details.product_price * product_details.daily_income;
        const total_income = await daily_income * product_details.validity
       const user_investment = await pro_inv.create({
          userId:_id,
          productId:product_details._id,
          investment_amount:investment_amount,
          daily_income:daily_income,
          total_income:total_income ,
          end_date:new Date(Date.now() + product_details.validity * 24 * 60 * 60 * 1000)
       })

       const user_inv = await user_investment.save();
       res.status(200).json({success:true,message:'investment works created '})

    } catch (error) {
        console.log(`product details error`,error.message)
    }
    

     
}

export {invest_user}