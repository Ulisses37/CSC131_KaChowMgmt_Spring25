import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const AppointmentCancel = () => {
  const [appointmentId, setAppointmentId] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment Cancelled:', appointmentId);
    setAppointmentId('');
    navigate('/casuccess');
  };

  return (
    <div>
      <h2>Cancel Appointment</h2>
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
        <button type="submit">Cancel Appointment</button>
      </form>
      <br />
      <button onClick={() => navigate('/creation')}>Create</button>
      <br />
      <button onClick={() => navigate('/reschedule')}>Reschedule</button>
    </div>
  );
};

export default AppointmentCancel;