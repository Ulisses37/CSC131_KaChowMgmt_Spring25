import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import '../styles/AppointmentReschedule.css';
import HeaderBar from '../components/HeaderBarComponent';

const AppointmentReschedule = () => {
    const { id } = useParams(); // Get the appointment ID from the URL
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const customerId = localStorage.getItem('customerId');
        if (!customerId) {
            setErrorMessage('You must be logged in to reschedule an appointment.');
            return;
        }

        const rescheduleData = {
            newDate,
            newTime, // Include the new time in the reschedule data
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tickets/${id}/reschedule`, {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rescheduleData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Appointment rescheduled successfully:', data);
            setSuccessMessage('Appointment rescheduled successfully!');
            setErrorMessage('');
            setNewDate('');
            setNewTime('');
            navigate('/resuccess'); // Navigate to success page
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
            setErrorMessage('Failed to reschedule appointment. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <HeaderBar />
            <br />
            <br />
            <img
                className="srs-csc-131-2-icon"
                alt=""
                src="SRS_CSC_131 1.png"
                onClick={() => navigate("/")}
            />
            <h2>Reschedule Appointment</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    New Appointment Date:
                    <input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    New Appointment Time:
                    <select
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            -- Select Time --
                        </option>
                        <option value="08:00">08:00 AM</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">01:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="17:00">05:00 PM</option>
                    </select>
                </label>
                <br />
                <br />
                <button type="submit">Reschedule Appointment</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <br />
        </div>
    );
};

export default AppointmentReschedule;