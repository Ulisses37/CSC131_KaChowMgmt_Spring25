import { useEffect, useState } from 'react';
import BackButton from '../components/BackButtonComponent';
import '../styles/TicketHistoryStyles.css';
import HeaderBar from '../components/HeaderBarComponent';

function TicketHistoryPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('employeeToken');
        const mechanicId = localStorage.getItem('employeeId');

        const response = await fetch('http://localhost:5000/api/tickets', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Failed to fetch ticket history');

        const data = await response.json();

        const completed = data.filter(
          ticket =>
            ticket.completionStatus === 'Completed' &&
            ticket.mechanicId?.toString() === mechanicId
        );

        setTickets(completed);
      } catch (err) {
        console.error('Error fetching tickets:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <div>Loading ticket history...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="ticket-history-mechanic">
      <BackButton text="DASHBOARD" />
      <div className="base">
        <div className="page-banner">
          <HeaderBar />
          <img className="srs-csc-131-1-icon" alt="Logo" src="SRS_CSC_131 1.png" />
        </div>

        <div className="assigning-ticket-adjust">
          <div className="assigned-tickets">
            <div className="start-date-parent">
              <div className="start-date">Ticket #</div>
              <div className="end-date">
                <div className="customer">Completion</div>
              </div>
              <div className="job-status">Job Status</div>
              <div className="job-code">Time Spent</div>
              <div className="make-model-container">
                <div className="customer">Customer</div>
                <div className="customer">Feedback</div>
              </div>
            </div>

            {tickets.map(ticket => (
              <div className="date-out-parent" key={ticket._id}>
                <div className="date-out">
                  <div className="client-name-vin">#{ticket.ticketId}</div>
                </div>
                <div className="date-out">
                  <div className="client-name-vin">{new Date(ticket.completionDate || ticket.updatedAt).toLocaleDateString()}</div>
                </div>
                <div className="date-out">
                  <div className="client-name-vin">{ticket.completionStatus}</div>
                </div>
                <div className="date-out">
                  <div className="client-name-vin">{ticket.timeSpentMinutes} minutes</div>
                </div>
                <div className="makemodel-out">
                  <div className="client-name-vin">
                    <p className="customer">Needs Met: {ticket.reviewed ? 'Yes' : 'No'}</p>
                    <p className="customer">Customer Satisfaction: {ticket.starRating || 'N/A'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketHistoryPage;