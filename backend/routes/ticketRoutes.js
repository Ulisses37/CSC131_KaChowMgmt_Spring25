import express from 'express';
import Ticket from '../models/Ticket.js';
import { getTicketsByCustomer } from '../controllers/ticketController.js';
import {
    validateCreateTicket,
    validateReschedule,
    validateCancel,
    validateRequest,
    validateCustomerTicketAccess,
    validateCompleteTicket,
    validateAssignMechanic,
} from "../middleware/validators/index.js";
import {
    createTicket,
    cancelTicket,
    rescheduleTicket,
    getVehicleMaintenanceStatus,
    completeTicket,
    addTicketReview,
    getTicketMechanics,
} from '../controllers/ticketController.js';

import { assignMechanictoTicket } from '../controllers/patchTicketController.js';

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

// CUSTOMER PULL TICKET STATUS
router.get('/customer/:customerId/vehicle/:vin/status',
    validateCustomerTicketAccess,
    getVehicleMaintenanceStatus
);

router.patch('/:id/complete',
    validateCompleteTicket, // Use the stricter validator
    validateRequest,        // Your existing error handler
    completeTicket
);

// Add this new route at the end
router.post('/:id/review',
    validateRequest,
    addTicketReview
);

// Admin Assign Ticket
router.get('/:id/mechanics',
    getTicketMechanics);
    
// Updated route with validator
router.patch('/:id',
    validateAssignMechanic,
    validateRequest,
    assignMechanictoTicket);

// Get all tickets (admin)
router.get('/',
    async (req, res) => {
        try {
            const tickets = await Ticket.find();
            res.status(200).json(tickets);
        } catch (err) {
            res.status(500).json({ message: 'Failed to fetch tickets', error: err.message });
        }
    }
);

router.patch('/:id/status', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

        const { status } = req.body;
        ticket.completionStatus = status;
        await ticket.save();

        res.status(200).json({ message: 'Status updated', ticket });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/customer/:customerId/tickets', getTicketsByCustomer);

export default router;