//register code

import { register_model } from "../model/register.model.js";

const register = async (req, res) => {
  /*
  "username":'aditya',
  "fname":'aditya',
  "lname"'parashar',
  "email":'ap@taketwotechnologies.com',
  "password":'aditya',
  "cpassword":'aditya',
  "phone":'6377280960',
  "otp":'1232',
  "referral":'121',*/

  const {
    username,
    fname,
    lname,
    email,
    password,
    cpassword,
    phone,
    otp,
    referral,
  } = req.body;

  try {
    // if(req.Details.otp!=otp){
    //   return  res.status(500).json({success:false,message:"otp not match ",sessionDetails:req.Details});
    // }

    //email check

    const userEmail = await register_model.findOne({ email: email });
    if (userEmail) {
      return res
        .status(500)
        .json({ success: false, message: "email is alreay exist" });
    }

    //mail otp verification

    const sessionData = req.verifyregisterSession;
    if (
      sessionData[email].email !== email ||
      sessionData[email].register_otp !== otp
    ) {
      return res.status(500).json({ success: false, message: "otp not match" });
    }

    // if(email!==req.verifyregisterSession.)

    //phone check
    const userPhone = await register_model.findOne({ phone: phone });
    if (userPhone) {
      return res
        .status(500)
        .json({ success: false, message: "number  is alreay exist" });
    }

    //cpassword nad password  check

    if (cpassword !== password) {
      return res.status(500).json({
        success: false,
        message: "password and confirm password should be same",
      });
    }

    const registerUser = await register_model.create({
      username: username,
      firstname: fname,
      lastname: lname,
      email: email,
      phone: phone,
      otp: otp,
      referral: referral,
      password: password,
      cpassword: cpassword,
    });

    return res.status(200).json({
      success: true,
      message: "user created succesffuly",
      registerUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "catch error in register api from backend",
      error: error.message,
    });
  }
};

export { register };
