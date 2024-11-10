import dotenv from "dotenv";
dotenv.config();
import nodeMailer from "nodemailer";
import { sessionData } from "../model/session.model.js";
import { register_model } from "../model/register.model.js";
import { response_message } from "../responses.js";

const mail_otp = async (req, res) => {
  const { email } = req.body;

  /* check for th email alreay exist dont send otp  */
  // const user_exist = await register_model.findOne({ email: email });
  // if (user_exist) {
  //   return res.status(500).json({
  //     success: false,
  //     message: "email already exist can genrate new otp",
  //   });
  // }

  if (!email) {
    response_message(res, 400, false, "email is required", null);
  }

  try {
    // Create the mail transport
    const transport = await nodeMailer.createTransport({
      host: process.env.mail_host,
      port: process.env.mail_port,
      secure: true,
      auth: {
        user: process.env.mail_user,
        pass: process.env.mail_pass,
      },
    });

   // console.log(`transport`,transport)
    //  check entry in databse

    const session_db_data = await sessionData.findOne({ email: email });
   // console.log(session_db_data)
    if (session_db_data) {
      return res.status(500).json({
        success: false,
        message: "wait for 5 minutes otp is not expired yet ",
      });
    }

    // Generate a new OTP if the session does not exist or has expired
    let digit = "0123456789";
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += digit[Math.floor(Math.random() * 10)];
    }
   // console.log(`otp`,otp)
    // Send OTP email
    const mail_send = await transport.sendMail({
      from: "noreply@snookcoder.com",
      to: email,
      subject: `Your Registration OTP is ${otp}`,
      html: `<!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Verification Code</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 50px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .content {
              text-align: center;
              margin-top: 20px;
            }
            .content h1 {
              color: #333333;
            }
            .code {
              font-size: 24px;
              font-weight: bold;
              color: #333333;
              background-color: #f0f0f0;
              padding: 10px;
              border-radius: 5px;
              display: inline-block;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 14px;
              color: #999999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <h1>Your Verification Code</h1>
              <p>Dear User,</p>
              <p>Use the following code to complete your registration:</p>
              <div class="code">${otp}</div>
              <p>This code is valid for 5 minutes.</p>
              <p>Best Regards, <br> The SNOOK_CODER Team</p>
            </div>
          </div>
        </body>
        </html>
        `,
    });
    //console.log(`mail`,mail_send)
    //console.log(`${email},${otp}`);
    const new_session = await sessionData.create({
      email: email,
      otp: otp,
    });

   const session  = await new_session;
  // console.log(`session`,session)

    return res.status(200).json({
      success: true,
      message: "otp send and session created successfull",
      sessionDetails: new_session,
    });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({
      success: false,
      message: "There was an error sending the OTP.",
      error: error.message,
    });
  }
};

export { mail_otp };
