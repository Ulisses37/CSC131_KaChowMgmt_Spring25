import { body, param, validationResult } from 'express-validator';
import Ticket from '../../models/Ticket.js';
import Vehicle from '../../models/Vehicle.js';

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.type === 'field' ? err.path : err.param,
                message: err.msg
            }))
        });
    }
    next();
};

// Base validators (updated for express-validator v6+)
export const validateMongoId = (field, model, message = 'Not found') => [
    param(field)
        .isMongoId().withMessage('Invalid ID format'),
    param(field)
        .custom(async (id, { req }) => {
            const doc = await model.findById(id);
            if (!doc) throw new Error(message);
            req[`${field}Doc`] = doc; // Attach document to request
            return true;
        })
];

export const validateISO8601Date = (field) => [
    body(field)
        .isISO8601().withMessage('Must be ISO 8601 format'),
    body(field)
        .custom((date) => {
            if (new Date(date) < new Date()) {
                throw new Error('Date cannot be in past');
            }
            return true;
        })
];

export const validateVINExists = () =>
    body('vechVIN')
        .custom(async (vin, { req }) => {
            const vehicle = await Vehicle.findOne({ vin });
            if (!vehicle) throw new Error('Vehicle not found');
            req.vehicle = vehicle; // Attach to request
            return true;
        });

export const validateTicketId = [
    param('id')
        .isMongoId().withMessage('Invalid ticket ID')
        .custom(async (id, { req }) => {
            const ticket = await Ticket.findById(id);
            if (!ticket) throw new Error('Ticket not found');
            req.ticket = ticket; // Attach to request for later use
            return true;
        })
];