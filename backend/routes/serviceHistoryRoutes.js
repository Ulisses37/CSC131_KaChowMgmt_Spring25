import express from 'express';
import { getServiceHistory } from '../controllers/serviceHistoryController.js';
import { authenticateCustomer } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:customerId', authenticateCustomer, getServiceHistory);

export default router;