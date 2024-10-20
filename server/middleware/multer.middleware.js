import dotenv from 'dotenv';
import multer from 'multer'

const  isEnvironemnt = process.env.is_env;

    const storage = isEnvironemnt?multer.storage():multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/uploads');  // Ensure the 'uploads' directory exists
        },
        filename: function(req, file, cb) {
            // Ensure correct formatting of the filename (no extra hyphen before the extension)
            const uniqueName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueName);  // Unique timestamp + original filename
        }
    });
    // Multer middleware to handle single file uploads (with field name 'product_image')
const upload = multer({ storage: storage });


export {upload}