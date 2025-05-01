import express from 'express';
import registerUserRoutes from './registerUserRoutes.js';
import passwordResetRoutes from './passwordResetRoutes.js';
import serviceHistoryRoutes from './serviceHistoryRoutes.js';
import { authenticateCustomer, authenticateEmployee } from '../middleware/authMiddleware.js';
import { verifyToken } from '../controllers/authController.js';

const router = express.Router();

// Token verification endpoint - works for both customer and employee
router.get('/verify-token', (req, res, next) => {
    // Try customer auth first
    authenticateCustomer(req, res, (err) => {
        if (!err) return next();
        // If customer auth failed, try employee auth
        authenticateEmployee(req, res, next);
    });
}, verifyToken);


router.use('/register', registerUserRoutes);       
router.use('/password', passwordResetRoutes);
router.use('/service-history', serviceHistoryRoutes);

export default router;

