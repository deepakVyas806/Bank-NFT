import dotenv from "dotenv";
dotenv.config();
import { register_model } from "../model/register.model.js";
import jwt from "jsonwebtoken";
import { response_message } from "../responses.js";
import { user_product_model } from "../model/user_product.js";

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
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      registerUser,
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

    // Generate access token
    const access_token = jwt.sign(
      {
        type: "access_token",
        _id: existUser._id,
        email: existUser.email,
      },
      process.env.access_token || "AdiAdi", // Use a secure key from .env
      { expiresIn: "20m" } // Extend token expiration for access token
    );

    // Generate refresh token
    const refresh_token = jwt.sign(
      {
        type: "refresh_token",
        _id: existUser._id,
        email: existUser.email,
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
      { type: "access_token", _id: user._id, email: user.email },
      process.env.access_token || "AdiAdi",
      { expiresIn: "20m" }
    );

    // Create new refresh token
    const refresh_token = jwt.sign(
      { type: "refresh_token", _id: user._id, email: user.email },
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

    // Retrieve wallet balance from user
    const user = await register_model.findOne({ _id: userId });
    const wallet_balance = user.wallet_balance;


    
    const today = Math.floor(Date.now() / 1000);
    let products = [];
    // Get all products associated with the user
    const user_products = await user_product_model.find({ user_id: user._id });
    if (user_products.length === 0) {
      return response_message(res, 200, false, 'There are no products for this user',{
        wallet_balance,
        products,
      } );
    }


    // Process each product separately
    for (let user_product of user_products) {
      let hourly_profit = 0;
      const daily_profit = user_product.daily_income;

      // Check if the product has expired
      if (user_product.end_date < today && user_product.withdrawl_flag===0) {
        user_product.total_income = user_product.daily_income * user_product.validity;
        user_product.withdrawl_flag = 1;
      } else {
        const elapsed_hours = (today - user_product.last_run) / 3600;

        // Update total income on an hourly basis if at least 1 hour has passed
        if (elapsed_hours >= 1) {
          const lastRunDate = new Date(user_product.last_run * 1000);
          const currentDate = new Date(today * 1000);

          // Check if last update was on a previous day
          // if (lastRunDate.toDateString() !== currentDate.toDateString()) {
          //   // It's a new day, so reset the hourly profit
          //   hourly_profit = 0;
          //   user_product.last_run = today; // Update last_run to now

          //   // Optionally reset total income for the new day if required
          //   // user_product.total_income = 0; // Uncomment if you want to reset total income daily
          // }

          // Calculate hourly income based on elapsed hours since last run
          const hourly_income = (daily_profit / 24) * elapsed_hours;
          user_product.total_income += hourly_income; // Accumulate total income
         // hourly_profit += hourly_income; // Set hourly profit based on the elapsed time
          user_product.last_run = today;
        }
      }

      // Save the updated user_product to the database
      await user_product.save();

      // Add the product's income details to the response
      products.push({
        product_id: user_product._id,
        total_income: `₹${user_product.total_income.toFixed(2)}`,  // Add ₹ symbol
        // hourly_income: `₹${hourly_profit.toFixed(2)}`,            // Add ₹ symbol
        daily_income: `₹${daily_profit}`,  
        withdrawal_balance: user_product.withdrawl_flag === 1 ? user_product.total_income : 0,
        last_run: user_product.last_run,
        start_date: user_product.start_date,
        end_date: user_product.end_date
      });
    }

    // Update user's withdrawal balance based on total income of withdrawable products
    user.withdrawl_balance = products.reduce((sum, product) => sum + product.withdrawal_balance, 0);
    await user.save();

    return response_message(res, 200, true, 'Wallet info retrieved successfully', {
      wallet_balance,
      "withdral_ballance": user.withdrawl_balance,
      products,
    });
  } catch (error) {
    return response_message(res, 500, false, 'Error in profile API', error.message);
  }
};



export { register, login, refresh ,profile };
