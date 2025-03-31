import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    vin: { type: String, required: true, unique: true },
    currentTickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
    pastTickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;