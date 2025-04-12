import { param, body } from 'express-validator';
import Employee from '../../models/Employee.js';

// Validate employeeId exists (without role check)
export const validateEmployeeId = param('employeeId')
    .isMongoId()
    .withMessage('Invalid employee ID format')
    .custom(async (id) => {
        const employee = await Employee.findById(id);
        if (!employee) throw new Error('Employee not found');
    });

// Validate ticket update fields
export const validateTicketUpdate = [
    body('completionStatus')
        .optional()
        .isIn(['Unassigned', 'Assigned', 'In Progress', 'Completed', 'Delayed'])
        .withMessage('Invalid status'),
    body('mechanicComments')
        .optional()
        .isString()
        .withMessage('Comments must be text')
];

// Validate Employee Creation
export const validateCreateEmployee = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

    body('specialties')
        .optional()
        .isArray().withMessage('Specialties must be an array'),

    body('payRate')
        .isFloat({ min: 0 }).withMessage('Invalid pay rate'),

    body('admin')
        .optional()
        .isBoolean().withMessage('Admin flag must be true/false')
];