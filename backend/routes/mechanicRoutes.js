import express from 'express';
import {
    getMechanicTickets,
    getMechanicTicket,
    updateTicketStatus
} from '../controllers/mechanicController.js';
import {
    validateMechanicId,
    validateTicketUpdate
} from '../middleware/validators/index.js';
import { validateRequest } from '../middleware/validators/index.js';

const router = express.Router();

// Future auth placeholder (currently does nothing)
const optionalAuth = (req, res, next) => next();

// Routes with future-auth compatibility
router.get('/mechanics/:mechanicId/tickets',
    optionalAuth, // Will be replaced with authenticate later
    validateMechanicId,
    validateRequest,
    getMechanicTickets
);

router.get('/mechanics/:mechanicId/tickets/:ticketId',
    optionalAuth,
    validateMechanicId,
    validateRequest,
    getMechanicTicket
);

router.patch('/mechanics/:mechanicId/tickets/:ticketId',
    optionalAuth,
    validateMechanicId,
    ...validateTicketUpdate,
    validateRequest,
    updateTicketStatus
);

export default router;