import express from 'express';
import { forgotPassword, resetPassword, changePassword } from '../controllers/resetPasswordController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.put('/change-password', authenticate, changePassword);

export default router;