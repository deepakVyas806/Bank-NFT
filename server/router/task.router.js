import express from 'express';
import { buyTask, sellTask } from '../controller/task.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const taskRouter = express.Router();

//buy router
taskRouter.post('/buyTask',verifyToken,buyTask)
taskRouter.post('/sellTask',verifyToken,sellTask)


export {taskRouter}