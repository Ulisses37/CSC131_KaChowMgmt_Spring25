import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentCancelSuccess = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Ticket Cancelled.</h2>
      <img src={kachowImage} alt="Kachow" className="kachow-image" />
      <p>Your ticket has been cancelled. Good luck finding someone better than us.</p>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default AppointmentCancelSuccess;