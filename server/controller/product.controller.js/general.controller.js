import express from 'express';
import { product_model } from '../../model/product.model.js';



//constroller to get the products 


const get_product = async(req,res)=>{
   
    const product = await product_model.find().sort({createdAt:-1});

    try {

        if(!product){
            return res.status(404).json({success:false,message:'Date Not Found - product not availabvle'})
        }
        
        return res.status(200).json({success:true,message:'list of all products successfulyy',payload:product})
    } catch (error) {
        res.status(500).json({success:false,message:'erro in get api',error:error.message})
    }

}

export {get_product}