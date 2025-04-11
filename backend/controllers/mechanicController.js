import Ticket from '../models/Ticket.js';

// Get all tickets for a mechanic
export const getMechanicTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({
            assignedMechanic: req.params.mechanicId
        });
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get specific ticket with mechanic validation
export const getMechanicTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({
            _id: req.params.ticketId,
            assignedMechanic: req.params.mechanicId
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found or not assigned' });
        }

        res.json(ticket);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update ticket status/comments
export const updateTicketStatus = async (req, res) => {
    try {
        const updates = {};
        if (req.body.completionStatus) updates.completionStatus = req.body.completionStatus;
        if (req.body.comments) updates.comments = req.body.comments;

        const ticket = await Ticket.findOneAndUpdate(
            {
                _id: req.params.ticketId,
                assignedMechanic: req.params.mechanicId
            },
            { $set: updates },
            { new: true }
        );

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found or not assigned' });
        }

        res.json(ticket);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};