import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/BackButtonStyles.css';

const BackButton = ({ text = "BACK", onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1); // Default behavior - go back
    }
  };

  return (
    <div className="back-button-container" onClick={handleClick}>
      <div className="back-button-icon">
        <svg viewBox="0 0 24 24" fill="white"> 
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
        </div>
      <div className="back-button-text">{text}</div>
    </div>
  );
};

export default BackButton;