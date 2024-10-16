import express from 'express';
import { register,login, refresh} from '../controller/general.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { mail_otp } from '../controller/node_mailer.controller.js';

// import send_otp_twilio from '../controller/twilo.controller.js';
// import {verifyTwilio} from '../middleware/verifyTwilio.js'

const router = express.Router();

// register route
router.post('/register',register);

//send otp route
// router.post('/send-otp',send_otp_twilio)

//login fucntiuonality
router.post('/login',login)

//refresh token 
router.post('/refresh',verifyToken,refresh)

//send register mail otp
router.post("/send-mail-register", mail_otp);

//session data
// router.get("/session-data", sessionData);

// //delete enttire session
// router.post("/delete-session", (req, res) => {
//   req.session.destroy();
//   res.json({ message: "session deleted successfully" });
// });

export default router;
