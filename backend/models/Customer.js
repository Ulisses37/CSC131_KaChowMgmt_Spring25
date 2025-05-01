import mongoose from 'mongoose';

// Customer schema
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Customer's name
    email: { type: String, required: true, unique: true }, // Customer's email
    password: { type: String, required: true }, // Customer's password (hash this)
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }], // Array of vehicle subdocuments
    resetPasswordToken: { type: String }, //Token to put on link for password change email
    resetTokenExpiration: { type: Date },
});

//custName in Invoice is refreshed from Customer.name I HAVE TO DO THIS TO VEHICLE ALSO BUT IT IS SO LATE 
customerSchema.post('save', async function () {
    const Invoice = mongoose.model('Invoice'); //intern 
    await Invoice.updateOne(
    {
        customerId: this._id // Match invoices referencing this customer
    },
    {
        custName: this.name
    }
);

});
// Customer model
const Customer = mongoose.model('Customer', customerSchema);

export default Customer;

