import Customer from '../models/Customer.js';
import mongoose from 'mongoose';

// Search for Customers by Name (partial match)
export const searchCustomersByName = async (req, res) => {
  try {
    const { name } = req.params;
    
    // Authentication is already handled by authenticateEmployee middleware
    // No need to check req.employee here
    
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Name query is required'
      });
    }
    
    // Search for customers whose names contain the query string
    // This will find partial matches - e.g., "Sarah" will match "Sarah Johnson"
    const customers = await Customer.find({
      name: { $regex: name, $options: 'i' }  // 'i' for case-insensitive
    }).select('_id name email').limit(10);  // Limit to 10 results
    
    if (customers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No customers found matching that name'
      });
    }
    
    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers.map(customer => ({
        id: customer._id,
        name: customer.name,
        email: customer.email
      }))
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to search for customers',
      error: error.message
    });
  }
};

// Get Customer By ID
export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Authentication is already handled by authenticateEmployee middleware
    // No need to check req.employee here
    
    const customer = await Customer.findById(id).select('-password');
    
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: customer
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve customer',
      error: error.message
    });
  }
};

// Get All Customers (Admin Only)
export const getAllCustomers = async (req, res) => {
  try {
    // Authentication is already handled by authenticateEmployee middleware
    // Admin authorization is handled by authorizeAdmin middleware
    // No need to check req.employee here
    
    const customers = await Customer.find().select('-password').sort({ name: 1 });
    
    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve customers',
      error: error.message
    });
  }
};

// Get Customer Unpaid Tickets
export const getCustomerUnpaidTickets = async (req, res) => {
  try {
    const { customerId } = req.params;
    
    // Authentication is already handled by authenticateEmployee middleware
    // Admin authorization is handled by authorizeAdmin middleware
    // No need to check req.employee here
    
    // Check if customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }
    
    // Find all tickets for the customer that haven't been paid
    // This includes tickets in any status (unassigned, in progress, completed, etc.)
    const Ticket = mongoose.model('Ticket');
    const unpaidTickets = await Ticket.find({
      customerId: customerId,
      isPaid: { $ne: true } // Assuming there's an 'isPaid' field in the Ticket model
    }).select('ticketId vechVIN appDate ticketType timeSpentMinutes completionStatus mechanicComments');
    
    res.status(200).json({
      success: true,
      count: unpaidTickets.length,
      data: unpaidTickets
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve unpaid tickets',
      error: error.message
    });
  }
};

export default {
  searchCustomersByName,
  getCustomerById,
  getAllCustomers,
  getCustomerUnpaidTickets
};