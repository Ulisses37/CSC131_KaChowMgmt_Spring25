import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Ticket Created Successfully!</h2>
      <img className="srs-csc-131-2-icon" alt="" src="SRS_CSC_131 1.png"></img>
      <p>Your ticket has been created. You will be contacted shortly for further updates.</p>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default CreationSuccess;