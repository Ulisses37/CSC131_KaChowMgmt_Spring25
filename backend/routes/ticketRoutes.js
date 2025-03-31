import express from 'express';
import Ticket from '../models/Ticket.js';
import Customer from '../models/Customer.js';
import getNextTicketId from '../utils/getNextTicketId.js';
import isValidDate from '../utils/dateValidation.js';
import Vehicle from "../models/Vehicle.js";

const router = express.Router();

//Ticket Creation
router.post('/', async (req, res) => {
    const { appDate, vechVIN, customerId, ticketType, customerComments } = req.body;

    if(!appDate || !vechVIN || !customerId || !ticketType) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    try {

        const vehicle = await Vehicle.findOne({vin: vechVIN});
        if (!vehicle) {
            return res.status(400).send({ message: 'Vehicle not found.' });
        }

        const ticketId = await getNextTicketId();

        const newTicket = new Ticket({
            ticketId,
            appDate,
            vechVIN,
            customerId,
            ticketType,
            customerComments,
            completionStatus: 'Unassigned'
        });

        const savedTicket = await newTicket.save();

        await Vehicle.findByIdAndUpdate(
            vehicle._id,
            { $push: {currentTickets: savedTicket._id }}
        );


        res.status(201).json(savedTicket);
    } catch (error) {
        console.error('Error in creating ticket', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
})

router.patch('/:id/reschedule', async (req, res) => {
    const {newAppDate} = req.body;

    try{
        if (!newAppDate || !isValidDate(newAppDate)) {
            return res.status(400).send({ message: 'Invalid date.' });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { appDate: new Date (newAppDate) },
            { new: true }
        );

        if(!updatedTicket) {
            return res.status(400).send({ message: 'Ticket not found' });
        }

        res.status(200).json(updatedTicket);
    } catch(error){
        res.status(500).json({
            message: 'Error in rescheduling ticket',
            error: error.message
        })
    }
})

router.patch('/:id/cancel', async (req, res) => {
    const ticketId = req.params.id;

    try{
        const ticket = await Ticket.findOne({ticketId: ticketId});
        if (!ticket) {
            return res.status(404).send({ message: 'Ticket not found' });
        }

        ticket.completionStatus = 'Canceled';
        await ticket.save();



        const vehicle = await Vehicle.findOne({vin: ticket.vechVIN});
        if (!vehicle) {
            return res.status(400).send({ message: 'Vehicle not found' });
        }

        await Vehicle.findOneAndUpdate(
            { vin: ticket.vechVIN },
            {
                $pull: { currentTickets: ticket._id },
                $push: { pastTickets: ticket._id }
            }
        );


        res.status(200).json(ticket);
    }catch(error){
        res.status(500).send({
            message: 'Error in canceling ticket',
            error: error.message
        });
    }
})

export default router;