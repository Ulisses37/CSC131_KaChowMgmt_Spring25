import express from 'express';
import {
    validateCreateTicket,
    validateReschedule,
    validateCancel,
    validateRequest
} from "../middleware/validators/index.js";
import {
    createTicket,
    cancelTicket,
    rescheduleTicket,
} from '../controllers/ticketController.js';

const router = express.Router();

// CREATE TICKET
router.post('/',
    validateCreateTicket,
    validateRequest,
    createTicket
);

// RESCHEDULE TICKET
router.patch('/:id/reschedule',
    validateReschedule,
    validateRequest,
    rescheduleTicket
);

// CANCEL TICKET
router.patch('/:id/cancel',
    validateCancel,
    validateRequest,
    cancelTicket
);

export default router;