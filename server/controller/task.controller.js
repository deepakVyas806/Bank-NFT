import { product_model } from "../model/product.model.js";
import { register_model } from "../model/register.model.js";
import { user_product_model } from "../model/user_product.js";
import { response_message } from "../responses.js";



//product expiry check 
function isProductExpiry(createdAt,validity){
   
    const today = Math.floor(Date.now()/1000);

    //createdAt in milliseconds
    const createdATMs = createdAt ;
    
    //validity in miliscecond
    const validityMs = validity * 24 * 60 * 60;
    console.log("validitMs",validityMs)
    const expiration = createdATMs + validityMs;
    console.log("today",today);
    console.log("expiration",expiration)
    return today>expiration;
}


//buy api:
const buyTask = async(req,res)=>{
  try {
     const {productId} = req.body;
     const user = req.access_verification;
     
     //product is is necessary 
     if(!productId){
        return response_message(res,400,false,'product id is nescceary ',null);
     }
   
     const product = await product_model.findOne({_id:productId});
     if(!productId){
        return response_message(res,400,false,'No Product exist ',null);
     }
   
     console.log("product",product);
     

     //check the product expiry 
     if(isProductExpiry(product.createdAt,product.validity)){
        return response_message(res,400,false,'product is expired ',null)
     }
    
     const user_product = await user_product_model.findOne({user_id:user._id,product_id:productId});

     if(!user_product){
        return response_message(res,400,false,'this product is not assosisate with this user',null)
     }
   
     if(user_product.buy==true){
        return response_message(res,400,false,'wait for next day or sell it ',null)
     }

     if(user_product.buy===true && user_product.sell===true){
        return response_message(res,400,false,'buy or sell both donme ',null)
     }
     
     user_product.buy = true;
     user_product.save();
     return response_message(res,200,true,'buy successfull amount to sell ',user_product)

  } catch (error) {
    return response_message(res,500,false,'erro in buy task api',error.message);
  }
   

}

const sellTask = async(req,res)=>{
    const {productId} = req.body;
    const user = req.access_verification;

   try {
     //product is is necessary 
     if(!productId){
         return response_message(res,400,false,'product id is nescceary ',null);
      }
    
      const product = await product_model.findOne({_id:productId});
      console.log("product",product);
 
       //check the product expiry 
       if(isProductExpiry(product.createdAt,product.validity)){
         return response_message(res,400,false,'product is expired ',null)
      }
     
      const user_product = await user_product_model.findOne({user_id:user._id,product_id:productId});
       
      if(!productId){
        return response_message(res,400,false,'No Product exist ',null);
     }

      if(!user_product){
         return response_message(res,400,false,'this product is not assosisate with this user',null)
      }
 
      if(user_product.buy===false){
         return response_message(res,400,false,'You need to buy first',null)
      }
 
      if(user_product.buy===true && user_product.sell===true){
         return response_message(res,400,false,'buy or sell both donme ',null)
      }
 
      //increaase amount by 3 % and added in withdraw 
      const amount = product.product_price * 3/100;
 
      const curr_user = await register_model.findOne({_id:user._id});
      console.log("curr user",curr_user);
      console.log("amount",amount)
      curr_user.withdrawl_balance += amount;
      await curr_user.save();
      // update the sell flaf 
 
      user_product.sell = true;
      user_product.save();
      return response_message(res,200,true,'sell succesfully  ',user_product)
   } catch (error) {
    return response_message(res,500,false,'erro in sell task api',error.message);
   }


}

export {buyTask,sellTask}