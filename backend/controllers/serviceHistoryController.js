import mongoose from 'mongoose';
import Ticket from '../models/Ticket.js';
import Vehicle from '../models/Vehicle.js';

export const getServiceHistory = async (req, res) => {
    try {
        const customerId = req.params.customerId;

        // Enhanced ID validation and conversion
        if (!customerId || typeof customerId !== 'string') {
            return res.status(400).json({
                error: 'Invalid customer ID format',
                details: {
                    receivedType: typeof customerId,
                    receivedValue: customerId
                }
            });
        }

        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({
                error: 'Invalid customer ID format',
                details: 'The provided ID is not a valid MongoDB ObjectId'
            });
        }

        const customerObjectId = new mongoose.Types.ObjectId(customerId);

        // Find all completed tickets
        const serviceHistory = await Ticket.find({
            customerId: customerObjectId,
            completionStatus: 'Completed'
        })
            .select('ticketId appDate ticketType vechVIN mechanicComments completionDate')
            .sort({ appDate: -1 })
            .lean();

        // Return empty array if no history found
        if (!serviceHistory || serviceHistory.length === 0) {
            return res.status(200).json([]);
        }

        // Get vehicle info for each ticket
        const formattedHistory = await Promise.all(
            serviceHistory.map(async (ticket) => {
                try {
                    const vehicle = await Vehicle.findOne({
                        vin: ticket.vechVIN,
                        owner: customerObjectId
                    }).select('make model').lean();

                    return {
                        "Ticket #": ticket.ticketId || 'Unknown',
                        "Make/Model": vehicle ? `${vehicle.make || 'Unknown'} ${vehicle.model || 'Unknown'}` : 'Unknown',
                        "VIN #": ticket.vechVIN || 'Unknown',
                        "Appointment Type": ticket.ticketType || 'Unknown',
                        "Date Completion": ticket.completionDate ? (
                            new Date(ticket.completionDate).toISOString().split('T')[0] + ' ' +
                            new Date(ticket.completionDate).toISOString().split('T')[1].substring(0, 5)
                        ) : 'Unknown',
                        "Mechanic Notes": ticket.mechanicComments ? (
                            Array.isArray(ticket.mechanicComments) ?
                                ticket.mechanicComments.join('\n') :
                                String(ticket.mechanicComments)
                        ) : 'No notes'
                    };
                } catch (vehicleErr) {
                    return {
                        "Ticket #": ticket.ticketId || 'Unknown',
                        "Make/Model": 'Unknown',
                        "VIN #": ticket.vechVIN || 'Unknown',
                        "Appointment Type": ticket.ticketType || 'Unknown',
                        "Date Completion": ticket.appDate ?
                            new Date(ticket.appDate).toLocaleDateString() : 'Unknown',
                        "Mechanic Notes": 'Error loading vehicle details'
                    };
                }
            })
        );

        res.status(200).json(formattedHistory);

    } catch (error) {
        console.error('Service history error:', error.message);

        res.status(500).json({
            error: 'Server error while fetching service history',
            details: process.env.NODE_ENV === 'development'
                ? error.message
                : 'Please try again later'
        });
    }
}
