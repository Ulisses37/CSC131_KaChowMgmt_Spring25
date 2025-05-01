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

//Admin: Get all employees with their time entries
export const getAllEmployeesTimeEntries = async (req, res) => {
    try {
        // Make sure requester is admin (extra security)
        if (!req.employee.admin) {
            return res.status(403).json({
                success: false,
                error: 'Admin privileges required'
            });
        }

        const employees = await Employee.find({}, 'name email hoursWorked payRate');

        // Format the response data
        const employeesData = employees.map(employee => {
            const timeEntries = employee.hoursWorked.map(entry => ({
                id: entry._id,
                clockIn: entry.clockIn,
                clockOut: entry.clockOut || null,
                duration: entry.clockOut
                    ? ((entry.clockOut - entry.clockIn) / (1000 * 60 * 60)).toFixed(2)
                    : null,
                isPaid: entry.isPaid || false,
                paymentDate: entry.paymentDate || null,
                // Calculate pay amount for this entry
                payAmount: entry.clockOut
                    ? ((entry.clockOut - entry.clockIn) / (1000 * 60 * 60) * employee.payRate).toFixed(2)
                    : null
            }));

            return {
                id: employee._id,
                name: employee.name,
                email: employee.email,
                payRate: employee.payRate,
                timeEntries
            };
        });

        res.status(200).json({
            success: true,
            data: employeesData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error: ' + error.message
        });
    }
};

// Admin: Update time entry for an employee
export const updateTimeEntry = async (req, res) => {
    try {
        // Make sure requester is admin
        if (!req.employee.admin) {
            return res.status(403).json({
                success: false,
                error: 'Admin privileges required'
            });
        }

        const { employeeId, entryId } = req.params;
        const { clockIn, clockOut, isPaid } = req.body;

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee not found'
            });
        }

        // Find the specific time entry
        const timeEntry = employee.hoursWorked.id(entryId);
        if (!timeEntry) {
            return res.status(404).json({
                success: false,
                error: 'Time entry not found'
            });
        }

        // Update fields if provided
        if (clockIn) timeEntry.clockIn = new Date(clockIn);
        if (clockOut) timeEntry.clockOut = new Date(clockOut);

        // Handle payment status
        if (isPaid !== undefined) {
            timeEntry.isPaid = isPaid;
            if (isPaid) {
                timeEntry.paymentDate = new Date();
            } else {
                timeEntry.paymentDate = null;
            }
        }

        await employee.save();

        res.status(200).json({
            success: true,
            message: 'Time entry updated successfully',
            data: {
                id: timeEntry._id,
                clockIn: timeEntry.clockIn,
                clockOut: timeEntry.clockOut,
                duration: timeEntry.clockOut
                    ? ((timeEntry.clockOut - timeEntry.clockIn) / (1000 * 60 * 60)).toFixed(2)
                    : null,
                isPaid: timeEntry.isPaid,
                paymentDate: timeEntry.paymentDate,
                payAmount: timeEntry.clockOut
                    ? ((timeEntry.clockOut - timeEntry.clockIn) / (1000 * 60 * 60) * employee.payRate).toFixed(2)
                    : null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error: ' + error.message
        });
    }
};

// Admin: Mark multiple time entries as paid
export const markEntriesAsPaid = async (req, res) => {
    try {
        // Make sure requester is admin
        if (!req.employee.admin) {
            return res.status(403).json({
                success: false,
                error: 'Admin privileges required'
            });
        }

        const { employeeId } = req.params;
        const { entryIds } = req.body;

        if (!entryIds || !Array.isArray(entryIds) || entryIds.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Entry IDs must be provided as an array'
            });
        }

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee not found'
            });
        }

        const paymentDate = new Date();
        let totalPaid = 0;
        let updatedEntries = [];

        // Update each time entry
        entryIds.forEach(entryId => {
            const entry = employee.hoursWorked.id(entryId);
            if (entry && entry.clockOut && !entry.isPaid) {
                entry.isPaid = true;
                entry.paymentDate = paymentDate;

                const hours = (entry.clockOut - entry.clockIn) / (1000 * 60 * 60);
                const payAmount = hours * employee.payRate;
                totalPaid += payAmount;

                updatedEntries.push({
                    id: entry._id,
                    hours: hours.toFixed(2),
                    payAmount: payAmount.toFixed(2)
                });
            }
        });

        await employee.save();

        res.status(200).json({
            success: true,
            message: `${updatedEntries.length} time entries marked as paid`,
            data: {
                employeeId: employee._id,
                employeeName: employee.name,
                payRate: employee.payRate,
                totalPaid: totalPaid.toFixed(2),
                updatedEntries
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error: ' + error.message
        });
    }
};

// Get payroll summary for all employees
export const getPayrollSummary = async (req, res) => {
    try {
        // Make sure requester is admin
        if (!req.employee.admin) {
            return res.status(403).json({
                success: false,
                error: 'Admin privileges required'
            });
        }

        const employees = await Employee.find({}, 'name email hoursWorked payRate');

        const payrollData = employees.map(employee => {
            let unpaidHours = 0;
            let unpaidAmount = 0;
            let paidHours = 0;
            let paidAmount = 0;

            employee.hoursWorked.forEach(entry => {
                if (entry.clockOut) {
                    const hours = (entry.clockOut - entry.clockIn) / (1000 * 60 * 60);
                    const amount = hours * employee.payRate;

                    if (entry.isPaid) {
                        paidHours += hours;
                        paidAmount += amount;
                    } else {
                        unpaidHours += hours;
                        unpaidAmount += amount;
                    }
                }
            });

            return {
                id: employee._id,
                name: employee.name,
                email: employee.email,
                payRate: employee.payRate,
                unpaidHours: unpaidHours.toFixed(2),
                unpaidAmount: unpaidAmount.toFixed(2),
                paidHours: paidHours.toFixed(2),
                paidAmount: paidAmount.toFixed(2)
            };
        });

        res.status(200).json({
            success: true,
            data: payrollData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error: ' + error.message
        });
    }
};

//Mechanic Update - no route,"" needs employeePersonal schema 

export const updateEmployee = async (req, res) => {
    try {
        const employeeToUpdate = await Employee.findOne({
            _id: req.params.employeeId, // Use _id to match MongoDB's ObjectId
         });
    
        if (!employeeToUpdate) {
           return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        const updates = req.body;

        const employee = await Employee.findByIdAndUpdate(id, updates, { new: true });

        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        const updatedData = employee.toObject();
        delete updatedData.password;

        res.json({
            success: true,
            message: 'Employee updated successfully',
            data: updatedData
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server error: ' + err.message
        });
    }
};


