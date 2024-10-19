import express from 'express';
import multer from 'multer';
import path from 'path';
import { addProduct } from '../../controller/product.controller.js/addProduct.controller.js';  // Ensure this is the correct path
import { verifyToken } from '../../middleware/verifyToken.js';

const proute = express.Router();

// Multer setup for file storage
try {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            const uploadPath = path.resolve('uploads');
            console.log(`Upload destination path: ${uploadPath}`);
            cb(null, uploadPath);  // Ensure the 'uploads' directory exists
        },
        filename: function(req, file, cb) {
            const uniqueName = `${Date.now()}-${file.originalname}`;
            console.log(`Generated unique file name: ${uniqueName}`);
            cb(null, uniqueName);  // Unique timestamp + original filename
        }
    });

    // Multer middleware to handle single file uploads (with field name 'product_image')
    const upload = multer({
        storage: storage,
        limits: { fileSize: 10 * 1024 * 1024 },  // Set file size limit if needed
        fileFilter: (req, file, cb) => {
            console.log(`Processing file: ${file.originalname}`);
            if (!file.mimetype.startsWith('image/')) {
                console.log('Error: Uploaded file is not an image');
                return cb(new Error('Only images are allowed'));
            }
            cb(null, true);
        }
    });

    // Route to create the product
    proute.post('/add_product', verifyToken, upload.single('product_image'), async (req, res, next) => {
        try {
            console.log(`File uploaded: ${req.file ? req.file.filename : 'No file uploaded'}`);
            await addProduct(req, res);  // Call the controller to add product
        } catch (error) {
            console.error('Error adding product:', error.message);
            res.status(500).json({ error: 'Server error during product addition' });
        }
    });

} catch (error) {
    console.error('Error setting up Multer:', error.message);
}

export { proute };
