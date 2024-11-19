import express from 'express';
import { user_withdraw, withdraw_list, withdraw_status } from '../controller/withdrawl/allWithdrawl.js';
import { verifyToken } from '../middleware/verifyToken.js';

const withdraw = express.Router();


withdraw.get('/allwithdraw',verifyToken,withdraw_list)

withdraw.get('/userwithdraw',verifyToken,user_withdraw)

withdraw.patch('/updateStatus',verifyToken,withdraw_status)


export {withdraw}