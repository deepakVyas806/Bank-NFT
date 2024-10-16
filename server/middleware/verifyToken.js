import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';


const verifyToken = async(req,res,next)=>{
    
    // const refresh_token = req.body.refresh_token || req.cookies.refresh_token || req.headers.Authorization?.split(" ")[1];
    // const access_token = req.body.access_token || req.cookies.access_token || req.headers.Authorization?.split(" ")[1];
    // console.log(`accessTOken - ${access_token} and refresh token ${refresh_token}`);
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.sendStatus(500).json({success:false,message:'please provide a valid heared '}); // Unauthorized
      };

      const token = authHeader.split(' ')[1];
      console.log(`token`,token)

    
    //verify the token
    try {
        
        if(token){
              res.status(500).json({success:false,message:'please send  token'})
        }
 
        //acces token checks 
        if(token){
           
           try {
            const decode  = jwt.verify(access_token,process.env.access_token);
            req.decode = decode;
            return next();

           } catch (error) {
               return res.status(401).json({success:false,message:`token is expire `,error:error.message})
           }
        }


    } catch (error) {
        return res.status(500).json({success:false,message:'error in verify toiken catch in backend',error:error.messsage})
    }


    
}




export {verifyToken}