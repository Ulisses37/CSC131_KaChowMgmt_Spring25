import express from 'express';
import  customerLogin  from '../controllers/loginController.js';
import  employeeLogin  from '../controllers/loginController.js';
import loginController from '../controllers/loginController.js';
const router = express.Router();

router.post('/customer', loginController.customerLogin);
router.post('/employee', loginController.employeeLogin);
//router.put('/reset-password/:token', resetPassword);


export default router; 