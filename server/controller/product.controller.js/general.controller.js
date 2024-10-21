import express from 'express';
import { pro_inv } from '../../model/investment.model.js';

const get_product = async(req,res)=>{
   
    const product = await pro_inv.find();

    try {

        if(!product){
            return res.status(500).json({success:false,message:'product not availabvle'})
        }
        
        return res.status(200).json({success:true,message:'product created successfulyy',product:product})
    } catch (error) {
        res.status(500).json({success:false,message:'erro in get api',error:error.message})
    }

}

export {get_product}