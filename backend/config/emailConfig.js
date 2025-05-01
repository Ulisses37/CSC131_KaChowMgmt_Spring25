import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test connection on startup
transporter.verify((error) => {
  if (error) {
    console.error('SMTP Connection Failed:', error);
  } else {
    console.log('Server ready to send emails');
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"AutoShop Notifications" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Email send error:', error);
  }
};
