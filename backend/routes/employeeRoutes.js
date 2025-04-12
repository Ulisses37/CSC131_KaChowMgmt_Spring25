import express from 'express';
import {
    createEmployee,
    getEmployeeTickets,
    getEmployeeTicket,
    updateTicketStatus
} from '../controllers/employeeController.js';
import {
    validateRequest,
    validateEmployeeId,
    validateTicketUpdate,
    validateCreateEmployee
} from '../middleware/validators/index.js';

const router = express.Router();

// Admin-only employee creation
router.post('/',
    // authenticate,       // Uncomment when JWT is ready
    // authorizeAdmin,     // Uncomment when JWT is ready
    validateCreateEmployee,
    validateRequest,
    createEmployee
);

// GET all tickets assigned to an employee
router.get('/:employeeId/tickets',
    // authenticate, // Commented out for testing
    validateEmployeeId,
    validateRequest,
    getEmployeeTickets
);

// GET specific ticket assigned to an employee
router.get('/:employeeId/tickets/:ticketId',
    // authenticate,
    validateEmployeeId,
    validateRequest,
    getEmployeeTicket
);

// PATCH update ticket status/comments
router.patch('/:employeeId/tickets/:ticketId',
    // authenticate,
    validateEmployeeId,
    ...validateTicketUpdate,
    validateRequest,
    updateTicketStatus
);

export default router;