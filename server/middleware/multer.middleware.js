import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path'
import { v2 as cloudinary } from 'cloudinary';


// Load environment variables
dotenv.config();

// Configure Multer to use memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

//gio with the disak storage this time

const storage = multer.diskStorage({
   
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
     
})

const upload = multer({storage:storage}).single('product_image')


export { upload };
