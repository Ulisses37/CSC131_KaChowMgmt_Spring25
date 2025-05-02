import mongoose from 'mongoose';


const ticketSchema = new mongoose.Schema({
    ticketId: {type: String, required: true},
    appDate: { type: Date, required: true }, // Appointment date
    completionStatus: { type: String, default: 'Unassigned' }, // Completion status (e.g., "Pending", "Completed")
    paymentStatus: { type: Boolean, default: false }, // Payment status (true = paid, false = unpaid)
    vechVIN: { type: String, required: true }, // Vehicle VIN associated with the ticket
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }, // Reference to the customer
    mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}, // Reference to the Employee
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    ticketType: { type: String, required: true }, // Type of ticket (e.g., "Maintenance", "Repair")
    customerComments: { type: String }, // Comments from the customer
    mechanicComments: [{ type: String }], // Array of comments from the mechanic
    timeSpentMinutes: {
        type: Number,
        min: 1,
        required: function() { return this.completionStatus === 'Completed' }
    }
});

const invoiceSchema = new mongoose.Schema({
    invoiceId: {type: String, required: true},
    custName: {type: String},
    vehMake: {type: String},
    vehModel: {type: String},
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }, 
    mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}, // Reference to the customer
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
    amountDue: {type: String, required: true},
    paymentType: {type: String}
});


//ONLY FOR DISPLAYING OUTPUT NO DATABASE MODIFICATION see .populate() mongoose method $
// •┈꒰ა ♡ ໒꒱┈•
invoiceSchema.virtual('mechDetailstoInvoice', {
    ref: 'Employee',
    localField: 'mechanicId',
    foreignField: '_id',
    foreignField: '_id',
    justOne: true 
});

invoiceSchema.virtual('tickDetailstoInvoice', {
    ref: 'Ticket',
    localField: 'ticketId',
    foreignField: '_id',
    justOne: true 
});

invoiceSchema.virtual('vehDetailstoInvoice', {
    ref: 'Vehicle',
    localField: 'vehicleId',
    foreignField: '_id',
    justOne: true 
});
//•┈꒰ა ♡ ໒꒱┈•


const Ticket = mongoose.model('Ticket', ticketSchema);
const Invoice = mongoose.model('Invoice', invoiceSchema);

export default {Ticket, Invoice};