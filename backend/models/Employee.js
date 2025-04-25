import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Reviews subdocument schema
const reviewSchema = new mongoose.Schema({
    customerName: { type: String, required: true }, // Name of the customer who left the review
    ticketNumber: { type: String, required: true }, // Ticket number associated with the review
    starRating: { type: Number, required: true, min: 1, max: 5 }, // Star rating (1-5)
    comments: { type: String } // Comments from the customer
});

// the HoursWorked subdocument schema
const hoursWorkedSchema = new mongoose.Schema({
    clockIn: { type: Date, required: true }, // Clock-in time
    clockOut: { type: Date } // Clock-out time (optional, as it may not be set initially)
});

// BankInfo subdocument schema
const bankInfoSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true }, // Bank account number
    routingNumber: { type: String, required: true } // Bank routing number
});

// Ticket subdocument schema
const employeeTicketSchema = new mongoose.Schema({
    current: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }], // Array of current ticket IDs
    completed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }] // Array of completed ticket IDs
});

// Employee schema
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Employee's name
    email: { type: String, required: true, unique: true }, // Employee's email
    password: { type: String, required: true }, // Employee's password (hash this in production)
    specialties: [{ type: String }], // Array of specialties (e.g., ["Engine Repair", "Brake Systems"])
    admin: { type: Boolean, default: false }, // Admin status (true = admin, false = regular employee)
    bankInfo: bankInfoSchema, // Bank information subdocument
    tickets: employeeTicketSchema, // Ticket subdocument with current and completed arrays
    hoursWorked: [hoursWorkedSchema], // Array of hours worked subdocuments
    payRate: { type: Number, required: true }, // Pay rate per hour (float)
    reviews: [reviewSchema] // Array of reviews subdocuments
});

// Password hashing (pre-save hook)
employeeSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10); // 10 rounds
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Generate JWT token
employeeSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            isAdmin: this.admin
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// Password verification
employeeSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Static login method
employeeSchema.statics.findByCredentials = async function(email, password) {
    const employee = await this.findOne({ email });
    if (!employee) throw new Error('Invalid email or password');

    const isMatch = await employee.comparePassword(password);
    if (!isMatch) throw new Error('Invalid email or password');

    return employee;
};

// Get total hours worked (for all entries)
employeeSchema.methods.getTotalHoursWorked = function() {
    return this.hoursWorked.reduce((total, entry) => {
        if (entry.clockOut) {
            const hours = (entry.clockOut - entry.clockIn) / (1000 * 60 * 60);
            return total + hours;
        }
        return total;
    }, 0);
};

// Get current session hours (if clocked in)
employeeSchema.methods.getCurrentSessionHours = function() {
    const lastEntry = this.hoursWorked[this.hoursWorked.length - 1];
    if (lastEntry && !lastEntry.clockOut) {
        return (new Date() - lastEntry.clockIn) / (1000 * 60 * 60);
    }
    return 0;
};

// Get all time entries (formatted)
employeeSchema.methods.getTimeEntries = function() {
    return this.hoursWorked.map(entry => ({
        clockIn: entry.clockIn,
        clockOut: entry.clockOut || null,
        duration: entry.clockOut 
            ? (entry.clockOut - entry.clockIn) / (1000 * 60 * 60)
            : null
    }));
};

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;