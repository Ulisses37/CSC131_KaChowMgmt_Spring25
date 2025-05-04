import Customer from '../models/Customer.js';
import Employee from '../models/Employee.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Customer
const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    // ✅ POPULATE vehicles
    const customer = await Customer.findOne({ email }).populate('vehicles');

    if (!customer) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    console.log("Found customer. Comparing password...");

    const isValidPassword = await bcrypt.compare(password, customer.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = jwt.sign({ userId: customer._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      success: true,
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        vehicles: customer.vehicles || []
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Login failed.',
    });
  }
};

const employeeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Employee login attempt:", email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isValidPassword = await bcrypt.compare(password, employee.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = jwt.sign({ userId: employee._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      success: true,
      token,
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        admin: employee.admin // flag to distinguish admin vs mechanic
      },
      role: employee.admin ? 'admin' : 'mechanic'
    });
  } catch (err) {
    console.error('Employee login error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Login failed.',
    });
  }
};

export default {
  customerLogin,
  employeeLogin
};