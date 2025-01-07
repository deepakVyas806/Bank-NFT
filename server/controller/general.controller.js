import dotenv from "dotenv";
dotenv.config();
import { register_model } from "../model/register.model.js";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import { response_message } from "../responses.js";
import { user_product_model } from "../model/user_product.js";
import { withdraw_model } from "../model/with_draw.js";
import { referral_model } from "../model/referal.model.js";

//create the referral code random
function generateReferralCode(length = 8) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const requiredCharacters = "S";
  let referralCode = "";

  // Ensure the referral code contains at least one 'S'
  referralCode += requiredCharacters;

  // Fill the rest of the referral code with random characters
  for (let i = 1; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    referralCode += characters[randomIndex];
  }

  // Shuffle the referral code to randomize the position of 'S'
  referralCode = referralCode
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return referralCode;
}

// Register
const register = async (req, res) => {
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
  console.log(req.body);
  try {
    // Email check
    const userEmail = await register_model.findOne({ email });
    if (userEmail) {
      return res
        .status(500)
        .json({ success: false, message: "Email already exists" });
    }

    // Phone check
    const userPhone = await register_model.findOne({ phone });
    if (userPhone) {
      return res
        .status(500)
        .json({ success: false, message: "Phone number already exists" });
    }

    // Password check
    if (cpassword !== password) {
      return res.status(500).json({
        success: false,
        message: "Password and Confirm Password should match",
      });
    }

    //invitation check
    const referralUsed = await register_model.find({ selfReferral: referral });
    console.log("referaal user", referralUsed);
    if (!referralUsed || referralUsed.length == 0) {
      return response_message(
        res,
        400,
        false,
        "This is not a valid referral",
        null
      );
    }

    const referralCode = generateReferralCode(8);
    console.log("referral code ", referralCode);

    // Register the user
    const registerUser = await register_model.create({
      username,
      firstname: fname,
      lastname: lname,
      email,
      phone,
      otp,
      referral,
      password,
      cpassword,
      selfReferral: referralCode,
    });

    //entry in referral table

    console.log("registerUser", registerUser);

    //get the user oppositee from the register user table so we can storte the id
    const get_user_o = await register_model.findOne({ selfReferral: referral });
    const get_user_s = await register_model.findOne({
      selfReferral: referralCode,
    });

    const referralEntry = await referral_model.create({
      user_referral_o: {
        user_referral_code_o: registerUser.referral,
        user_id_o: get_user_o ? get_user_o._id : null,
      },

      user_referral_s: {
        user_referral_code_s: registerUser.selfReferral,
        user_id_s: get_user_s ? get_user_s._id : null,
      },

      activated_bonus: false,
    });

    console.log("referral entry", referralEntry);

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      payload: { registerUser, referralEntry },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in register API",
      error: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  const { email, username, login_pass } = req.body;

  try {
    // Check for either username or email
    if (!username && !email) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email is required" });
    }

    // Find user by email or username
    const existUser = await register_model.findOne({
      $or: [{ email }, { username }],
    });

    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: "User does not exist. Please sign up first.",
      });
    }

    // Password check
    if (login_pass !== existUser.password) {
      return res
        .status(400)
        .json({ success: false, message: "Password does not match" });
    }
    console.log("existe user", existUser);
    console.log("exist user rople", existUser.role);
    // Generate access token
    const access_token = jwt.sign(
      {
        type: "access_token",
        _id: existUser._id,
        email: existUser.email,
        role: existUser.role,
      },
      process.env.access_token || "AdiAdi", // Use a secure key from .env
      { expiresIn: "20m" } // Extend token expiration for access token
    );
    console.log(access_token);
    // Generate refresh token
    const refresh_token = jwt.sign(
      {
        type: "refresh_token",
        _id: existUser._id,
        email: existUser.email,
        role: existUser.role,
      },
      process.env.refresh_token || "AdiAdi", // Use a secure key from .env
      { expiresIn: "7d" }
    );

    // Save refresh token to database
    existUser.refreshToken = {
      token: refresh_token,
      expiryDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days expiry
    };

    await existUser.save();

    // Set cookies
    res.cookie("REFRESH_TOKEN", refresh_token, {
      httpOnly: true,
      // secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      // sameSite: "Strict",
    });
    res.cookie("ACCESS_TOKEN", access_token, {
      httpOnly: true,
      // secure: true,
      maxAge: 20 * 60 * 1000, // 15 minutes expiry of cookie
      //sameSite: "Strict",
    });

    // Remove sensitive fields before sending response
    const { password, cpassword, ...logedinUser } = existUser._doc;

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      logedinUser,
      accessToken: access_token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in login API",
      error: error.message,
    });
  }
};

