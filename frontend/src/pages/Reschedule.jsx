import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Reschedule = () => {
  const [appointmentId, setAppointmentId] = useState('');
  const [newDate, setNewDate] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const rescheduleDetails = {
      id: appointmentId,
      newDate: newDate,
    };
    console.log('Appointment Rescheduled:', rescheduleDetails);
    setAppointmentId('');
    setNewDate('');
    navigate('/resuccess');
  };

  return (
    <div className="container">
      <h2>Reschedule Appointment</h2>
      <img className="srs-csc-131-2-icon" alt="" src="SRS_CSC_131 1.png"></img>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="appointmentId">Appointment ID:</label>
          <input
            type="text"
            id="appointmentId"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newDate">New Appointment Date:</label>
          <input
            type="date"
            id="newDate"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Reschedule</button>
      </form>
      <br />
      <button onClick={() => navigate('/creation')}>Create</button>
      <br />
      <br />
      <button onClick={() => navigate('/cancel')}>Cancel</button>
      <br />
    </div>
  );
};

export default Reschedule;