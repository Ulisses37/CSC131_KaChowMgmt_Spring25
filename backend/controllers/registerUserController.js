import Customer from '../models/Customer.js';
import bcrypt from 'bcrypt'; //For hashing

//KMS-43 B Customer account creation
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) { //Check if a field is empty
      return res.status(400).json({ message: 'All fields must be filled out' });
    }
  
    const userExists = await Customer.findOne({ email }); //End function if user already exists
    if (userExists) { 
      return res.status(400).json({ message: 'User already exists' });
    }
  
    try { //Save newly created account into database
      const saltRounds = 10; //Hash the password before saving
      const hashedPassword = await bcrypt.hash(password,saltRounds);
  
      const newCustomer = new Customer({ name, email, password: hashedPassword }); //Save account info
      await newCustomer.save();
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  };

  export default registerUser;