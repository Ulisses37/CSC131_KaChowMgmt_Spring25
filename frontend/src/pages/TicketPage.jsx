import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TicketPage.css';
import HeaderBar from '../components/HeaderBarComponent';
import BackButton from '../components/BackButtonComponent';

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const employeeId = 101; // Replace with the logged-in employee's ID or fetch dynamically
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch('https://api.example.com/tickets');
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const data = await response.json();

        // Filter tickets assigned to the specific employee
        const assignedTickets = data.filter((ticket) => ticket.assignedTo === employeeId);
        setTickets(assignedTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [employeeId]);

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  if (tickets.length === 0) {
    return <div>No tickets assigned to you.</div>;
  }

  return (
    <div>
      <BackButton text="DASHBOARD"/>
      <HeaderBar />
      <br />
      <img
        className="srs-csc-131-1-icon"
        alt="Company Logo"
        src="/SRS_CSC_131 1.png"
        onClick={() => navigate("/")}
      />
      <h1 className="ticket-header">Tickets Assigned to You</h1>
      <ul className="ticket-list">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="ticket-item"
            onClick={() => navigate(`/ticket/${ticket.id}`)} // Navigate to ticket details page
          >
            <strong>Issue:</strong> {ticket.issue} <br />
            <strong>Date:</strong> {ticket.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketPage;