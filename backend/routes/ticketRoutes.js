import express from 'express';
import {
    validateCreateTicket,
    validateReschedule,
    validateCancel,
    validateRequest,
    validateCustomerTicketAccess,
    validateCompleteTicket,
} from "../middleware/validators/index.js";
import {
    createTicket,
    cancelTicket,
    rescheduleTicket,
    getVehicleMaintenanceStatus,
    completeTicket,
    addTicketReview, // Add this import
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

export default router;