// Refresh Token
const refresh = async (req, res) => {
  // console.log('kya bhai access token')
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(500)
      .json({ success: false, message: "No authorization token provided" });
  }

  //decoding for safetyu niot to access aces_token
  const Frefresh_token = authHeader.split(" ")[1];

  //verifuyinf the user

  try {
    const refreshToken = jwt.verify(Frefresh_token, process.env.refresh_token);

    const user = await register_model.findById(refreshToken._id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token: No user found" });
    }

    // if (Frefresh_token !== user.refreshToken.token) {
    //   return res
    //     .status(401)
    //     .json({ success: false, message: "Invalid token: Old Token" });
    // }

    // Create new access token
    const access_token = jwt.sign(
      {
        type: "access_token",
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.access_token || "AdiAdi",
      { expiresIn: "20m" }
    );

    // Create new refresh token
    const refresh_token = jwt.sign(
      {
        type: "refresh_token",
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.refresh_token || "AdiAdi",
      { expiresIn: "7d" }
    );

    // // Update refresh token in DB
    // user.refreshToken.token = refresh_token;
    // user.refreshToken.expiryDate = Date.now() + 7 * 24 * 60 * 60 * 1000;
    // await user.save();

    // Set cookies with new tokens
    res.cookie("REFRESH_TOKEN", refresh_token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });
    res.cookie("ACCESS_TOKEN", access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 20 * 60 * 1000,
      sameSite: "Strict",
    });

    return res.status(200).json({
      success: true,
      message: "New access and refresh tokens generated",
      accessToken: access_token,
      refresh_token: refresh_token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error during token refresh",
      error: error.message,
    });
  }
};

//profile logic

const profile = async (req, res) => {
  try {
    const userId = req.access_verification._id;
    const user = await register_model.findOne({ _id: userId });
    console.log("user", user);
    const wallet_balance = user.wallet_balance;
    const today = Math.floor(Date.now() / 1000); // Current timestamp (seconds)

    const todayDate = new Date(today * 1000); // Convert to Date object to extract year/month/day

    // Function to check if the given timestamp is from today
    function isFromToday(timestamp) {
      const timestampDate = new Date(timestamp * 1000); // Convert to Date object
      return (
        timestampDate.getFullYear() === todayDate.getFullYear() &&
        timestampDate.getMonth() === todayDate.getMonth() &&
        timestampDate.getDate() === todayDate.getDate()
      );
    }

    // const today = 1732194877
    let products = [];
    const user_products = await user_product_model
      .find({ user_id: user._id })
      .populate("product_id");
    if (user_products.length === 0) {
      return response_message(
        res,
        200,
        false,
        "There are no products for this user",
        {
          wallet_balance,
          user_details: {
            user,
          },
          products,
        }
      );
    }

    for (let user_product of user_products) {
      // Check if the product has expired
      if (user_product.end_date < today) {
        continue;
      }
      console.log("user_product today", today);

      if (!isFromToday(user_product.last_run)) {
        user_product.buy = false;
        user_product.sell = false;
        await user_product.save();
      }

      // Add the product's income details to the response
      console.log(user_products);
      products.push({
        user_product,
      });
    }

    // // Update the user's withdrawal balance
    // user.withdrawl_balance = products.reduce(
    //   (sum, product) => sum + product.withdrawal_balance,
    //   0
    // );
    await user.save();

    return response_message(
      res,
      200,
      true,
      "Wallet info retrieved successfully",
      {
        wallet_balance,
        withdrawal_balance: user.withdrawl_balance,
        user_details: {
          user,
        },
        products,
      }
    );
  } catch (error) {
    return response_message(
      res,
      500,
      false,
      "Error in profile API",
      error.message
    );
  }
};

