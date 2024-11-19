import mongoose from "mongoose";
import { register_model } from "../../model/register.model.js";
import { withdraw_model } from "../../model/with_draw.js";
import { response_message } from "../../responses.js";

//all withdrawl list 
const withdraw_list = async(req,res)=>{
    try {
      
      const userId = req.access_verification._id;
      const user = await register_model.findOne({ _id: userId });

      const withdraws = await withdraw_model.find();
  
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
        
       const individual_withdraw = await withdraw_model.find({userId:userId});

       if(!individual_withdraw){
       return  response_message(res,400,false, 'no withdarw available',null);

       }

       return response_message(res,200,true,"here is the individual withdraw",individual_withdraw)
        
      } catch (error) {
        return response_message(res,500,false,"catch error in indi withraw api",error.message)
      }
  }


  //withdraw staus -   staus only said to paid,reject
  const withdraw_status = async(req,res)=>{
   try {
     const userId = req.access_verification._id;
     const user = await register_model.findOne({ _id: userId });

     const {status,refId} = req.body;

     //change the refId into monbgoose opbject so good for compare
     const stringId = refId.replace('#', '');
     console.log("stringId",stringId)
     const refObjectId = await new mongoose.Types.ObjectId(stringId);
     console.log("refObjectId",refObjectId)
     
     //non admin user cant change the status
     if(user.role=='user'){
       return response_message(res,400,false,'dont have permission to change the status',null)
     }

    //admin user functionlaity to change the status
    
    //find the ref id in withdraw model
    const withdraw_entry = await withdraw_model.findOne({_id:refObjectId});
    console.log("withdraw entry",withdraw_entry);
    
    //prevent from multiple status set top paid and reject
    if(withdraw_entry.status==='paid' || withdraw_entry.status==='reject'){
      return response_message(res,400,false,'status is already set and  its not in process state',null)
    }

    //change the status
    withdraw_entry.status = status;
    withdraw_entry.save();
    return response_message(res,200,true,'status update succesfully',withdraw_entry)

   } catch (error) {
      return response_message(res,500,false,'error in catch withdraw staus',error.message)
   }
     
  }

  export { withdraw_list,user_withdraw ,withdraw_status};
