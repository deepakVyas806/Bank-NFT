import { logger } from "../../logger.js";
import { product_model } from "../../model/product.model.js";
import path from 'path'
import { uploadOnCloud } from "../../utils/cloudnary.js";


//controller to crate ethe add the prodiuct
const addProduct = async(req,res)=>{
    
    const {product_name,product_price,daily_income,validity,total_income,purcahse_limit} = req.body;
    console.log(`req.file`,req.file)

    const result = await uploadOnCloud(req.file.buffer);
    console.log("cloudnary response" ,result.secure_url)
    // const originalname = req.file.originalname;
    // // const extension = path.extname(originalname);
    // const product_image = path.join('uploads', `${Date.now()}-${extension}`);

    try {
        
        const product_create = await product_model.create({
            product_name,
            product_image:result.secure_url,
            product_price,
            daily_income,
            total_income,
            validity,
            purcahse_limit

        })

        if(!product_create){
          logger.error('product creation faile')
          return  res.staus(500).json({success:false,message:'produvt not created'})
        }
        logger.info(`produict created succesfully ${product_create}`)
       return res.status(200).json({success:true,message:'product created succesfully',product_details:product_create})

    } catch (error) {
        logger.error(`eror in catch api ${error.message}`)
        return  res.status(500).json({success:false,message:'there is some error in catch api of product',error:error.message})
    }
    
   
}


export {addProduct}