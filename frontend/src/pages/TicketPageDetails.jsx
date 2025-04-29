import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/TicketPageDetails.css'; // Import your CSS file for styling
import HeaderBar from '../components/HeaderBarComponent';

const TicketPageDetails = () => {
  const { id } = useParams(); // Get the ticket ID from the URL
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch(`https://api.example.com/tickets/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ticket details');
        }
        const data = await response.json();
        setTicket(data); // Assuming the API returns the ticket object
      } catch (error) {
        console.error('Error fetching ticket details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [id]);

  if (loading) {
    return <div>Loading ticket details...</div>;
  }

  if (!ticket) {
    return <div>No ticket assigned to you.</div>;
  }

  return (
    <div className="ticket-details-container">
      <HeaderBar />
      <h1 className="ticket-details-header">Ticket Details</h1>
      <div className="ticket-details">
        <p><strong>Issue:</strong> {ticket.issue}</p>
        <p><strong>Date:</strong> {ticket.date}</p>
        <p><strong>Customer Name:</strong> {ticket.customerName}</p>
        <p><strong>Car Model:</strong> {ticket.carModel}</p>
        <p><strong>License Plate:</strong> {ticket.licensePlate}</p>
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default TicketPageDetails;