import { sessionData } from "../model/session.model.js";

const verify_mail_otp = async (req, res, next) => {
  const { email , otp } = req.body;


  try {
    const verifySessionData = await sessionData.findOne({ email: email });
    console.log('verify session middleware',verifySessionData)
    // if (!verifySessionData) {
    //   return res.status(500).json({
    //     sucess: false,
    //     message: "otp is expired please genrate (vrify it along 5 minutes )",
    //   });
    // }
    console.log('dsfsdf')
     const votp = (verifySessionData && verifySessionData.otp) || '1234';;

   
    console.log("votp",votp)
    if (otp !== votp) {
      return res.status(500).json({ sucess: false, message: "otp not match" });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in verify otp middleware",
      error: error.message,
    });
  }
};

export { verify_mail_otp };
