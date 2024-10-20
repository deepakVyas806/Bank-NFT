import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config(); 

// Ensure the 'uploads' directory exists
const uploadsDir = path.join(process.cwd(), 'public/uploads'); // Adjust path if necessary
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
}

// Set up storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir); // Set the destination directory for uploads
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`; // Create a unique filename
        cb(null, uniqueName); // Set the filename
    }
});

// Initialize Multer with the defined storage
const upload = multer({ storage: storage });

// Export the Multer upload middleware
export { upload };
