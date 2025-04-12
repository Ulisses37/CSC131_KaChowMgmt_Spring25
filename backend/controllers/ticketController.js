import Ticket from '../models/Ticket.js';
import Vehicle from '../models/Vehicle.js';
import Customer from '../models/Customer.js';
import  getNextTicketId  from '../utils/getNextTicketId.js';
import { validationResult } from 'express-validator';

// Create New Ticket
export const createTicket = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { appDate, vechVIN, customerId, ticketType, customerComments } = req.body;

    try {
        // Verify vehicle exists
        const vehicle = await Vehicle.findOne({ vin: vechVIN });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        // Verify customer exists
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const ticketId = await getNextTicketId();
        const newTicket = new Ticket({
            ticketId,
            appDate,
            vechVIN,
            vehicle: vehicle._id, // Store reference to vehicle
            customerId,
            ticketType,
            customerComments,
            completionStatus: 'Unassigned'
        });

        const savedTicket = await newTicket.save();

        // Update vehicle's current tickets
        await Vehicle.findByIdAndUpdate(
            vehicle._id,
            { $push: { currentTickets: savedTicket._id } }
        );

        res.status(201).json(savedTicket);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create ticket',
            error: error.message
        });
    }
};

// Reschedule Ticket
export const rescheduleTicket = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { appDate: new Date(req.body.newAppDate) },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to reschedule ticket',
            error: error.message
        });
    }
};

// Cancel Ticket
export const cancelTicket = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const ticket = await Ticket.findOne({ ticketId: req.params.id });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Update ticket status
        ticket.completionStatus = 'Canceled';
        await ticket.save();

        // Update vehicle's ticket arrays
        const vehicle = await Vehicle.findOne({ vin: ticket.vechVIN });
        if (!vehicle) {
            return res.status(404).json({ message: 'Associated vehicle not found' });
        }

        await Vehicle.findByIdAndUpdate(
            vehicle._id,
            {
                $pull: { currentTickets: ticket._id },
                $push: { pastTickets: ticket._id }
            }
        );

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to cancel ticket',
            error: error.message
        });
    }
};

// Complete Ticket
export const completeTicket = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const ticket = await Ticket.findOne({ ticketId: req.params.id });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Update ticket status
        ticket.completionStatus = 'Completed';
        await ticket.save();

        // Update vehicle's ticket arrays
        const vehicle = await Vehicle.findOne({ vin: ticket.vechVIN });
        if (!vehicle) {
            return res.status(404).json({ message: 'Associated vehicle not found' });
        }

        await Vehicle.findByIdAndUpdate(
            vehicle._id,
            {
                $pull: { currentTickets: ticket._id },
                $push: { pastTickets: ticket._id }
            }
        );

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to complete ticket',
            error: error.message
        });
    }
};

export const getVehicleMaintenanceStatus = async (req, res) => {
    try {
        const { customerId, vin } = req.params;

        // Verify customer owns the vehicle
        const vehicle = await Vehicle.findOne({
            vin,
            owner: customerId
        }).populate('currentTickets pastTickets');

        if (!vehicle) {
            return res.status(404).json({
                message: 'Vehicle not found or not owned by customer'
            });
        }

        // Format response
        const response = {
            vehicle: {
                make: vehicle.make,
                model: vehicle.model,
                year: vehicle.year,
                vin: vehicle.vin
            },
            currentStatus: vehicle.currentTickets.map(ticket => ({
                ticketId: ticket.ticketId,
                type: ticket.ticketType,
                status: ticket.completionStatus,
                lastUpdated: ticket.updatedAt
            })),
            maintenanceHistory: vehicle.pastTickets.map(ticket => ({
                ticketId: ticket.ticketId,
                type: ticket.ticketType,
                completedDate: ticket.updatedAt,
                workPerformed: ticket.mechanicComments
            }))
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve maintenance status',
            error: error.message
        });
    }
};