//withdraw controller
const withdraw = async (req, res) => {
  try {
    const userId = req.access_verification._id;
    const user = await register_model.findOne({ _id: userId });

    //information for withdraw data
    const { amount, USDTWalletAddress } = req.body;

    //check that amount should not greater than withdrawlable amount
    if (amount > user.withdrawl_balance) {
      return response_message(
        res,
        400,
        true,
        "balanace is not enough to withdraw"
      );
    }

    //amout left calaculation and added agan in user table
    let amount_left = user.withdrawl_balance - amount;
    user.withdrawl_balance = amount_left;
    await user.save();

    const withdraw_entry = await withdraw_model.create({
      userId: userId,
      amount: amount,
      USDTWalletAddress,
    });

    return response_message(res, 200, true, withdraw_entry);
  } catch (error) {
    return response_message(res, 500, false, error.message);
  }
};

//rest password if user forgot it

const forgot_pass = async (req, res) => {
  console.log("forgot password");

  try {
    //get the user from the access token first
    const userId = req.access_verification._id;
    const user = await register_model.findOne({ _id: userId });

    //reset token create for sending in email
    const resetToken = await jwt.sign(
      { _id: userId },
      process.env.reset_token_secret,
      {
        expiresIn: "15m",
      }
    );

    //create the reset link
    const resetLink = `${process.env.frontend_url}/resetLink?token=${resetToken}`;

    //send this over a mail
    const transport = await nodeMailer.createTransport({
      host: process.env.mail_host,
      port: process.env.mail_port,
      secure: true,
      auth: {
        user: process.env.mail_user,
        pass: process.env.mail_pass,
      },
    });

    const mail_send = await transport.sendMail({
      from: "noreply@snookcoder.com",
      to: user.email,
      subject: `Change Password Link`,
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forgot Password - Reset Your Password</title>
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
    .message {
      font-size: 16px;
      color: #555555;
    }
    .reset-link {
      font-size: 16px;
      color: #0066cc;
      text-decoration: none;
      font-weight: bold;
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
      <h1>Forgot Your Password?</h1>
      <p class="message">No worries! We’ve got you covered.(Valid For 15 min.)</p>
      <p class="message">Click the link below to reset your password:</p>
      <p><a href="${resetLink}" class="reset-link" target="_blank">Reset Password</a></p>
      <p class="message">If you did not request a password reset, please ignore this email.</p>
      <p class="footer">Best Regards, <br> The SNOOK_CODER Team</p>
    </div>
  </div>
</body>
</html>
`,
    });

    return response_message(
      res,
      200,
      true,
      "reset password link send succesfully valid for 15 mins only ",
      resetToken
    );
  } catch (error) {
    return response_message(
      res,
      500,
      false,
      "error in forgot api",
      error.message
    );
  }
};

//password changed and save
const new_password_save = async (req, res) => {
  try {
    console.log("dsfsdjkfs");
    const { new_pass, confirm_pass } = req.body;
    const { token } = req.query;

    if (!token) {
      return response_message(
        res,
        400,
        false,
        "Yor are not able to change the password without token"
      );
    }

    if (!new_pass && !confirm_pass) {
      return response_message(
        res,
        400,
        false,
        "new password and confirm password needed",
        null
      );
    }

    const decode = jwt.verify(token, process.env.reset_token_secret);
    console.log("reset decode data", decode);

    const userId = decode._id;
    console.log("userId", userId);

    const user = await register_model.findOne({ _id: userId });
    console.log("user", user);

    if (new_pass != confirm_pass) {
      return response_message(
        res,
        400,
        false,
        "new password and confirm password should be same",
        null
      );
    }

    user.password = confirm_pass;
    user.save();

    response_message(res, 200, true, "password changed succesfully", user);
  } catch (error) {
    // If token is invalid or expired, send appropriate error
    if (error.name === "TokenExpiredError") {
      return response_message(
        res,
        400,
        false,
        "token expire please apply for new",
        null
      );
    }
    return response_message(
      res,
      500,
      false,
      "error in resetLink api",
      error.message
    );
  }
};

export {
  register,
  login,
  refresh,
  profile,
  withdraw,
  forgot_pass,
  new_password_save,
};
