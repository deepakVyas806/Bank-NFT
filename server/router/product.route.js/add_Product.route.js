import express from 'express';
import multer from 'multer';
import path from 'path';
import { addProduct } from '../../controller/product.controller.js/addProduct.controller.js';  // Ensure this is the correct path
import { verifyToken } from '../../middleware/verifyToken.js';

const proute = express.Router();

try {
  // Multer setup for file storage
  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, path.resolve('uploads'));  // Ensure the 'uploads' directory exists
      },
      filename: function (req, file, cb) {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);  // Unique timestamp + original filename
      }
  });

  // Multer middleware to handle single file uploads (with field name 'product_image')
  const upload = multer({
      storage: storage,
      limits: { fileSize: 2 * 1024 * 1024 }  // Optional: set file size limit (e.g., 2MB)
  }).single('product_image');

  // Route to create the product
  proute.post('/add_product', verifyToken, (req, res) => {
      // Run Multer middleware for file upload
      upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
              // Multer-specific errors
              console.log('Multer error:', err.message);
              return res.status(500).json({ error: `Multer error: ${err.message}` });
          } else if (err) {
              // General errors
              console.log('Upload error:', err.message);
              return res.status(500).json({ error: `Upload error: ${err.message}` });
          }

          // If no error, call the controller to handle the rest
          addProduct(req, res);
      });
  });

} catch (error) {
  console.log('Error in route setup:', error.message);
}

export { proute };
