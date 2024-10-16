
//register code 

import dotenv  from 'dotenv';
dotenv.config();
import { register_model } from "../model/register.model.js";
import jwt from 'jsonwebtoken'

const register = async(req,res)=>{

   const {username,fname,lname,email,password,cpassword,phone,otp,referral} = req.body;

   try {
  
    // if(req.Details.otp!==otp){
    //   return  res.status(500).json({success:false,message:"otp not match ",sessionDetails:req.Details});
    // }
     
    //email check 
    const userEmail = await register_model.findOne({email:email});
    if(userEmail){
      return  res.status(500).json({success:false,message:"email is alreay exist"});
    }
  
    //phone check
    const userPhone = await register_model.findOne({phone:phone});
    if(userPhone){
      return  res.status(500).json({success:false,message:"number  is alreay exist"});
    } 
  
     //cpassword nad password  check
     
     if(cpassword!==password){
       return  res.status(500).json({success:false,message:"password and confirm password should be same"});
     } 


    const registerUser =  await  register_model.create({
        username:username,
        firstname:fname,
        lastname:lname,
        email:email,
        phone:phone,
        otp:otp,
        referral:referral,
        password:password,
        cpassword:cpassword
        
    })

    return  res.status(200).json({success:true,message:"user created succesffuly",registerUser});

   } catch (error) {
    return  res.status(500).json({success:false,message:"catch error in register api from backend",error:error.message})
   }

        

}


//login functionality


const login = async(req,res)=>{
    
    const {email,username,login_pass} = req.body;
    //console.log(`email ${email} and ${login_pass}`)
     try {
       
      //username and email check
        if(!username && !email){
            return res.status(500).json({success:false,message:'username or email is required'});
        }

        const existUser = await register_model.findOne({
            $or:[{email:email},{username:username}]
        })
       // console.log(`exist User ${existUser}`)

        //user check 
         if(!existUser){
            return res.status(500).json({success:false,message:'user is not exist please signuo first'})
         }

         //password check
         if(login_pass!==existUser.password){
          return res.status(500).json({success:false,message:'password is not match'})
         }

        
        //create the access token
        const access_token = await jwt.sign({
          type:'access_token',
          _id:existUser._id,
          email:existUser.email
          
        },process.env.access_token,{
          expiresIn:'1m'
        })

        //refresh token 
        const refresh_token = await jwt.sign({
          type:'refresh_token',
          _id:existUser._id,
          email:existUser.email
          
        },process.env.refresh_token,{
          expiresIn:'7d'
        })
        
       // console.log(`refresh token ${refresh_token} abnd access toekn ${access_token}`)
        //save this refresh toiken in database 
      //  console.log(`existUse aa payaa`,existUser)
         existUser.refreshToken.token = refresh_token;
         existUser.refreshToken.expiryDate = Date.now() + 7 * 24 * 60 * 60 * 1000
         try {
          await existUser.save();
       //   console.log('User updated successfully:', existUser);
      } catch (error) {
          console.error('Error saving user:', error.message);
      }

       // console.log(`the tokem is ${access_token}`);


        //set the cookie
      res.cookie('refresh_token', refresh_token, {
        httpOnly: true, // Ensures the cookie is not accessible via JavaScript
        secure: true, // Set true for HTTPS in production
        maxAge: 7 * 24 * 60 *  60 * 1000, // 7 days cookie store 
        sameSite: 'Strict' // CSRF protection
    });
    res.cookie('access_token', access_token, {
      httpOnly: true, // Ensures the cookie is not accessible via JavaScript
      secure: true, // Set true for HTTPS in production
      maxAge:1 * 60 * 1000, // 25 minutes 
      sameSite: 'Strict' // CSRF protection
  });

// remove the passwor dand c passwor from response 
const {password,cpassword, ...logedinUser} = existUser._doc;
//console.log(`logedinUser ${JSON.stringify(logedinUser,null,2)}`) 

// console.log(`log user is ${logUser}`)

        res.status(200).json({success:true,messsage:'user login is successfully',logedinUser,accesstoken:access_token})
         
         
     } catch (error) {
        res.status(200).json({success:false,message:'error in login catch   api',error:error.message})
     }
}


const refresh = async(req,res)=>{
  const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.sendStatus(500).json({success:false,message:'please provide a valid heared '}); // Unauthorized
      };

      const Frefresh_token  = authHeader.split(' ')[1];
  console.log(`req decode data ${JSON.stringify(req.decode)}`);
try {
    const user  = await register_model.findById(req.decode._id);
    if(!user){
      return res.status(500).json({success:false,message:'invalid token no user present entries present '})
    }

    if(Frefresh_token !== user.refreshToken.token){
      return res.status(500).json({success:false,message:'token is invalid (may be you are sending the access token or old refresh token)'})
    }
  
     //create the access token
     const access_token = await jwt.sign({
      _id:user._id,
      email:user.email
      
    },process.env.access_token,{
      expiresIn:'1m'
    })
  
   

    //refresh token 
    const refresh_token = await jwt.sign({
      _id:user._id,
      email:user.email
      
    },process.env.refresh_token,{
      expiresIn:'7d'
    })
  
    user.refreshToken.token = refresh_token;
    user.refreshToken.expiryDate = Date.now() + 7 * 24 * 60 * 60 * 1000;
    try {
      user.save();
    } catch (error) {
       console.log('error in saving the refresh token in use table ')
    }



    //set the cookie
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true, // Ensures the cookie is not accessible via JavaScript
      secure: true, // Set true for HTTPS in production
      maxAge: 7 * 24 * 60 *  60 * 1000, // 7 days cookie store 
      sameSite: 'Strict' // CSRF protection
  });
  res.cookie('access_token', access_token, {
    httpOnly: true, // Ensures the cookie is not accessible via JavaScript
    secure: true, // Set true for HTTPS in production
    maxAge:1 * 60 * 1000, // 25 minutes 
    sameSite: 'Strict' // CSRF protection
});
  
    return res.status(200).json({success:true,message:'access and refresh token new genearted',acces_token:access_token});
  
    
} catch (error) {
    return res.status(500).json({'error in catch of verifuication':error.message})
}

}

export {register,login,refresh};