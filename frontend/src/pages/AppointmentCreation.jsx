import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/AppointmentCreation.css';
import HeaderBar from '../components/HeaderBarComponent';

const AppointmentCreation = () => {
    const [customerID, setCustomerID] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleRepairType, setVehicleRepairType] = useState('');
    const [dateOfRepair, setDateOfRepair] = useState('');
    const [timeOfRepair, setTimeOfRepair] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ticket = {
            id: Date.now(),
            customerID,
            vehicleModel,
            vehicleNumber,
            repairType: vehicleRepairType,
            date: dateOfRepair,
            time: timeOfRepair,
        };

        try {
            const response = await fetch('https://your-api-endpoint.com/tickets', {
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
            setCustomerID('');
            setVehicleModel('');
            setVehicleNumber('');
            setVehicleRepairType('');
            setDateOfRepair('');
            setTimeOfRepair('');
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
            <img className="srs-csc-131-2-icon" 
            alt="" 
            src="SRS_CSC_131 1.png"
            onClick={() => navigate("/")}></img>
            <h2>Create a Ticket</h2>
            <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label>Customer ID:</label>
        <input
            type="text"
            value={customerID}
            onChange={(e) => setCustomerID(e.target.value)}
            required
        />
    </div>
    <div className="form-group">
        <label>Vehicle Model:</label>
        <input
            type="text"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            required
        />
    </div>
    <div className="form-group">
        <label>Vehicle Number:</label>
        <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
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
        <label>Select appointment date:</label>
        <input
            type="date"
            value={dateOfRepair}
            onChange={(e) => setDateOfRepair(e.target.value)}
            required
        />
    </div>
    <div className="form-group">
    <label>Select appointment time:</label>
    <select
        value={timeOfRepair}
        onChange={(e) => setTimeOfRepair(e.target.value)}
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
</div>
</form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <br />
            <div className="navigation-buttons">
                <button type="submit">Create Ticket</button>
                <button onClick={() => navigate('/viewappointment')}>View Appointment</button>
                <button onClick={() => navigate('/appt-reschedule')}>Reschedule</button>
                <button onClick={() => navigate('/appt-cancel')}>Cancel</button>
            </div>
     </div>
    )};

export default AppointmentCreation;