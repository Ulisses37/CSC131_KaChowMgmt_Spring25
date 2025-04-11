import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';

export const authenticate = async (req, res, next) => {
    try {
        // 1. Get token from header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is in .env

        // 3. Check if user still exists
        const user = await Customer.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User no longer exists' });
        }

        // 4. Attach user to request
        req.user = user; // Attach full user document
        next();
    } catch (error) {
        // Handle specific JWT errors
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