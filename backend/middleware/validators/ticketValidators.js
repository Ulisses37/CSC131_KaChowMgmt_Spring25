import { param, body } from 'express-validator';
import Customer from '../../models/Customer.js';
import Employee from '../../models/Employee.js';
import Vehicle from '../../models/Vehicle.js';
import Ticket from '../../models/Ticket.js';

// Utility: Validate if VIN exists in DB
const validateVINExists = () => [
    body('vin')
        .isString().withMessage('VIN must be a string')
        .custom(async (vin) => {
            const vehicle = await Vehicle.findOne({ vin });
            if (!vehicle) {
                throw new Error('Vehicle not found');
            }
            return true;
        })
];

// Utility: Validate if date is valid ISO 8601
const validateISO8601Date = (fieldName) => [
    body(fieldName)
        .notEmpty().withMessage(`${fieldName} is required`)
        .isISO8601().withMessage(`${fieldName} must be a valid ISO 8601 date`)
];

// Utility: Validate MongoDB ObjectId from URL params
const validateTicketId = [
    param('id').isMongoId().withMessage('Invalid ticket ID format'),
];

export const validateCreateTicket = [
    body('customerId')
        .notEmpty().withMessage('Customer ID is required')
        .bail()
        .isMongoId().withMessage('Invalid Customer ID format')
        .custom(async (id) => {
            const customer = await Customer.findById(id);
            if (!customer) {
                throw new Error('Customer not found');
            }
            return true;
        }),

    ...validateVINExists(),

    body('ticketType')
        .isIn(['Maintenance', 'Repair', 'Oil Change']).withMessage('Invalid type'),

    ...validateISO8601Date('appDate')
];

export const validateReschedule = [
    ...validateTicketId,
    ...validateISO8601Date('newAppDate')
];

export const validateCancel = [
    ...validateTicketId
];

export const validateCustomerTicketAccess = [
    param('customerId')
        .isMongoId().withMessage('Invalid customer ID format'),

    param('vin')
        .isString()
        .trim()
        .isLength({ min: 17, max: 17 })
        .withMessage('VIN must be 17 characters'),
];

export const validateCompleteTicket = [
    param('id').isMongoId().withMessage('Invalid ticket ID format'),

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

export const validateAssignMechanic = [
    param('id')
        .isMongoId()
        .withMessage('Invalid ticket ID format')
        .custom(async (id) => {
            const ticket = await Ticket.findById(id);
            if (!ticket) {
                throw new Error('Ticket not found');
            }
            return true;
        }),

    body('mechanicId')
        .isMongoId()
        .withMessage('Invalid mechanic ID format')
        .custom(async (id) => {
            const mechanic = await Employee.findById(id);
            if (!mechanic) {
                throw new Error('Mechanic not found');
            }
            return true;
        })
];