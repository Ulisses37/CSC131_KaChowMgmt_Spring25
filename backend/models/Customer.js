import mongoose from 'mongoose';    

// Vehicle subdocument schema
const vehicleSchema = new mongoose.Schema({
    make: { type: String, required: true }, // Vehicle make (e.g., "Toyota")
    model: { type: String, required: true }, // Vehicle model (e.g., "Camry")
    vin: { type: String, required: true, unique: false }, // Vehicle Identification Number (VIN)
    currentTickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }], // Array of current ticket IDs
    pastTickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }] // Array of past ticket IDs
});


// Customer schema
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Customer's name
    email: { type: String, required: true, unique: true }, // Customer's email
    password: { type: String, required: true }, // Customer's password (hash this in production)
    vehicles: { type: [vehicleSchema], default: []}, // Array of vehicle subdocuments
    resetPasswordToken: { type: String },
    resetTokenExpiration: { type: Date },
});

// Customer model
const Customer = mongoose.model('Customer', customerSchema);

export default Customer; 