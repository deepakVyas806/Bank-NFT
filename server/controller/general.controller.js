import dotenv from 'dotenv';
dotenv.config();
import { register_model } from '../model/register.model.js';
import jwt from 'jsonwebtoken';

// Register
const register = async (req, res) => {
    const { username, fname, lname, email, password, cpassword, phone, otp, referral } = req.body;

    try {
        // Email check
        const userEmail = await register_model.findOne({ email });
        if (userEmail) {
            return res.status(500).json({ success: false, message: "Email already exists" });
        }

        // Phone check
        const userPhone = await register_model.findOne({ phone });
        if (userPhone) {
            return res.status(500).json({ success: false, message: "Phone number already exists" });
        }

        // Password check
        if (cpassword !== password) {
            return res.status(500).json({ success: false, message: "Password and Confirm Password should match" });
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
            cpassword
        });

        return res.status(200).json({ success: true, message: "User created successfully", registerUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error in register API", error: error.message });
    }
};

// Login
const login = async (req, res) => {
    
    const { email, username, login_pass } = req.body;

    try {
        // Check for either username or email
        if (!username && !email) {
            return res.status(500).json({ success: false, message: 'Username or email is required' });
        }

        // Find user by email or username
        const existUser = await register_model.findOne({
            $or: [{ email }, { username }]
        });

        if (!existUser) {
            return res.status(500).json({ success: false, message: 'User does not exist. Please sign up first.' });
        }

        // Password check
        if (login_pass !== existUser.password) {
            return res.status(500).json({ success: false, message: 'Password does not match' });
        }

        // Generate access token
        const access_token = jwt.sign(
            {
                type:'access_token',
                _id: existUser._id,
                email: existUser.email
            },
            process.env.access_token || 'AdiAdi', // Use a secure key from .env
            { expiresIn: '5m' } // Extend token expiration for access token
        );

        // Generate refresh token
        const refresh_token = jwt.sign(
            {
                type:'refresh_token',
                _id: existUser._id,
                email: existUser.email
            },
            process.env.refresh_token || 'AdiAdi', // Use a secure key from .env
            { expiresIn: '7d' }
        );

        // Save refresh token to database
        existUser.refreshToken = {
            
            token: refresh_token,
            expiryDate: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days expiry
        };

        await existUser.save();

        // Set cookies
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: 'Strict'
        });
        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000, // 15 minutes expiry of cookie
            sameSite: 'Strict'
        });

        // Remove sensitive fields before sending response
        const { password, cpassword, ...logedinUser } = existUser._doc;

        res.status(200).json({ success: true, message: 'User logged in successfully', logedinUser, accessToken: access_token, });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error in login API', error: error.message });
    }
};

// Refresh Token
const refresh = async (req, res) => {
  
    

   // console.log('kya bhai access token')
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(500).json({ success: false, message: 'No authorization token provided' });
    }


    //decoding for safetyu niot to access aces_token
    const Frefresh_token = authHeader.split(' ')[1];
     
 
    //verifuyinf the user 

    try {

        const refreshToken =  jwt.verify(Frefresh_token,process.env.refresh_token)

        const user = await register_model.findById(refreshToken._id);
  
    
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid token: No user found' });
        }

        if(Frefresh_token!==user.refreshToken.token){
            return res.status(401).json({ success: false, message: 'Invalid token: Old Token' });
        }

        // Create new access token
        const access_token = jwt.sign(
            {type:"access_token", _id: user._id, email: user.email },
            process.env.access_token || 'AdiAdi',
            { expiresIn: '5m' }
        );

        // Create new refresh token
        const refresh_token = jwt.sign(
            { type:"refresh_token",_id: user._id, email: user.email },
            process.env.refresh_token || 'AdiAdi',
            { expiresIn: '7d' }
        );

        // Update refresh token in DB
        user.refreshToken.token = refresh_token;
        user.refreshToken.expiryDate = Date.now() + 7 * 24 * 60 * 60 * 1000;
        await user.save();

        // Set cookies with new tokens
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'Strict'
        });
        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000,
            sameSite: 'Strict'
        });

        return res.status(200).json({ success: true, message: 'New access and refresh tokens generated', accessToken: access_token });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error during token refresh', error: error.message });
    }
};

export { register, login, refresh };
