import express from 'express';
import { invest_user } from '../../controller/product.controller.js/investment.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const invest_route = express.Router();

invest_route.post('/invest-product/:id',verifyToken,invest_user)



export {invest_route}