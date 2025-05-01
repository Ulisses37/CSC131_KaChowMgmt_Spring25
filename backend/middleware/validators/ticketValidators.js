import { param, body } from 'express-validator';
import {
    validateMongoId,
    validateISO8601Date,
    validateVINExists,
    validateTicketId
} from './coreValidators.js';
import Customer from '../../models/Customer.js';
import Employee from '../../models/Employee.js'; 
import Ticket from '../../models/Ticket.js';

// Helper to flatten validator arrays
const flatValidator = (validator) => Array.isArray(validator) ? validator : [validator];

export const validateCreateTicket = [
    // Customer ID Validation
    body('customerId')
        .notEmpty().withMessage('Customer ID required')
        .bail()
        .custom(async (value) => {
            const [mongoValidator] = validateMongoId('customerId', Customer);
            await mongoValidator.run(this); // Execute MongoId check
        }),

    // VIN Validation (flattened)
    ...flatValidator(validateVINExists()),

    // Ticket Type
    body('ticketType')
        .isIn(['Maintenance', 'Repair']).withMessage('Invalid type'),

    // Date Validation (flattened)
    ...flatValidator(validateISO8601Date('appDate'))
];

export const validateReschedule = [
    ...flatValidator(validateTicketId),
    ...flatValidator(validateISO8601Date('newAppDate'))
];

export const validateCancel = [
    ...flatValidator(validateTicketId)
];

export const validateCustomerTicketAccess = [
    param('customerId')
        .isMongoId()
        .withMessage('Invalid customer ID format'),

    param('vin')
        .isString()
        .trim()
        .isLength({ min: 17, max: 17 })
        .withMessage('VIN must be 17 characters'),

    // Optional: Add JWT validation later
];

export const validateCompleteTicket = [
    param('id').isMongoId().withMessage('Invalid ticket ID format'), // Validate MongoDB ID
    body('timeSpentMinutes')
        .isInt({ min: 1 })
        .withMessage('Time spent must be a positive integer (minutes)'),
    body('mechanicComments')
        .optional()
        .isString()
        .withMessage('Mechanic comments must be a string'),
    body('mechanicId')
        .optional()
        .isMongoId()
        .withMessage('Invalid mechanic ID format')
];

// New validator for assigning mechanic to ticket
export const validateAssignMechanic = [
    param('id')
        .isMongoId()
        .withMessage('Invalid ticket ID format')
        .custom(async (value) => {
            const ticket = await Ticket.findById(value);
            if (!ticket) {
                throw new Error('Ticket not found');
            }
            return true;
        }),
    body('mechanicId')
        .isMongoId()
        .withMessage('Invalid mechanic ID format')
        .custom(async (value) => {
            const mechanic = await Employee.findById(value);
            if (!mechanic) {
                throw new Error('Mechanic not found');
            }
            return true;
        })
];