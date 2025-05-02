import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentRescheduleSuccess = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Ticket Rescheduled Successfully!</h2>
      <img src={kachowImage} alt="Kachow" className="kachow-image" />
      <p>Your ticket has been rescheduled. You will be contacted shortly for further updates.</p>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default AppointmentRescheduleSuccess;