import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Ticket Cancelled.</h2>
      <img className="srs-csc-131-2-icon" alt="" src="SRS_CSC_131 1.png"></img>
      <p>Your ticket has been cancelled. Good luck finding someone better than us.</p>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default CancelSuccess;