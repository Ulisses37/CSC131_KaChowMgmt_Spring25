import express from 'express';
import {
    createEmployee,
    getEmployeeTickets,
    getEmployeeTicket,
    updateTicketStatus,
    clockIn,
    clockOut,
    getClockStatus,
    getTimeEntries,
    getAllEmployeesTimeEntries,
    updateTimeEntry,
    markEntriesAsPaid,
    getPayrollSummary,
    searchEmployeesByName,
} from '../controllers/employeeController.js';
import {
    validateRequest,
    validateEmployeeId,
    validateTicketUpdate,
    validateCreateEmployee
} from '../middleware/validators/index.js';
import { authenticateEmployee as auth } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import Employee from '../models/Employee.js';

const router = express.Router();

// Admin-only employee creation
router.post('/',
    auth,
    authorizeAdmin,
    validateCreateEmployee,
    validateRequest,
    createEmployee
);

// ✅ Place this before any dynamic :employeeId routes
router.get('/search', auth, authorizeAdmin, searchEmployeesByName);

// Admin: Get all employees with their time entries
router.get('/admin/time-entries',
    auth,
    authorizeAdmin,
    getAllEmployeesTimeEntries
);

// Admin: Update time entry for an employee
router.patch('/admin/:employeeId/time-entries/:entryId',
    auth,
    authorizeAdmin,
    updateTimeEntry
);

// Admin: Mark multiple time entries as paid
router.post('/admin/:employeeId/mark-paid',
    auth,
    authorizeAdmin,
    markEntriesAsPaid
);

// Admin: Get payroll summary for all employees
router.get('/admin/payroll-summary',
    auth,
    authorizeAdmin,
    getPayrollSummary
);

// GET all employees or filter by role (admin only)
router.get('/', auth, authorizeAdmin, async (req, res) => {
    try {
        const role = req.query.role;
        let filter = {};

        if (role === 'mechanic') {
            filter = { admin: false };
        }

        const employees = await Employee.find(filter)
            .select('-password -resetPasswordToken -resetTokenExpiration');

        res.status(200).json({ success: true, data: employees });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET all tickets assigned to an employee
router.get('/:employeeId/tickets',
    auth,
    validateEmployeeId,
    (req, res, next) => {
        if (req.employee._id.toString() !== req.params.employeeId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        next();
    },
    validateRequest,
    getEmployeeTickets
);

// GET a specific ticket assigned to an employee
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

// Gets a single employee ID
router.get('/:employeeId',
    auth,
    authorizeAdmin,
    async (req, res) => {
        try {
            const employee = await Employee.findById(req.params.employeeId)
                .select('-password -resetPasswordToken -resetTokenExpiration');

            if (!employee) {
                return res.status(404).json({ success: false, message: 'Employee not found' });
            }

            res.status(200).json({ success: true, data: employee });
        } catch (err) {
            res.status(500).json({ success: false, error: 'Server error: ' + err.message });
        }
    }
);

export default router;
