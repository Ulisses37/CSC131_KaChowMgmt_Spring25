import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Cancel = () => {
  const [appointmentId, setAppointmentId] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment Cancelled:', appointmentId);
    setAppointmentId('');
    navigate('/casuccess');
  };

  return (
    <div className="container">
      <h2>Cancel Appointment</h2>
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
        <br />
        <button type="submit">Cancel Appointment</button>
      </form>
      <br />
      <button onClick={() => navigate('/creation')}>Create</button>
      <br />
      <br />
      <button onClick={() => navigate('/reschedule')}>Reschedule</button>
      <br />
    </div>
  );
};

export default Cancel;