import express from 'express';
import registerUserRoutes from './registerUserRoutes.js';
import passwordResetRoutes from './passwordResetRoutes.js';
import serviceHistoryRoutes from './serviceHistoryRoutes.js';

const router = express.Router();

router.use('/register', registerUserRoutes);       
router.use('/password', passwordResetRoutes);
router.use('/service-history', serviceHistoryRoutes);

export default router;

