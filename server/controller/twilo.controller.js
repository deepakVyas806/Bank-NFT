import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';



const client  = twilio(process.env.twilio_accountsid,process.env.twilio_auth_token);


const send_otp_twilio = async(req,res)=>{
    
    const {phone} = req.body;
  try {
     
      let otp = "";
      const digit='0123456789';
      for(let i =0;i<4;i++){
          otp+=digit[Math.floor(Math.random()*10)];
      }
     
      const formattedPhone = phone.startsWith('+91')?phone:`+91${phone}`;
      
      await client.messages.create({
          body:`OTP FOR AD_SNOOK-WEB ${otp}`,
          to:formattedPhone,
          from:process.env.twilio_phone
      })
      req.session.success = true
      req.session.Details = {
          "phone":phone,
          "otp":otp,
         "sessionId":req.sessionID
      }
     
      if(!req.session.success){
        return res.status(500).json({success:false,message:"there is no values store in session"})
      }
      return res.status(200).json({success:true,message:'otp sent succersfully to frontend',otp:otp,sessionDetails:req.session.Details})
  } catch (error) {
    
      return res.status(500).json({success:false,message:"error in twilo send otp in catch",error:error.message})
  }
}

export default send_otp_twilio;