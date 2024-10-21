import express from "express";
import multer from "multer";
import { addProduct } from "../../controller/product.controller.js/addProduct.controller.js"; // Make sure this is the correct path
import { verifyToken } from "../../middleware/verifyToken.js";
// import { upload } from "../../middleware/multer.middleware.js";

const proute = express.Router();

// Configure Multer to use disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Log the destination where the file will be stored
    console.log(`File will be stored in: uploads/`);
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Log the original file name
    console.log(`Original file name: ${file.originalname}`);
    cb(null, file.originalname);
  },
});

// Create the upload middleware
const upload = multer({ storage: storage }).single("product_image");
//console.log("upload", upload)

// Route to create the product
proute.post(
  "/add_product",
  verifyToken,
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  addProduct
);

export { proute };
