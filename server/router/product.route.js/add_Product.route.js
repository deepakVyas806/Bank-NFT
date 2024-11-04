import express from "express";
import { addProduct } from "../../controller/product.controller.js/addProduct.controller.js"; // Make sure this is the correct path
import { verifyToken } from "../../middleware/verifyToken.js";
import { upload } from "../../middleware/multer.middleware.js";
import { buy_product, get_product } from "../../controller/product.controller.js/general.controller.js";

const proute = express.Router();

// Route to create the product
proute.post(
  "/add_product",
  verifyToken,
  upload.single("product_image"),
  addProduct
);

//get all prodivts
proute.get("/get-products", get_product);


//buy product
proute.post("/buy/:product_id",verifyToken,buy_product)


export { proute };
