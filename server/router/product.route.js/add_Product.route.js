import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // Import fs module for file system operations
import { addProduct } from '../../controller/product.controller.js/addProduct.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const proute = express.Router();

try {
  const uploadDir = path.resolve('uploads'); // Path for uploads directory

  // Ensure 'uploads' directory exists or create it if it doesn't
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if not found
    console.log(`Created upload directory at: ${uploadDir}`);
  }

  // Multer setup for file storage
  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, uploadDir);  // Use the dynamically created path
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
      upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
              console.log('Multer error:', err.message);
              return res.status(500).json({ error: `Multer error: ${err.message}` });
          } else if (err) {
              console.log('Upload error:', err.message);
              return res.status(500).json({ error: `Upload error: ${err.message}` });
          }
          addProduct(req, res); // Call the controller function
      });
  });

} catch (error) {
  console.log('Error in route setup:', error.message);
}

export { proute };
