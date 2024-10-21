import express from 'express';
import { get_product } from '../../controller/product.controller.js/general.controller.js';

const generalProduct = express.Router();


generalProduct.get('/get-products',get_product)

export {generalProduct}