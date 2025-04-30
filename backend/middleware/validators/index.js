// Import all validators
import { validationResult } from 'express-validator';
import {
    validateCreateTicket,
    validateReschedule,
    validateCancel,
    validateCustomerTicketAccess,
    validateCompleteTicket,
    validateAssignMechanic
} from './ticketValidators.js';

import {
    validateEmployeeId,
    validateTicketUpdate,
    validateCreateEmployee
} from './employeeValidators.js';

// General validation middleware
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            errors: errors.array()
        });
    }
    next();
};

// Export all validators
export {
    validateRequest,
    validateCreateTicket,
    validateReschedule,
    validateCancel,
    validateCustomerTicketAccess,
    validateCompleteTicket,
    validateEmployeeId,
    validateTicketUpdate,
    validateCreateEmployee,
    validateAssignMechanic
};