import mongoose from "mongoose";

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

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
