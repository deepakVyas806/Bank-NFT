import express from 'express';
import multer from 'multer';
import { addProduct } from '../../controller/product.controller.js/addProduct.controller.js';  // Ensure this is the correct path
import { verifyToken } from '../../middleware/verifyToken.js';

// Multer setup for memory storage
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Route to create the product
proute.post('/add_product', verifyToken, upload.single('product_image'), async (req, res) => {
    try {
        const fileBuffer = req.file.buffer;  // File is in memory buffer
        const fileName = req.file.originalname;

        console.log('File uploaded in memory:', fileName);

        // Here you can upload the file to an external storage service (e.g., S3, Cloudinary, etc.)
        // Example: You could use AWS SDK or Cloudinary API to upload this file buffer

        // Call the addProduct controller
        await addProduct(req, res);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});
