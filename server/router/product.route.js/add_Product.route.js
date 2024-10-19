import express from 'express';
import multer from 'multer';
import path from 'path';
import { addProduct } from '../../controller/product.controller.js/addProduct.controller.js' ;  // Make sure this is the correct path


const proute = express.Router();

// Multer setup for file storage
try {
  const storage = multer.diskStorage({
      destination: function(req, file, cb) {
          cb(null, path.resolve('uploads'));  // Ensure the 'uploads' directory exists
      },
      filename: function(req, file, cb) {
          // Ensure correct formatting of the filename (no extra hyphen before the extension)
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);  // Unique timestamp + original filename
      }
  });

  // Multer middleware to handle single file uploads (with field name 'product_image')
const upload = multer({ storage: storage });

// Route to create the product
proute.post('/add_product', verifyToken, upload.single('product_image'), addProduct);


} catch (error) {
  console.log(error.message)
}




export { proute };
