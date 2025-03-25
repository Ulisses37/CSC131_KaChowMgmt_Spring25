import Customer from '../models/Customer.js';
import bcrypt from 'bcrypt';  //For hashing
import crypto from 'crypto';  //For url tokens
import nodemailer from 'nodemailer';  //For sending emails




//KMS-43 B Customer account creation
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) { //Check if a field is empty
      return res.status(400).json({ message: 'All fields must be filled out' });
    }
  
    const existingUser = await Customer.findOne({ email }); //End function if user already exists
    if (existingUser) { 
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





//KMS-44 B Forgot Password
//Send an email to reset password
const forgotPassword = async (req, res) =>{
  const { email } = req.body;

  try {
    const customer = await Customer.findOne({ email }); //Check if customer exists by looking for email in database
    if (!customer) { 
      return res.status(404).json({ message: 'Email not found' });
    }


    const resetToken = crypto.randomBytes(20).toString('hex'); //Create a password reset token to be converted as a link
    customer.resetPasswordToken = resetToken;
    const oneHour = 3600000;
    customer.resetTokenExpiration = Date.now() + oneHour;
    await customer.save();
    const resetUrl = `http://kachowmanagement.com/reset-password/${resetToken}`;


    var transporter = nodemailer.createTransport({ //Our company email
      service: 'gmail',
      auth: {
        user: 'kachowtest@gmail.com',
        pass: 'abhy iscd gdgf opon',

      }
    });
    

    var mailOptions = { //Contents of email
      from: 'kachowmanagement',
      to: email,
      subject: 'Password Reset',
      text: 'You have requested to change your password. Please click on the link below to change your password.\n\n' + resetUrl,
    };
    

    transporter.sendMail(mailOptions, function(error, info){ //Confirm Email Success/Error
      if (error) {
        console.log(error);
      } else {
        console.log('Email succesfully sent to ' + email + info.response);
        res.status(201).json({ message: 'Password Reset Email sent' });
      }
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Error changing password', error: error.message });
  }
}




//KMS-44 B Forgot Password
//After clicking the reset password link, allow the customer to enter a new password
const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try{
    const customer = await Customer.findOne({ //Search for the customer based on the token information stored in the db
      resetPasswordToken: token,
      resetTokenExpiration: { $gt: Date.now() } 
    });

    if (!customer){ //Return error if token expired or cannot be found
      const expiredCustomer = await Customer.findOne({ resetPasswordToken: token });
      if (!expiredCustomer) {
        return res.status(400).json({ message: 'User not found' });
      } else {
        return res.status(400).json({ message: "Token expired at: " + expiredCustomer.resetTokenExpiration, });
      }
    }


    const saltRounds = 10; //Hash the new password then save it to the db. Clear token information after
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    customer.password = hashedPassword;
    customer.resetPasswordToken = null;
    customer.resetTokenExpiration = null;
    await customer.save();


    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Error changing password', error: error.message });
  }
} 



export {registerUser, forgotPassword, resetPassword};