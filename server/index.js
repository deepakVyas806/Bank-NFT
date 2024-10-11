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


mongoose.connect(process.env.MONGO_DB_URI)
.then(()=>{

      app.listen(PORT,()=>{
         console.log(`server started at ${PORT} and Databasr connected also`)
      }
      )
  
})
.catch((err)=>{
   console.log(err.message);
})

