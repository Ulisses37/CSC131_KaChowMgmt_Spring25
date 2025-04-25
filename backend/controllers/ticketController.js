import Ticket from '../models/Ticket.js';
import Vehicle from '../models/Vehicle.js';
import Customer from '../models/Customer.js';
import Employee from '../models/Employee.js';
import getNextTicketId from '../utils/getNextTicketId.js';
//import { getNextTicketId } from '../utils/getNextTicketId.js';
import { validationResult } from 'express-validator';
import { sendEmail } from '../config/emailConfig.js';

// Email template helper
const createTicketUpdateEmail = (ticket, action, additionalInfo = '') => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Your Ticket #${ticket.ticketId} Has Been ${action}</h2>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
        <p><strong>Vehicle VIN:</strong> ${ticket.vechVIN}</p>
        <p><strong>Appointment Date:</strong> ${new Date(ticket.appDate).toLocaleString()}</p>
        <p><strong>Status:</strong> ${ticket.completionStatus}</p>
        ${ticket.mechanicComments?.length ? 
          `<p><strong>Mechanic Notes:</strong><br>${ticket.mechanicComments.join('<br>')}</p>` : ''}
        ${additionalInfo}
      </div>
      <p style="margin-top: 20px;">Thank you for choosing our service!</p>
      <p style="font-size: 12px; color: #777;">
        This is an automated notification. Please do not reply to this email.
      </p>
    </div>
  `;
};

// Create New Ticket
export const createTicket = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { appDate, vechVIN, customerId, ticketType, customerComments } = req.body;

  try {
    const vehicle = await Vehicle.findOne({ vin: vechVIN });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const ticketId = await getNextTicketId();
    const newTicket = new Ticket({
      ticketId,
      appDate,
      vechVIN,
      vehicle: vehicle._id,
      customerId,
      ticketType,
      customerComments,
      completionStatus: 'Unassigned'
    });

    const savedTicket = await newTicket.save();
    await Vehicle.findByIdAndUpdate(
      vehicle._id,
      { $push: { currentTickets: savedTicket._id } }
    );

    // Send creation notification
    if (customer.email) {
      await sendEmail(
        customer.email,
        `New Service Ticket Created (#${ticketId})`,
        createTicketUpdateEmail(savedTicket, 'created', 
          `<p>We've received your service request and will contact you shortly.</p>`)
      );
    }

    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create ticket',
      error: error.message
    });
  }
};

// Reschedule Ticket
export const rescheduleTicket = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { appDate: new Date(req.body.newAppDate) },
      { new: true }
    ).populate('customerId');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Send reschedule notification
    if (ticket.customerId?.email) {
      await sendEmail(
        ticket.customerId.email,
        `Service Ticket Rescheduled (#${ticket.ticketId})`,
        createTicketUpdateEmail(ticket, 'rescheduled',
          `<p>Your appointment has been rescheduled to ${new Date(ticket.appDate).toLocaleString()}.</p>`)
      );
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to reschedule ticket',
      error: error.message
    });
  }
};

// Cancel Ticket
export const cancelTicket = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.id })
      .populate('customerId');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.completionStatus = 'Canceled';
    await ticket.save();

    const vehicle = await Vehicle.findOne({ vin: ticket.vechVIN });
    if (vehicle) {
      await Vehicle.findByIdAndUpdate(
        vehicle._id,
        {
          $pull: { currentTickets: ticket._id },
          $push: { pastTickets: ticket._id }
        }
      );
    }

    // Send cancellation notification
    if (ticket.customerId?.email) {
      await sendEmail(
        ticket.customerId.email,
        `Service Ticket Canceled (#${ticket.ticketId})`,
        createTicketUpdateEmail(ticket, 'canceled',
          `<p>Your service appointment has been canceled as requested.</p>`)
      );
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to cancel ticket',
      error: error.message
    });
  }
};

// Complete Ticket
export const completeTicket = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { timeSpentMinutes, mechanicComments, employeeId } = req.body;
    const ticketId = req.params.id;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (!employee.admin) {
      if (!ticket.mechanicId || ticket.mechanicId.toString() !== employeeId) {
        return res.status(403).json({
          message: 'You can only complete tickets assigned to you'
        });
      }
    }

    ticket.completionStatus = 'Completed';
    ticket.timeSpentMinutes = timeSpentMinutes;

    if (mechanicComments) {
      ticket.mechanicComments.push(mechanicComments);
    }

    if (!ticket.mechanicId && employee.admin) {
      ticket.mechanicId = employeeId;
    }

    const completedTicket = await ticket.save();
    await completedTicket.populate('customerId');

    const vehicle = await Vehicle.findOne({ vin: ticket.vechVIN });
    if (vehicle) {
      await Vehicle.findByIdAndUpdate(
        vehicle._id,
        {
          $pull: { currentTickets: ticket._id },
          $push: { pastTickets: ticket._id }
        }
      );
    }

    // Send completion notification
    if (completedTicket.customerId?.email) {
      await sendEmail(
        completedTicket.customerId.email,
        `Service Completed (#${completedTicket.ticketId})`,
        createTicketUpdateEmail(completedTicket, 'completed',
          `<p>Time spent: ${timeSpentMinutes} minutes</p>
           <p>Your vehicle is ready for pickup!</p>`)
      );
    }

    res.status(200).json(completedTicket);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to complete ticket',
      error: error.message
    });
  }
};

// Get Vehicle Maintenance Status
export const getVehicleMaintenanceStatus = async (req, res) => {
  try {
    const { customerId, vin } = req.params;

    const vehicle = await Vehicle.findOne({
      vin,
      owner: customerId
    }).populate('currentTickets pastTickets');

    if (!vehicle) {
      return res.status(404).json({
        message: 'Vehicle not found or not owned by customer'
      });
    }

    const response = {
      vehicle: {
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        vin: vehicle.vin
      },
      currentStatus: vehicle.currentTickets.map(ticket => ({
        ticketId: ticket.ticketId,
        type: ticket.ticketType,
        status: ticket.completionStatus,
        lastUpdated: ticket.updatedAt
      })),
      maintenanceHistory: vehicle.pastTickets.map(ticket => ({
        ticketId: ticket.ticketId,
        type: ticket.ticketType,
        completedDate: ticket.updatedAt,
        workPerformed: ticket.mechanicComments
      }))
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve maintenance status',
      error: error.message
    });
  }
};