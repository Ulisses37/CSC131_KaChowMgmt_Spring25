import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ViewAppointment.css';
import HeaderBar from '../components/HeaderBarComponent';

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching appointments from an API or local storage
    const fetchAppointments = async () => {
      try {
        // Mock data for testing
        const mockData = [
          {
            id: 1,
            ticketNumber: 'TCK12345',
            title: 'Engine Repair',
            date: '2025-05-10T10:00:00.000Z',
            makeModel: 'Toyota Corolla',
            vin: '1HGCM82633A123456',
          },
          {
            id: 2,
            ticketNumber: 'TCK12346',
            title: 'Oil Change',
            date: '2025-04-20T14:00:00.000Z',
            makeModel: 'Honda Civic',
            vin: '2HGCM82633A654321',
          },
          {
            id: 3,
            ticketNumber: 'TCK12347',
            title: 'Brake Inspection',
            date: '2025-04-15T09:00:00.000Z',
            makeModel: 'Ford Focus',
            vin: '3HGCM82633A789012',
          },
          {
            id: 4,
            ticketNumber: 'TCK12348',
            title: 'Tire Replacement',
            date: '2025-05-15T11:00:00.000Z',
            makeModel: 'Chevrolet Malibu',
            vin: '4HGCM82633A345678',
          },
        ];

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Use mock data instead of API response
        setAppointments(mockData);
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

  const currentAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) >= new Date()
  );

  return (
    <div>
      <br />
      <HeaderBar />
      <img
        className="srs-csc-131-2-icon"
        alt=""
        src="SRS_CSC_131 1.png"
        onClick={() => navigate('/')}
      ></img>
      <h1>Your Appointments</h1>
      <section>
        <h2>Current Appointments</h2>
        {currentAppointments.length > 0 ? (
          <ul>
            {currentAppointments.map((appointment) => {
              const appointmentDate = new Date(appointment.date);
              const formattedDate = appointmentDate.toLocaleDateString(); // Extract date
              const formattedTime = appointmentDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }); // Extract time

              return (
                <li key={appointment.id}>
                  {/* Left Section */}
                  <div className="left-section">
                    <span>
                      <strong>Ticket #:</strong> {appointment.ticketNumber}
                    </span>
                    <span>
                      <strong>Make/Model:</strong> {appointment.makeModel}
                    </span>
                    <span>
                      <strong>VIN #:</strong> {appointment.vin}
                    </span>
                    <button
                      className="cancel"
                      onClick={() => navigate(`/appt-cancel/${appointment.id}`)} // Navigate to cancel page
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Center Section */}
                  <div className="center-section">
                    <span>
                      <strong>Repair Type:</strong> {appointment.title}
                    </span>
                  </div>

                  {/* Right Section */}
                  <div className="right-section">
                    <span className="date-label">Date/Time</span>
                    <span className="date-value">{formattedDate}</span>
                    <span className="time-value">{formattedTime}</span>
                    <button
                      className="reschedule"
                      onClick={() => navigate(`/appt-reschedule/${appointment.id}`)} // Navigate to reschedule page
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