import express from 'express';
import Ticket from '../models/Ticket.js';
import Customer from '../models/Customer.js';
import getNextTicketId from '../utils/getNextTicketId.js';

const router = express.Router();

//Ticket Creation
router.post('/', async (req, res) => {
    const { appDate, paymentStatus, vechVIN, customerId, ticketType, customerComments } = req.body;

    if(!appDate || !vechVIN || !customerId || !ticketType) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    try {
        const ticketId = await getNextTicketId();

        const newTicket = new Ticket({
            ticketId,
            appDate,
            paymentStatus,
            vechVIN,
            customerId,
            ticketType,
            customerComments
        });
        const savedTicket = await newTicket.save();

        await Customer.findByIdAndUpdate(
            customerId,
            {$push: {'vehichles.$[vehicle].currentTickets': savedTicket._id }},
            {arrayFilters: [{ 'vehicles.vin' : vechVIN }] }
        );
        res.status(201).json(savedTicket);
    } catch (error) {
        console.error('Error in creating ticket', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

router.get('/test', (req, res) => {
    res.json({ message: 'Hello World!' });
})

export default router;