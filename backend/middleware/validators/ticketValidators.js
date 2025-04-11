import { body } from 'express-validator';
import {
    validateMongoId,
    validateISO8601Date,
    validateVINExists,
    validateTicketId
} from './coreValidators.js';
import Customer from '../../models/Customer.js';

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
    ...flatValidator(validateTicketId()),
    ...flatValidator(validateISO8601Date('newAppDate'))
];

export const validateCancel = [
    ...flatValidator(validateTicketId())
];