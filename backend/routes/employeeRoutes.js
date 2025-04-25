import express from 'express';
import {
    createEmployee,
    getEmployeeTickets,
    getEmployeeTicket,
    updateTicketStatus,
    clockIn,
    clockOut,
    getClockStatus,
    getTimeEntries
} from '../controllers/employeeController.js';
import {
    validateRequest,
    validateEmployeeId,
    validateTicketUpdate,
    validateCreateEmployee
} from '../middleware/validators/index.js';
import { authenticateEmployee as auth } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js'; // New import

const router = express.Router();

// Admin-only employee creation
router.post('/',
    auth,
    authorizeAdmin, // Now properly implemented
    validateCreateEmployee,
    validateRequest,
    createEmployee
);

// GET all tickets assigned to an employee
router.get('/:employeeId/tickets',
    auth,
    validateEmployeeId,
    (req, res, next) => {
        // Additional check to ensure employee can only access their own tickets
        if (req.employee._id.toString() !== req.params.employeeId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        next();
    },
    validateRequest,
    getEmployeeTickets
);

// GET specific ticket assigned to an employee
router.get('/:employeeId/tickets/:ticketId',
    auth,
    validateEmployeeId,
    (req, res, next) => {
        if (req.employee._id.toString() !== req.params.employeeId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        next();
    },
    validateRequest,
    getEmployeeTicket
);

// PATCH update ticket status/comments
router.patch('/:employeeId/tickets/:ticketId',
    auth,
    validateEmployeeId,
    (req, res, next) => {
        if (req.employee._id.toString() !== req.params.employeeId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        next();
    },
    ...validateTicketUpdate,
    validateRequest,
    updateTicketStatus
);

// Clock In/Out Routes
router.post('/:employeeId/clock-in',
    auth,
    validateEmployeeId,
    (req, res, next) => {
        if (req.employee._id.toString() !== req.params.employeeId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        next();
    },
    validateRequest,
    clockIn
);

router.post('/:employeeId/clock-out',
    auth,
    validateEmployeeId,
    (req, res, next) => {
        if (req.employee._id.toString() !== req.params.employeeId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        next();
    },
    validateRequest,
    clockOut
);

router.get('/:employeeId/clock-status',
    auth,
    validateEmployeeId,
    (req, res, next) => {
        if (req.employee._id.toString() !== req.params.employeeId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        next();
    },
    validateRequest,
    getClockStatus
);

router.get('/:employeeId/time-entries',
    auth,
    validateEmployeeId,
    (req, res, next) => {
        if (req.employee._id.toString() !== req.params.employeeId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        next();
    },
    validateRequest,
    getTimeEntries
);

export default router;