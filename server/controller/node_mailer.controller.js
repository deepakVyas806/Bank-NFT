import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
import nodeMailer from "nodemailer";
import { register_model } from "../model/register.model.js";

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

    // Initialize registerSession object in session if it doesn't exist
    if (!req.session.registerSession) {
      req.session.registerSession = {};
    }

    // Check if the email already has a session
    if (req.session.registerSession[email]) {
      const userSession = req.session.registerSession[email];

      // If the session has expired, delete it and allow a new OTP to be created
      if (Date.now() > userSession.expireAt) {
        delete req.session.registerSession[email];
      } else {
        // If the session is still valid, return a message and do not resend the OTP
        return res.status(200).json({
          success: true,
          message:
            "OTP is already sent. Please wait for 5 minute for it to expire.",
          registerSession: userSession,
          sessionDetails: req.session,
        });
      }
    }

    // Generate a new OTP if the session does not exist or has expired
    let digit = "0123456789";
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += digit[Math.floor(Math.random() * 10)];
    }

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

    // Store the OTP session for this specific email
    req.session.registerSession[email] = {
      register_otp: otp,
      email: email,
      expireAt: Date.now() + 5 * 60 * 1000, // OTP expires in 5 minute
    };

    // Save the session before responding
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error saving session data.",
          error: err.message,
        });
      }

      // Respond with success message
      res.status(200).json({
        success: true,
        message: "OTP has been successfully sent to your email.",
        registerSession: req.session.registerSession[email],
        sessionDetails: req.session,
      });
    });

    // Set timeout to delete the session after 1 minute
    setTimeout(() => {
      if (req.session.registerSession[email]) {
        delete req.session.registerSession[email];
        req.session.save((err) => {
          if (err) {
            console.error("Error deleting expired session:", err);
          } else {
            console.log(
              `OTP session for ${email} has been successfully deleted`
            );
          }
        });
      }
    }, 5 * 60 * 1000); // after 5 minute this sesisoj is dlete
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
