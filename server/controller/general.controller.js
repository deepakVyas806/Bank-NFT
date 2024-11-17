import dotenv from "dotenv";
dotenv.config();
import { register_model } from "../model/register.model.js";
import jwt from "jsonwebtoken";
import { response_message } from "../responses.js";
import { user_product_model } from "../model/user_product.js";
import { withdraw_model } from "../model/with_draw.js";

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
    const user = await register_model.findOne({ _id: userId });
    console.log("user", user);
    const wallet_balance = user.wallet_balance;
    const today = Math.floor(Date.now() / 1000); // Current timestamp (seconds)
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
            first_name: user.firstname,
            last_name: user.lastname,
            email: user.email,
            phone: user.phone,
          },
          products,
        }
      );
    }

    for (let user_product of user_products) {
      let hourly_income = 0;
      const daily_profit = user_product.daily_income;

      //skip the product calculation if the withdrawl flag is 1
      // Skip processing if the withdrawal flag is set
      if (user_product.withdrawl_flag === 1) {
        continue; // Skip further processing for this product
      }

      // Check if the product has expired
      if (user_product.end_date < today) {
        // user_product.total_income =
        // user_product.daily_income * user_product.validity; // Expired product, full income
        // user_product.withdrawal_balance =
        // user_product.daily_income * user_product.validity;
        user_product.withdrawl_flag = 1; // Mark for withdrawal if expired
        user.withdrawl_balance +=
          user_product.daily_income * user_product.validity;
      } else {
        const elapsed_seconds = today - user_product.last_run; // Elapsed time in seconds
        const elapsed_hours = elapsed_seconds / 3600; // Convert elapsed time to hours

        // Update income if at least one hour has passed
        if (elapsed_hours >= 1) {
          hourly_income = (daily_profit / 24) * elapsed_hours; // Calculate hourly income for the elapsed time
          user_product.total_income += hourly_income; // Accumulate total income
          user_product.last_run = today; // Update last run to the current time
        }
      }

      // Save the updated user_product to the database
      await user_product.save();

      // Add the product's income details to the response
      console.log(user_products);
      products.push({
        product_details: user_product.product_id,
        total_income: `₹${user_product.total_income.toFixed(2)}`, // Format total income
        daily_income: `₹${daily_profit}`,
        last_run: user_product.last_run,
        start_date: user_product.start_date,
        end_date: user_product.end_date,
      });
    }
    console.log("Testing products", products);

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
          first_name: user.firstname,
          last_name: user.lastname,
          email: user.email,
          phone: user.phone,
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

const withdraw = async (req, res) => {
  try {
    const userId = req.access_verification._id;
    const user = await register_model.findOne({ _id: userId });

    //information for withdraw data
    const {
      amount,
      account_no,
      ifsc_code,
      bank_name,
      upi_id,
      account_holder_name,
    } = req.body;

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
      userId:userId,
      account_no: account_no,
      ifsc_code: ifsc_code,
      upi_id: upi_id,
      amount: amount,
      bank_name: bank_name,
      account_holder_name: account_holder_name,
    });

    return response_message(res, 200, true, withdraw_entry);
  } catch (error) {
    return response_message(res, 500, false, error.message);
  }
};




export { register, login, refresh, profile, withdraw  };
