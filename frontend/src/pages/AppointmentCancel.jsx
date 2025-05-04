import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../styles/AppointmentCancel.css';
import HeaderBar from '../components/HeaderBarComponent';

const AppointmentCancel = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's appointments from the backend
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tickets/${id}/cancel', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the user's token
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setErrorMessage('Failed to fetch appointments. Please try again.');
      }
    };

    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/tickets/${id}/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the user's token
        },
        body: JSON.stringify({ appointmentId: selectedAppointmentId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Appointment canceled successfully:', data);
      setSuccessMessage('Appointment canceled successfully!');
      setErrorMessage('');
      setSelectedAppointmentId('');
      navigate('/casuccess'); // Navigate to success page
    } catch (error) {
      console.error('Error canceling appointment:', error);
      setErrorMessage('Failed to cancel appointment. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
       <HeaderBar />
            <br />
            <br />
            <img className="srs-csc-131-2-icon" 
            alt="" 
            src="SRS_CSC_131 1.png"
            onClick={() => navigate("/")}></img>
      <h2>Cancel Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="appointmentId">Select Appointment:</label>
        <select
          id="appointmentId"
          value={selectedAppointmentId}
          onChange={(e) => setSelectedAppointmentId(e.target.value)}
          required
        >
          <option value="">-- Select an Appointment --</option>
          {appointments.map((appointment) => (
            <option key={appointment.id} value={appointment.id}>
              {appointment.date} - {appointment.repairType}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Cancel Appointment</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <br />
    </div>
  );
};

export default AppointmentCancel;