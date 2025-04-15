import Customer from '../models/Customer.js';
import bcrypt from 'bcrypt'; //For hashing
import crypto from 'crypto';  //For url tokens
import nodemailer from 'nodemailer';  //For sending emails

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
      //const resetUrl = `http://localhost:5000/api/auth/password/reset-password/${resetToken}`;
      const resetUrl = `http://localhost:${process.env.HOST_PORT}/api/auth/password/reset-password/${resetToken}`;
  
  
      var transporter = nodemailer.createTransport({ //Our company email login information
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER, //email here
          pass: process.env.EMAIL_PASSWORD, //password here
  
        }
      });
      
  
      var mailOptions = { //Contents of sent email
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




  //KMS-73 B Change Password
  const changePassword = async (req, res) => { //Use this function if customer wants to change password from their profile page
    const email = req.user.email; 
    const { oldPassword, oldPasswordRetyped, newPassword } = req.body; //Obtained from input fields

    try {
        if (oldPassword !== oldPasswordRetyped) {
            return res.status(400).json({ message: 'Typed passwords do not match' });
        }

        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare hashed password (if stored hashed)
        const isMatch = await bcrypt.compare(oldPassword, customer.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        // Hash and save the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        customer.password = hashedPassword;
        customer.resetPasswordToken = null;
        customer.resetTokenExpiration = null;
        await customer.save();

        res.status(200).json({ message: 'Password change successful' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Error changing password', error: error.message });
    }
};

  export { forgotPassword, resetPassword, changePassword }