import React from 'react';
import { useNavigate } from 'react-router-dom';
import kachowImage from '../assets/SRS_CSC_131.png';

const RescheduleSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Ticket Rescheduled Successfully!</h2>
      <img src={kachowImage} alt="Kachow" className="kachow-image" />
      <p>Your ticket has been rescheduled. You will be contacted shortly for further updates.</p>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default RescheduleSuccess;