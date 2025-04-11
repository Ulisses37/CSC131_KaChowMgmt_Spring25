import { param, body } from 'express-validator';
import { validateMongoId } from './coreValidators.js';
import Mechanic from '../../models/Mechanic.js';
import Ticket from '../../models/Ticket.js';

export const validateMechanicId = param('mechanicId')
    .isMongoId()
    .custom(async (id) => {
        const exists = await Mechanic.exists({ _id: id });
        if (!exists) throw new Error('Mechanic not found');
    });

export const validateTicketUpdate = [
    body('completionStatus')
        .optional()
        .isIn(['Pending', 'In Progress', 'Completed', 'Delayed'])
        .withMessage('Invalid status'),
    body('comments')
        .optional()
        .isString()
        .withMessage('Comments must be text')
];