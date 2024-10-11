import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router/general.route.js';

dotenv.config(); // configuration of dot env
const PORT = process.env.PORT || 4000 ;

const app = express();

//Middlewartes
app.use(express.json());

app.get('/',(req,res)=>{
   res.status(200).json({success:true, message:"GET READY SNOOK_CODERS"})
})

app.use('/api/v1',router)


mongoose.connect('mongodb+srv://root:root@cluster0.qlsvim7.mongodb.net/BET-APP?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{

      app.listen(PORT,()=>{
         console.log(`server started at ${PORT} and Databasr connected also`)
      }
      )
  
})
.catch((err)=>{
   console.log(err.message);
})

