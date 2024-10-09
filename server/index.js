import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // configuration of dot env
const PORT = process.env.PORT || 4000 ;

const app = express();

app.get('/',(req,res)=>{

   res.status(200).json({success:true, message:"SNOOK-CODERS-DEV-CHECK"})

})


app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})