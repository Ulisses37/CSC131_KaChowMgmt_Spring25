import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch tickets from the API
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://your-api-endpoint.com/tickets'); // Replace with your API endpoint
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

  const handleAcceptTicket = async (ticketId) => {
    try {
      // Replace with your API endpoint for accepting a ticket
      const response = await fetch(`https://your-api-endpoint.com/tickets/${ticketId}/accept`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the ticket list to reflect the accepted ticket
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.id !== ticketId)
      );

      alert('Ticket accepted successfully!');
    } catch (error) {
      console.error('Error accepting ticket:', error);
      alert('Failed to accept the ticket.');
    }
  };

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  return (
    <div>
      <h1>Mechanic Tickets</h1>
      <section>
        {tickets.length > 0 ? (
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.id} className="ticket-item">
                <h3>Customer: {ticket.customerName}</h3>
                <p>Car Model: {ticket.carModel}</p>
                <p>License Plate: {ticket.licensePlate}</p>
                <p>Issue: {ticket.issue}</p>
                <p>Appointment Date: {ticket.date}</p>
                <div>
                  <p>Progress: {ticket.progress}%</p>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${ticket.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button
                  onClick={() => handleAcceptTicket(ticket.id)}
                  className="accept-button"
                >
                  Accept Ticket
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tickets assigned.</p>
        )}
      </section>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default TicketPage;