import express from 'express';
import { authenticateEmployee } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import customerController from '../controllers/customerController.js';

const router = express.Router();

// Search for customers by name (partial match)
router.get('/search/:name', 
  authenticateEmployee,
  customerController.searchCustomersByName
);

// Get customer by ID
router.get('/:id', 
  authenticateEmployee,
  customerController.getCustomerById
);

// Get all customers (admin only)
router.get('/', 
  authenticateEmployee,
  authorizeAdmin,
  customerController.getAllCustomers
);

// Get customer unpaid tickets (admin only)
router.get('/:customerId/unpaid-tickets', 
  authenticateEmployee,
  authorizeAdmin,
  customerController.getCustomerUnpaidTickets
);

export default router;