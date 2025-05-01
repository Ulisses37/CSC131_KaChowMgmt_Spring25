import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';
import Employee from '../models/Employee.js';

// Customer authentication
export const authenticateCustomer = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const customer = await Customer.findById(decoded.userId);
        if (!customer) return res.status(401).json({ message: 'User no longer exists' });

        req.user = customer;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Authentication failed' });
    }
};

// Employee authentication
export const authenticateEmployee = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employee = await Employee.findById(decoded.userId);
        //const employee = await Employee.findById(decoded._id);
        if (!employee) return res.status(401).json({ message: 'Employee not found' });

        req.employee = employee;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Authentication failed' });
    }
};