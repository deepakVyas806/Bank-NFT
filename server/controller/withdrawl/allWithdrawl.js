import { register_model } from "../../model/register.model.js";
import { withdraw_model } from "../../model/with_draw.js";
import { response_message } from "../../responses.js";

//all withdrawl list 
const withdraw_list = async(req,res)=>{
    try {
      
      const userId = req.access_verification._id;
      const user = await register_model.findOne({ _id: userId });

      const withdraws = await withdraw_model.find({userId:userId});
  
      if(withdraws.length===0){
         return response_message(res,400,false,"no  withdraw right now",null)
      }
  
      return response_message(res,200,true,"list od all withdraws ",withdraws)
  
    } catch (error) {
       return response_message(res,500,false,"catch error in all withdrawe list",error.message)
    }
    
  
  }

  //individual withdraw list 
  const user_withdraw = async(req,res)=>{
      try {
        const userId = req.access_verification._id;
        const user = await register_model.findOne({ _id: userId });
        
       const individual_withdraw = await withdraw_model.findOne({userId:userId});

       if(!individual_withdraw){
       return  response_message(res,400,false, 'no withdarw available',null);

       }

       return response_message(res,200,true,"here is the individual withdraw",individual_withdraw)
        
      } catch (error) {
        return response_message(res,500,false,"catch error in indi withraw api",error.message)
      }
  }

  export { withdraw_list,user_withdraw };