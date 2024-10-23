import express from 'express';
import { payment_success_con, paymetn_success_fail } from '../../controller/payment.controller.js/sucess.controller.js';

const payment_success = express.Router();

payment_success.post('/payment-success',payment_success_con);
//when payment fail

payment_success.post('/payment-failure',paymetn_success_fail)

export {payment_success}