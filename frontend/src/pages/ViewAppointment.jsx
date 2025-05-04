import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ViewAppointment.css';
import HeaderBar from '../components/HeaderBarComponent';

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const customerId = localStorage.getItem('customerId');
        if (!customerId) throw new Error('Customer not logged in');

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/tickets/customer/${customerId}/tickets`
        );
        if (!response.ok) throw new Error('Failed to fetch appointments');

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  const currentAppointments = appointments;

  return (
    <div>
      <HeaderBar />
      <br />
      <img
        className="srs-csc-131-2-icon"
        alt="Company Logo"
        src="SRS_CSC_131 1.png"
        onClick={() => navigate("/")}
      />
      <h1>Your Appointments</h1>
      <section>
        <h2>Current Appointments</h2>
        {currentAppointments.length > 0 ? (
          <ul>
            {currentAppointments.map((appointment) => {
              const appointmentDate = new Date(appointment.appDate);
              const formattedDate = appointmentDate.toLocaleDateString();
              const formattedTime = appointmentDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <li key={appointment._id}>
                  {/* Left Section */}
                  <div className="left-section">
                    <span><strong>Ticket #:</strong> {appointment.ticketId}</span>
                    <span><strong>Make/Model:</strong> {appointment.makeModel || 'N/A'}</span>
                    <span><strong>VIN #:</strong> {appointment.vechVIN}</span>
                    <button
                      className="cancel-button"
                      onClick={() => navigate(`/appt-cancel/${appointment._id}`)}
                    >
                      Cancel Appointment
                    </button>
                  </div>

                  {/* Center Section */}
                  <div className="center-section">
                    <span className="repair-type"><strong>Repair Type:</strong> {appointment.ticketType}</span>
                    <span className="repair-type"><strong>Status:</strong> {appointment.completionStatus}</span>
                    <button
                className="status-button"
                onClick={() => navigate(`/viewappointmentdetail/${appointment._id}`)}
              >
                View Status
              </button>
                  </div>

                  {/* Right Section */}
                  <div className="right-section">
                    <span className="date-label">Date/Time</span>
                    <span className="date-value">{formattedDate}</span>
                    <span className="time-value">{formattedTime}</span>
                    <button
                      className="reschedule-button"
                      onClick={() => navigate(`/appt-reschedule/${appointment._id}`)}
                    >
                      Reschedule
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No current appointments.</p>
        )}
      </section>
    </div>
  );
};

export default ViewAppointment;