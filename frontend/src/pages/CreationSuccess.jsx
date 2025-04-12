import React from 'react';
import { useNavigate } from 'react-router-dom';
import kachowImage from '../assets/SRS_CSC_131.png';

const CreationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Ticket Created Successfully!</h2>
      <img src={kachowImage} alt="Kachow" className="kachow-image" />
      <p>Your ticket has been created. You will be contacted shortly for further updates.</p>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default CreationSuccess;