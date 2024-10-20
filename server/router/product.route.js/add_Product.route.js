import express from 'express';
import { addProduct } from '../../controller/product.controller.js/addProduct.controller.js' ;  // Make sure this is the correct path
import { verifyToken } from '../../middleware/verifyToken.js';
import { upload } from '../../middleware/multer.middleware.js';

const proute = express.Router();

// Route to create the product
proute.post('/add_product', verifyToken, upload.single('product_image'), addProduct);


export { proute };
