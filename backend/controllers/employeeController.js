import Ticket from '../models/Ticket.js';
import Employee from '../models/Employee.js';
import bcrypt from 'bcrypt';

// Employee Creation
export const createEmployee = async (req, res) => {
    try {
        const { name, email, password, specialties, payRate, admin } = req.body;

        // Check for existing employee
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Employee already exists' });
        }

        // Create new employee
        const employee = new Employee({
            name,
            email,
            password,
            specialties: specialties || [],
            payRate,
            admin: admin || false
        });

        // Password gets hashed automatically via Employee model's pre-save hook
        await employee.save();

        // Return employee data (without password)
        const employeeData = employee.toObject();
        delete employeeData.password;

        res.status(201).json({
            success: true,
            data: employeeData
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server error: ' + err.message
        });
    }
};

// Get all tickets assigned to an employee
export const getEmployeeTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({
            mechanicId: req.params.employeeId // Using your existing schema field
        });
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getEmployee = async (req, res) => {
    try {
        // Fetch all employees where role is 'mechanic'
        const employees = await Employee.find({});

        res.status(200).json({
            success: true,
            data: employees,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching employees",
            error: error.message,
        });
    }
};

// Get single ticket (must belong to employee)
export const getEmployeeTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({
            _id: req.params.ticketId,
            mechanicId: req.params.employeeId
        });

        if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update ticket status/comments
export const updateTicketStatus = async (req, res) => {
    try {
        const updates = {};
        if (req.body.completionStatus) updates.completionStatus = req.body.completionStatus;
        if (req.body.mechanicComments) {
            updates.$push = {
                mechanicComments: req.body.mechanicComments
            };
        }

        const ticket = await Ticket.findOneAndUpdate(
            {
                _id: req.params.ticketId,
                mechanicId: req.params.employeeId
            },
            updates,
            { new: true }
        );

        if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Clock in functionality
export const clockIn = async (req, res) => {
    try {
        const employee = await Employee.findById(req.employee._id);
        
        // Check if employee is already clocked in
        if (employee.hoursWorked.length > 0 && !employee.hoursWorked[employee.hoursWorked.length - 1].clockOut) {
            return res.status(400).json({ 
                success: false,
                error: 'You are already clocked in' 
            });
        }
        
        // Add new clock-in entry
        employee.hoursWorked.push({ clockIn: new Date() });
        await employee.save();
        
        res.status(200).json({ 
            success: true,
            message: 'Clocked in successfully',
            clockInTime: employee.hoursWorked[employee.hoursWorked.length - 1].clockIn
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Server error: ' + error.message 
        });
    }
};

// Clock out functionality
export const clockOut = async (req, res) => {
    try {
        const employee = await Employee.findById(req.employee._id);
        
        // Check if employee is clocked in
        if (employee.hoursWorked.length === 0 || employee.hoursWorked[employee.hoursWorked.length - 1].clockOut) {
            return res.status(400).json({ 
                success: false,
                error: 'You are not currently clocked in' 
            });
        }
        
        // Set clock-out time on the last entry
        const lastEntry = employee.hoursWorked[employee.hoursWorked.length - 1];
        lastEntry.clockOut = new Date();
        await employee.save();
        
        // Calculate duration in hours
        const durationHours = (lastEntry.clockOut - lastEntry.clockIn) / (1000 * 60 * 60);
        
        res.status(200).json({ 
            success: true,
            message: 'Clocked out successfully',
            clockInTime: lastEntry.clockIn,
            clockOutTime: lastEntry.clockOut,
            durationHours: durationHours.toFixed(2)
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Server error: ' + error.message 
        });
    }
};

// Get current clock status
export const getClockStatus = async (req, res) => {
    try {
        const employee = await Employee.findById(req.employee._id);
        const lastEntry = employee.hoursWorked[employee.hoursWorked.length - 1];
        
        const isClockedIn = lastEntry && !lastEntry.clockOut;
        
        let responseData = {
            success: true,
            isClockedIn,
            currentSession: null
        };
        
        if (isClockedIn) {
            const currentDuration = (new Date() - lastEntry.clockIn) / (1000 * 60 * 60);
            responseData.currentSession = {
                clockInTime: lastEntry.clockIn,
                currentDuration: currentDuration.toFixed(2)
            };
        }
        
        res.status(200).json(responseData);
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Server error: ' + error.message 
        });
    }
};

// Get all time entries for employee
export const getTimeEntries = async (req, res) => {
    try {
        const employee = await Employee.findById(req.employee._id);
        const timeEntries = employee.hoursWorked.map(entry => ({
            clockIn: entry.clockIn,
            clockOut: entry.clockOut || null,
            duration: entry.clockOut 
                ? (entry.clockOut - entry.clockIn) / (1000 * 60 * 60)
                : null
        }));
        
        res.status(200).json({
            success: true,
            data: timeEntries
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Server error: ' + error.message 
        });
    }
};