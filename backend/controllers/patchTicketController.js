import Employee from '../models/Employee.js';
import Ticket from '../models/Ticket.js';

//Send List of Mechanics
const getAllMechanics = async (req, res) => {
    try {
      const mechanics = await Employee.find({});
  
      res.status(200).json({
        status: 'success',
        mechanics
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: 'Mechanics List Failed to Load'
      });
    }
  };


  export const assignMechanictoTicket = async (req, res) => {
    try {
      const { id } = req.params;
      const { mechanicId } = req.body;
  
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        return res.status(404).json({
          status: 'fail',
          message: 'Ticket not found.',
        });
      }
  
      const mechanic = await Employee.findById(mechanicId);
      if (!mechanic || mechanic.role !== 'mechanic') {
        return res.status(400).json({
          status: 'fail',
          message: 'Invalid mechanic ID.',
        });
      }
  
      ticket.mechanicId = mechanicId;
      ticket.completionStatus = 'Assigned';
      await ticket.save();
  
      res.status(200).json({
        status: 'success',
        message: 'Mechanic assigned successfully.',
        ticket
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  };
  
export default {
    getAllMechanics,
    assignMechanictoTicket
  };