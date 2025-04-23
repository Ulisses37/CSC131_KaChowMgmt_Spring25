import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const AppointmentReschedule = () => {
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
    <div>
      <h2>Reschedule Appointment</h2>
      <img src={kachowImage} alt="Kachow" className="kachow-image" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="appointmentId">Appointment ID:</label>
        <input
          type="text"
          id="appointmentId"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
          required
        />
        <br />
        <label htmlFor="newDate">New Appointment Date:</label>
        <input
          type="date"
          id="newDate"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          required
        />
        <br />
        <button type="submit">Reschedule</button>
      </form>
      <br />
      <button onClick={() => navigate('/creation')}>Create</button>
      <br />
      <button onClick={() => navigate('/cancel')}>Cancel</button>
    </div>
  );
};

export default AppointmentReschedule;