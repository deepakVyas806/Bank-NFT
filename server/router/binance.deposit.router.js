import  expres from 'express';
import { verifyTxId } from '../controller/binance.deposit.controller.js';
import { verifyToken } from "../middleware/verifyToken.js";
import { depositHistory, depositINDHistory } from '../controller/binance.depositHistory.controller.js';

const binanceDeposit = expres.Router();

//verification of TxId of binance after fetching the deposit things

binanceDeposit.post('/binanceVerify',verifyToken,verifyTxId)

//get all the deposits history
binanceDeposit.get('/binanaceHistory',verifyToken,depositHistory)

//get inidvidual history
binanceDeposit.get('/indHistory',verifyToken,depositINDHistory)


export {binanceDeposit}