import mongoose from 'mongoose';

// Customer schema
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Customer's name
    email: { type: String, required: true, unique: true }, // Customer's email
    password: { type: String, required: true }, // Customer's password (hash this in production)
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }], // Array of vehicle subdocuments
    resetPasswordToken: { type: String }, //Token to put on link for password change email
    resetTokenExpiration: { type: Date }
});

// Customer model
const Customer = mongoose.model('Customer', customerSchema);

export default Customer;