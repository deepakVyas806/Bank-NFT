import dotenv from 'dotenv';
dotenv.config();
import {v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

console.log(process.env.cloud_name)

    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.cloud_name,
        api_key:process.env.api_key,
        api_secret: process.env.api_secret // Click 'View API Keys' above to copy your API secret
    });

 const uploadOnCloud = async(localFilePath)=>{
    
    try {
        
        if(!localFilePath){
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })

        console.log(response);
        return response;
    } catch (error) {
         fs.unlinkSync(localFilePath)
         console.log(error.message);
    }
 }


    export {uploadOnCloud}