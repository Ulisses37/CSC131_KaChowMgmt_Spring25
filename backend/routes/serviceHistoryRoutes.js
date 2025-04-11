import express from 'express';
import { getServiceHistory } from '../controllers/serviceHistoryController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:customerId', authenticate, getServiceHistory);

export default router;