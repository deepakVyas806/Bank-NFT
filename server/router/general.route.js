import express from 'express';
import { register } from '../controller/general.controller.js';

const router = express.Router();


// register route
router.post('/register',register);



export default router;