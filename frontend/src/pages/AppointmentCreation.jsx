import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/AppointmentCreation.css';
import HeaderBar from '../components/HeaderBarComponent';

const AppointmentCreation = () => {
    const [customerId, setcustomerId] = useState('');
    const [vechVIN, setvechVIN] = useState('');
    const [vehicleRepairType, setVehicleRepairType] = useState('');
    const [appDate, setAppDate] = useState(''); // Combined date and time
    const [customerComments, setCustomerComments] = useState(''); // New customerComments field
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ticket = {
            id: Date.now(),
            customerId,
            vechVIN,
            repairType: vehicleRepairType,
            appointmentDateTime: appDate, // Combined date and time
            customerComments, // Include customerComments in the ticket object
        };

        try {
            const response = await fetch('http://localhost:5000/api/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticket),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Ticket created successfully:', data);
            setSuccessMessage('Ticket created successfully!');
            setErrorMessage('');
            setcustomerId('');
            setvechVIN('');
            setVehicleRepairType('');
            setAppDate('');
            setCustomerComments(''); // Clear the customerComments field
            navigate('/crsuccess'); // Navigate to success page
        } catch (error) {
            console.error('Error creating ticket:', error);
            setErrorMessage('Failed to create ticket. Please try again.');
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
            ></img>
            <h2>Create a Ticket</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer ID:</label>
                    <input
                        type="text"
                        value={customerId}
                        onChange={(e) => setcustomerId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Vehicle Number:</label>
                    <input
                        type="text"
                        value={vechVIN}
                        onChange={(e) => setvechVIN(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Repair Type:</label>
                    <input
                        type="text"
                        value={vehicleRepairType}
                        onChange={(e) => setVehicleRepairType(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Select appointment date and time:</label>
                    <input
                        type="datetime-local" // Combined date and time input
                        value={appDate}
                        onChange={(e) => setAppDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Customer Comments:</label>
                    <textarea
                        value={customerComments}
                        onChange={(e) => setCustomerComments(e.target.value)}
                        placeholder="Add any additional comments or details here..."
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button type="submit">Create Ticket</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <br />
            <div className="navigation-buttons">
                <button onClick={() => navigate('/viewappointment')}>View Appointment</button>
            </div>
        </div>
    );
};

export default AppointmentCreation;