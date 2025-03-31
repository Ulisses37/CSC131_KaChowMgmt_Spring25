import React from 'react';
import { useNavigate } from 'react-router-dom';
import kachowImage from './assets/SRS_CSC_131.png';

const CancelSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Ticket Cancelled.</h2>
      <img src={kachowImage} alt="Kachow" className="kachow-image" />
      <p>Your ticket has been cancelled. Good luck finding someone better than us.</p>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default CancelSuccess;