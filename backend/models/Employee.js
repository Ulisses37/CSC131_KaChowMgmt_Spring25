const mongoose = require('mongoose');

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

// Employee model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;