import Ticket from '../models/Ticket.js';
import Vehicle from '../models/Vehicle.js';
import mongoose from 'mongoose';

//KMS-63 B Customer Car History
export const getServiceHistory = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ error: 'Invalid customer ID' });
        }

        // Find all completed tickets for this customer
        const serviceHistory = await Ticket.find({
            customerId: customerId,
            completionStatus: 'Completed'
        })
        .select('ticketId appDate ticketType vechVIN mechanicComments')
        .sort({ appDate: -1 })
        .lean();

        // Get vehicle information for each ticket
        const formattedHistory = await Promise.all(serviceHistory.map(async (ticket) => {
            // Find the vehicle using the VIN from the ticket
            const vehicle = await Vehicle.findOne({ 
                vin: ticket.vechVIN,
                owner: customerId 
            }).select('make model').lean();

            return {
                "Ticket #": ticket.ticketId,
                "Make/Model": vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown',
                "VIN #": ticket.vechVIN,
                "Appointment Type": ticket.ticketType,
                "Date Completion": ticket.appDate.toLocaleDateString(),
                //"Notes": ticket.mechanicComments?.join('\n') || 'No notes' //Maybe this can be implemented later
            };
        }));

        res.status(200).json(formattedHistory);
        
    } catch (error) {
        console.error('Error fetching service history:', error);
        res.status(500).json({ error: 'Server error while fetching service history' });
    }
};