import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // configuration of dot env
const PORT = process.env.PORT || 4000 ;

const app = express();



app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})