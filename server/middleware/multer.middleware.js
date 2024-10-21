import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// Load environment variables
dotenv.config();

// Configure Multer to use disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Log the destination where the file will be stored
        console.log(`File will be stored in: uploads/`);
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Log the original file name
        console.log(`Original file name: ${file.originalname}`);
        cb(null, file.originalname);
    }
});

// Create the upload middleware
const upload = multer({ storage: storage }).single('product_image');

// Export the upload middleware
export { upload };
