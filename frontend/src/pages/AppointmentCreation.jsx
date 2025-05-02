import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/AppointmentCreation.css';
import HeaderBar from '../components/HeaderBarComponent';


const AppointmentCreation = () => {
    const [vechVIN, setvechVIN] = useState('');
    const [vehicleRepairType, setVehicleRepairType] = useState('');
    const [appDate, setAppDate] = useState('');
    const [customerComments, setCustomerComments] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const customerId = localStorage.getItem('customerId');
        if (!customerId) {
            setErrorMessage('You must be logged in to create a ticket.');
            return;
        }
    
        const ticketData = {
            //vin,  //? Written as this in vehicle schema
            vechVIN,
            customerId,
            ticketType: vehicleRepairType,
            appDate: new Date(appDate),  // Ensure this is a Date object
            customerComments,
            completionStatus: 'Unassigned',  // Default value if needed
            paymentStatus: false,  // Default value if needed
        };
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticketData),
            });
        
            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                    console.error('Backend error:', errorData);
                    if (errorData.errors) {
                        errorData.errors.forEach((err, index) => {
                            console.error(`Validation Error ${index + 1}:`, err);
                        });
                    }
                } catch (jsonErr) {
                    console.error('Failed to parse error JSON:', jsonErr);
                }
                throw new Error(errorData?.message || 'Failed to create ticket. Please try again.');
            }
        
            const data = await response.json();
            console.log('Ticket created successfully:', data);
            setSuccessMessage('Ticket created successfully!');
            setErrorMessage('');
            setvechVIN('');
            setVehicleRepairType('');
            setAppDate('');
            setCustomerComments('');
            navigate('/crsuccess');
        } catch (error) {
            console.error('Error creating ticket:', error);
            setErrorMessage(error.message || 'Failed to create ticket. Please try again.');
            setSuccessMessage('');
        }
    }
    return (
        <div>
            <HeaderBar />
            <br />
            <img
                className="srs-csc-131-2-icon"
                alt="Logo"
                src="SRS_CSC_131 1.png"
                onClick={() => navigate("/")}
            />
            <h2>Create a Ticket</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Vehicle VIN:</label>
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
                    <label>Appointment Date & Time:</label>
                    <input
                        type="datetime-local"
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