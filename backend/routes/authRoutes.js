import express from 'express';
import registerUserRoutes from './registerUserRoutes.js';
import passwordResetRoutes from './passwordResetRoutes.js';

const router = express.Router();

router.use('/register', registerUserRoutes);       
router.use('/password', passwordResetRoutes);      

export default router;



