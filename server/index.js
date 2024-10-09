import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // configuration of dot env
const PORT = process.env.PORT || 4000 ;

const app = express();

app.get('/',(req,res)=>{
<<<<<<< HEAD
   res.status(200).json({success:true, message:"Hey-SNOOK-CODERS"})
=======

   res.status(200).json({success:true, message:"SNOOK-CODERS"})

>>>>>>> a0af7200d4884619e1974eb901487820ecca1007
})


app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})