import express from 'express';
import { customerLogin } from '../controllers/loginController.js';
import { employeeLogin } from '../controllers/loginController.js';
const router = express.Router();

router.post('/customerLogin', customerLogin);
router.post('/employeeLogin', employeeLogin);
//router.put('/reset-password/:token', resetPassword);


export default router; 