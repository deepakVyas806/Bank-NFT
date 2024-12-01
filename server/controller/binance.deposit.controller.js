import dotenv from 'dotenv';
dotenv.config();
import Binance from 'binance-api-node';
import { response_message } from "../responses.js";
import { transaction_model } from '../model/binnaceTranscation.model.js';
import { register_model } from '../model/register.model.js';
import {HttpsProxyAgent} from 'https-proxy-agent';


const proxyAgent = new HttpsProxyAgent('http://164.52.206.180:80');

// Controller for verifying the txid from the deposit history
const verifyTxId = async (req, res) => {
  try {

    //get the TxId from the user 
     
    const {TxId} = req.body;

    //get the user if from token    

    console.log("req access verifuiction", req.access_verification);
    const userId = req.access_verification._id; // Ensure this is set correctly
    
    //find the login user

    const loginUser = await register_model.findOne({_id:userId})
    console.log("loginUser",loginUser)

    //first check in tyhe transaction table whenter that entry prsernt there or not 
    const transactionEntity = await transaction_model.findOne({transactionId:TxId});
    console.log("transactionEnityt",transactionEntity)
    if(transactionEntity && transactionEntity.length!=0){
        return response_message(res,400,false,'transaction id already processed',null)
    }

    // Initialize the Binance client using default property 

    const client = Binance.default({
      apiKey: process.env.Binance_api_key,
      apiSecret: process.env.Binanace_secret_key,
      httpAgent: proxyAgent
    });
    //console.log("client",client)

    //fetch all the recent 1000 deposits 

    const deposits = await client.depositHistory({ limit: 1000 });
     console.log("deposits",deposits)

 

    // Extract the numeric part of the txId from the request and from the deposits because iot includes lot of thing so we 
       //just need that last thing we create a function 

      const extractTransactionNumber = (txId) => {
        const match = txId.match(/\d+$/); // Match the digits at the end of the string
        return match ? match[0] : null;
      };

    //extract the transaction and match it if it there or noit 

    const deposit = deposits.find((d) => {
        const depositTxId = extractTransactionNumber(d.txId);
        return depositTxId === TxId; // Compare the extracted numeric values
      });

    //if there is no deposit with the ref of trasnaction id then message it .

    if(!deposit){
        return response_message(res,400,false,'no transaction id found',null)
    }

    console.log("parse deposity number",parseFloat(deposit.amount));
    console.log("wallet balance", loginUser.wallet_balance)
    //update the user balance if the status is 1 that means confirmed
    if(deposit.status===1){
        loginUser.wallet_balance = (loginUser.wallet_balance || 0) + parseFloat(deposit.amount);
        loginUser.save();
    }
 
    // convert the unix timestamp inot date for human time readable formt 
    const date = new Date(deposit.insertTime)
    console.log(date.toLocaleString());
    const isoDate = date.toISOString();  //store in databse like this 


    console.log("deposit",deposit)
    const transactionInsert = await transaction_model.create({
        transactionId: extractTransactionNumber(deposit.txId),
        amount:deposit.amount,
        status:deposit.status,
        userId:userId,
        time:isoDate,
        destination:deposit.address,
        coin:deposit.coin
        
    })

     await transactionInsert.save();


    //depost status
    const deposit_status = deposit.status ===1?"CONFRIMED":"PENDING";

    return response_message(res,200,true,'depopsit details',{"deposit_detail":deposit,"deposit_status":deposit_status})
    
  } catch (error) {
   return  response_message(res, 500, false, 'Error in Binance API', error.message);
  }
};



export { verifyTxId };
