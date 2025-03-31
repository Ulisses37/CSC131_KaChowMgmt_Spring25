import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    appDate: { type: Date, required: true }, // Appointment date
    completionStatus: { type: String, required: true }, // Completion status (e.g., "Pending", "Completed")
    paymentStatus: { type: Boolean, default: false }, // Payment status (true = paid, false = unpaid)
    vechVIN: { type: String, required: true }, // Vehicle VIN associated with the ticket
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }, // Reference to the customer
    mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}, // Reference to the Employee
    ticketType: { type: String, required: true }, // Type of ticket (e.g., "Maintenance", "Repair")
    customerComments: { type: String }, // Comments from the customer
    mechanicComments: [{ type: String }] // Array of comments from the mechanic
});


const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;