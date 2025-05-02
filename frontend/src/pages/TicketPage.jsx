import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TicketPage.css';
import HeaderBar from '../components/HeaderBarComponent';
import BackButton from '../components/BackButtonComponent';

const API_BASE_URL = 'http://localhost:5000/api';

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [dropdowns, setDropdowns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTickets = async () => {
    const token = localStorage.getItem('employeeToken');
    const employeeId = localStorage.getItem('employeeId');

    if (!employeeId || !token) {
      setError("Missing login credentials.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/tickets`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch assigned tickets');
      }

      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      const token = localStorage.getItem('employeeToken');
      const employeeId = localStorage.getItem('employeeId');

      const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completionStatus: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket status');
      }

      const updated = await response.json();
      setTickets(tickets.map(ticket =>
        ticket._id === ticketId ? { ...ticket, completionStatus: newStatus } : ticket
      ));
    } catch (error) {
      console.error('Failed to update status:', error);
      setError(error.message);
    } finally {
      setDropdowns({});
    }
  };

  const toggleDropdown = (ticketId) => {
    setDropdowns(prev => ({
      ...prev,
      [ticketId]: !prev[ticketId]
    }));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) return <div>Loading tickets...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (tickets.length === 0) return <div>No tickets assigned to you.</div>;

  return (
    <div>
      <div className="header-wrapper">
        <HeaderBar />
        <BackButton text="DASHBOARD" />
      </div>

      <img className="srs-csc-131-1-icon"lt="Company Logo" src="/SRS_CSC_131 1.png"/>
      <h1 className="ticket-header">Tickets Assigned to You</h1>
      <ul className="ticket-list">
        {tickets.map(ticket => (
          <li key={ticket._id} className="ticket-item">
            <div onClick={() => navigate(`/ticket/${ticket._id}`)} style={{ cursor: 'pointer' }}>
              <strong>Ticket #:</strong> {ticket.ticketId}<br />
              <strong>Type:</strong> {ticket.ticketType}<br />
              <strong>Date:</strong> {new Date(ticket.appDate).toLocaleDateString()}<br />
              <strong>Status:</strong> {ticket.completionStatus}
            </div>

            <div className="status-control">
              <button onClick={() => toggleDropdown(ticket._id)}>
                Change Status
              </button>
              {dropdowns[ticket._id] && (
                <div className="status-dropdown-menu">
                  {['Pending', 'Assigned', 'Completed'].map(status => (
                    <div
                      key={status}
                      className="status-dropdown-item"
                      onClick={() => updateTicketStatus(ticket._id, status)}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketPage;
