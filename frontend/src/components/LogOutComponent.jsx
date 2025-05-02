// LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/LogOutStyles.css'; // You can move your CSS here

const LogoutButton = ({ className = '', style = {} }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem('customerToken');
    localStorage.removeItem('employeeToken');
    
    // Clear user data
    localStorage.removeItem('customerData');
    localStorage.removeItem('employeeData');
    
    // Redirect to home page
    navigate('/');
    window.location.reload(); // Optional: ensures complete reset
  };

  return (
    <div 
      className={`logout-button-container ${className}`} 
      style={style}
      onClick={handleLogout}
    >
      <div className="logout-button-text">LOG OUT</div>
    </div>
  );
};

export default LogoutButton;