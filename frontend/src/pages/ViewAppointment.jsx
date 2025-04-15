import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching appointments from an API or local storage
    const fetchAppointments = async () => {
      try {
        // Replace with your API call or local storage retrieval
        const response = await fetch('/api/appointments'); // Replace with your API endpoint
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

  const currentAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) >= new Date()
  );
  const pastAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) < new Date()
  );

  return (
    <div>
      <img className="srs-csc-131-2-icon" alt="" src="SRS_CSC_131 1.png"></img>
      <h1>Your Appointments</h1>

      <section>
        <h2>Current Appointments</h2>
        {currentAppointments.length > 0 ? (
          <ul>
            {currentAppointments.map((appointment) => (
              <li key={appointment.id}>
                <strong>Repair Type:</strong> {appointment.title} <br />
                <strong>Date:</strong> {appointment.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No current appointments.</p>
        )}
      </section>

      <section>
        <h2>Past Appointments</h2>
        {pastAppointments.length > 0 ? (
          <ul>
            {pastAppointments.map((appointment) => (
              <li key={appointment.id}>
                <strong>Repair Type:</strong> {appointment.title} <br />
                <strong>Date:</strong> {appointment.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No past appointments.</p>
        )}
      </section>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default ViewAppointment;