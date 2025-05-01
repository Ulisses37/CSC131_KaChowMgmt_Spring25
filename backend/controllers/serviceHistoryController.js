import Ticket from '../models/Ticket.js';
import Vehicle from '../models/Vehicle.js';
import mongoose from 'mongoose';

export const getServiceHistory = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        
        // Enhanced ID validation and conversion
        if (!customerId || typeof customerId !== 'string') {
            console.error('Invalid customer ID format:', customerId);
            return res.status(400).json({ 
                error: 'Invalid customer ID format',
                details: {
                    receivedType: typeof customerId,
                    receivedValue: customerId
                }
            });
        }

        let customerObjectId;
        try {
            // Convert to ObjectId if not already one
            customerObjectId = mongoose.Types.ObjectId.isValid(customerId) 
                ? new mongoose.Types.ObjectId(customerId)
                : customerId;
        } catch (err) {
            console.error('ID conversion error:', err);
            return res.status(400).json({ 
                error: 'Invalid customer ID',
                details: err.message
            });
        }

        // Debug log before query
        console.log('Fetching history for customer ID:', {
            original: customerId,
            converted: customerObjectId,
            isValid: mongoose.Types.ObjectId.isValid(customerObjectId)
        });

        // Find all completed tickets
        const serviceHistory = await Ticket.find({
            customerId: customerObjectId,
            completionStatus: 'Completed'
        })
        .select('ticketId appDate ticketType vechVIN mechanicComments')
        .sort({ appDate: -1 })
        .lean();

        // Get vehicle info for each ticket
        const formattedHistory = await Promise.all(
            serviceHistory.map(async (ticket) => {
                try {
                    const vehicle = await Vehicle.findOne({ 
                        vin: ticket.vechVIN,
                        owner: customerObjectId 
                    }).select('make model').lean();

                    return {
                        "Ticket #": ticket.ticketId,
                        "Make/Model": vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown',
                        "VIN #": ticket.vechVIN,
                        "Appointment Type": ticket.ticketType,
                        "Date Completion": ticket.appDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }),
                        "Mechanic Notes": ticket.mechanicComments?.join('\n') || 'No notes'
                    };
                } catch (vehicleErr) {
                    console.error('Vehicle lookup error:', vehicleErr);
                    return {
                        "Ticket #": ticket.ticketId,
                        "Make/Model": 'Unknown',
                        "VIN #": ticket.vechVIN,
                        "Appointment Type": ticket.ticketType,
                        "Date Completion": ticket.appDate.toLocaleDateString(),
                        "Mechanic Notes": 'Error loading vehicle details'
                    };
                }
            })
        );

        // Debug log before response
        console.log('Successfully fetched history:', {
            ticketCount: formattedHistory.length,
            customerId: customerObjectId
        });

        res.status(200).json(formattedHistory);
        
    } catch (error) {
        console.error('Service history error:', {
            error: error.message,
            stack: error.stack,
            params: req.params,
            timestamp: new Date().toISOString()
        });
        
        res.status(500).json({ 
            error: 'Server error while fetching service history',
            details: process.env.NODE_ENV === 'development' 
                ? error.message 
                : 'Please try again later'
        });
    }
};