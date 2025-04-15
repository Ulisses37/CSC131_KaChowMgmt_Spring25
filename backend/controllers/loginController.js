import Customer from '../models/Customer.js';
import Employee from '../models/Employee.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Customer
const customerLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({
          status: 'fail',
          message: 'Email and password are required.',
        });
      }
  
      // Check if email exists
      const customer = await Customer.findOne({ email });
      if (!customer) {
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid email or password.',
        });
      }
  
      // Check if password matches password in database
      const isValidPassword = await bcrypt.compare(password, customer.password);
      if (!isValidPassword) {
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid email or password.',
        });
      }
  
      // Create a JWT
      const token = jwt.sign({ userId: customer._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
  
      res.status(200).json({
        status: 'success',
        token,
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  };

  
// Employee
const employeeLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({
          status: 'fail',
          message: 'Email and password are required.',
        });
      }
  
      // Check if email exists
      const employee = await Employee.findOne({ email });
      if (!employee) {
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid email or password.',
        });
      }
  
      // Check if password matches password in database
      const isValidPassword = await bcrypt.compare(password, employee.password);
      if (!isValidPassword) {
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid email or password.',
        });
      }
  
      // Create a JWT
      const token = jwt.sign({ userId: employee._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
  
      res.status(200).json({
        status: 'success',
        token,
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  };

export default {
  customerLogin,
  employeeLogin
};