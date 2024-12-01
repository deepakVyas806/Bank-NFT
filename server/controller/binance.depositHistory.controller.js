
//deposity history for admin

import { transaction_model } from "../model/binnaceTranscation.model.js";
import { register_model } from "../model/register.model.js";
import { response_message } from "../responses.js"


//deposit hsiootry for the admin

const depositHistory = async(req,res)=>{
     
    try {
        
        //extract the userid and find the login user

        console.log("req access verifuiction", req.access_verification);
   
         //check its role if admin then show otyherwise restrict

         if( req.access_verification.role != 'admin'){
             return response_message(res,400,false,'you are not able to access this endpoint (Not Admin)',null)
         }

         const historyData = await transaction_model.find();
         
         if(!historyData){
            return response_message(res,400,false,'no deposit data availabale ',null)

         }

         return response_message(res,200,true,'fetch deposit successfully',historyData)

        
    } catch (error) {
        return response_message(res,500,false,'error in deposit history of binanace',error.message)
    }
}

//deposit history for the individual user 
const depositINDHistory = async(req,res)=>{
     
    try {
        
        //extract the userid and find the login user

        console.log("req access verifuiction", req.access_verification);
        const userId = req.access_verification._id;
        const loginUser = await register_model.findOne({_id:userId})
        console.log("loginUser",loginUser)


         
         const historyData = await transaction_model.find({userId:loginUser._id});
         
         if(!historyData){
            return response_message(res,400,false,'no deposit data availabale ',null)

         }

         return response_message(res,200,true,'fetch deposit successfully',historyData)

        
    } catch (error) {
        return response_message(res,500,false,'error in deposit history of binanace indivdual ',error.message)
    }
}


export {depositHistory,depositINDHistory}