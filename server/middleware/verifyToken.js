import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';


const verifyToken = async(req,res,next)=>{
    
    const refresh_token = req.body.refresh_token || req.cookies.refresh_token || req.headers.Authorization?.split(" ")[1];
    const access_token = req.body.access_token || req.cookies.access_token || req.headers.Authorization?.split(" ")[1];
    console.log(`accessTOken - ${access_token} and refresh token ${refresh_token}`);
   
    //verify the token
    try {
        
        if(!access_token && !refresh_token){
              res.status(500).json({success:false,message:'please send atleast one token'})
        }
 
        //acces token checks 
        if(access_token){
           
           try {
             const decode  = jwt.verify(access_token,process.env.access_token);
            req.decode = decode;
            return next();

           } catch (error) {
               return res.status(500).json({success:false,message:`acces token is expire or check the error `,error:error.message})
           }
        }


     //refresh token checks 
     if(refresh_token){
           
        try {
         const decode  = jwt.verify(refresh_token,process.env.refresh_token);
         req.decode = decode;
         return next();

        } catch (error) {
            return res.status(500).json({success:false,message:`refresh  token is expire or check the error `,error:error.message})
        }
     }


    } catch (error) {
        return res.status(500).json({success:false,message:'error in verify toiken catch in backend',error:error.messsage})
    }


    
}




export {verifyToken}