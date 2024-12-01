import  expres from 'express';
import { verifyTxId } from '../controller/binance.deposit.controller.js';
import { verifyToken } from "../middleware/verifyToken.js";

const binanceDeposit = expres.Router();

//verification of TxId of binance after fetching the deposit things

binanceDeposit.post('/binanceVerify',verifyToken,verifyTxId)




export {binanceDeposit}