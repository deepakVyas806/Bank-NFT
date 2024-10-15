import express from 'express';
import { register,login} from '../controller/general.controller.js';

// import send_otp_twilio from '../controller/twilo.controller.js';
// import {verifyTwilio} from '../middleware/verifyTwilio.js'

const router = express.Router();


// register route
router.post('/register',register);

//send otp route
// router.post('/send-otp',send_otp_twilio)

//login fucntiuonality
router.post('/login',login)


export default router;