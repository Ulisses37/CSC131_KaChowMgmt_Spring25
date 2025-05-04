import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AppointmentCreationSuccess.css';
import HeaderBar from '../components/HeaderBarComponent';

const AppointmentCreationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="appointment-success">
      <HeaderBar />
      <br/>
      <img
                className="srs-csc-131-2-icon"
                alt="Logo"
                src="SRS_CSC_131 1.png"
                onClick={() => navigate("/")}
            />
            <br/>
      <h2>Appointment Created Successfully!</h2>
      <p>
        Your appointment has been successfully created. You will receive a confirmation email or call shortly.
      </p>
      <div className="success-buttons">
        <button onClick={() => navigate('/viewappointment')}>View Appointments</button>
        <button onClick={() => navigate('/customer-dashboard')}>Go Back to Dashboard</button>
      </div>
    </div>
  );
};

export default AppointmentCreationSuccess;