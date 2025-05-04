import React from 'react';
import { useNavigate } from 'react-router-dom';

function AppointmentButton() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/appt-creation'); // Navigate to the appointment creation page
	}
 return (
    <div className="baa-button" id="baABUTTONContainer" onClick={handleClick}>
		<div className="baa-button-child"></div>
		<div className="book-an-appointment">BOOK AN APPOINTMENT</div>
	</div>
 );   
}

export default AppointmentButton;