import express from "express";
import {
  register,
  login,
  refresh,
  profile,
  withdraw
} from "../controller/general.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { mail_otp } from "../controller/node_mailer.controller.js";
import { verify_mail_otp } from "../middleware/verifyMailOtp.middleware.js";

// import send_otp_twilio from '../controller/twilo.controller.js';
// import {verifyTwilio} from '../middleware/verifyTwilio.js'

const router = express.Router();

// register route
router.post("/register", verify_mail_otp, register);

//login fucntiuonality
router.post("/login", login);

//refresh token
router.post("/refresh", refresh);

//send register mail otp
router.post("/send-mail-register", mail_otp);

//profile route
router.post("/profile", verifyToken, profile);

//withdraw route
router.post("/withdraw", verifyToken, withdraw);


export default router;
