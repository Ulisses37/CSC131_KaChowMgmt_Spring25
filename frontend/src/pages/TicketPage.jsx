import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tickets from the backend API
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/tickets'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  const currentTickets = tickets.filter(
    (ticket) => new Date(ticket.date) >= new Date()
  );
  const pastTickets = tickets.filter(
    (ticket) => new Date(ticket.date) < new Date()
  );

  return (
    <div>
      <h1>Your Tickets</h1>

      <section>
        <h2>Current Tickets</h2>
        {currentTickets.length > 0 ? (
          <ul>
            {currentTickets.map((ticket) => (
              <li key={ticket.id}>
                <strong>Customer:</strong> {ticket.customerName} <br />
                <strong>Car Model:</strong> {ticket.carModel} <br />
                <strong>License Plate:</strong> {ticket.licensePlate} <br />
                <strong>Issue:</strong> {ticket.issue} <br />
                <strong>Date:</strong> {ticket.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No current tickets.</p>
        )}
      </section>

      <section>
        <h2>Past Tickets</h2>
        {pastTickets.length > 0 ? (
          <ul>
            {pastTickets.map((ticket) => (
              <li key={ticket.id}>
                <strong>Customer:</strong> {ticket.customerName} <br />
                <strong>Car Model:</strong> {ticket.carModel} <br />
                <strong>License Plate:</strong> {ticket.licensePlate} <br />
                <strong>Issue:</strong> {ticket.issue} <br />
                <strong>Date:</strong> {ticket.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No past tickets.</p>
        )}
      </section>
      <button onClick={() => navigate('/appt-creation')}>Go Back to Create</button>
    </div>
  );
};

export default TicketPage;