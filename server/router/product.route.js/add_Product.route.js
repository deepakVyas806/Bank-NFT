import express from 'express';
import multer from 'multer';
import path from 'path';
import { addProduct } from '../../controller/product.controller.js/addProduct.controller.js';  // Make sure this is the correct path

const proute = express.Router();

// Ensure the uploads directory exists
const uploadsDir = path.resolve('uploads');
console.log(`Upload destination path: ${uploadsDir}`);

// Multer setup for file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Log the destination for debugging
        console.log(`Setting upload destination to: ${uploadsDir}`);
        cb(null, uploadsDir);  // Ensure the 'uploads' directory exists
    },
    filename: function(req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);  // Unique timestamp + original filename
    }
});

// Multer middleware to handle single file uploads (with field name 'product_image')
const upload = multer({ storage: storage });

// Route to create the product
proute.post('/add_product', verifyToken, upload.single('product_image'), async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('File uploaded:', req.file);  // Log the uploaded file details

        // Call the addProduct controller
        await addProduct(req, res);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});

export { proute };
