
import { product_model } from "../../model/product.model.js";
import path from 'path'
import { uploadOnCloud } from "../../utils/cloudnary.js";


//controller to crate ethe add the prodiuct
const addProduct = async(req,res)=>{
    
    const {product_name,product_price,daily_income,validity,total_income,purcahse_limit} = req.body;
    console.log(`req.file`,req.file.originalname)
    const imagePath = req.file.path

    // const result = await uploadOnCloud(req.file.buffer);
    // console.log("cloudnary response" ,result)
    // const originalname = req.file.originalname;
    // // const extension = path.extname(originalname);
    // const product_image = path.join('uploads', `${Date.now()}-${extension}`);

    try {
        
        const product_create = await product_model.create({
            product_name,
            product_image:imagePath,
            product_price,
            daily_income,
            total_income,
            validity,
            purcahse_limit

        })

        if(!product_create){
         
          return  res.staus(500).json({success:false,message:'produvt not created'})
        }
     
       return res.status(200).json({success:true,message:'product created succesfully',product_details:product_create})

    } catch (error) {
       
        return  res.status(500).json({success:false,message:'there is some error in catch api of product',error:error.message})
    }
    
   
}


export {addProduct}