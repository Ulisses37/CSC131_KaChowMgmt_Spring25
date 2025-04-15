import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Creation = () => {
    const [customerId, setCustomerId] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleRepairType, setVehicleRepairType] = useState('');
    const [dateOfRepair, setDateOfRepair] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticket = {
            id: Date.now(),
            customerId,
            vehicleNumber,
            repairType: vehicleRepairType,
            date: dateOfRepair,
        };
        console.log('Ticket created:', ticket);
        setCustomerId('');
        setVehicleNumber('');
        setVehicleRepairType('');
        setDateOfRepair('');
        navigate('/crsuccess');
    };

    return (
        <div className="container">
            <h2>Create a Ticket</h2>
            <img className="srs-csc-131-2-icon" alt="" src="SRS_CSC_131 1.png"></img>
            <form onSubmit={handleSubmit}>
                <label>
                    Customer ID:
                    <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required />
                </label>
                <br />
                <label>
                    Vehicle Number:
                    <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required />
                </label>
                <br />
                <label>
                    Repair Type:
                    <input type="text" value={vehicleRepairType} onChange={(e) => setVehicleRepairType(e.target.value)} required />
                </label>
                <br />
                <label>Select appointment time:
                    <input type="date" value={dateOfRepair} onChange={(e) => setDateOfRepair(e.target.value)} required />
                </label>
                <br />
                <br />
                <button type="submit">Create Ticket</button>
            </form>
            <br />
            <button onClick={() => navigate('/viewappointment')}>View Appointment</button>
            <br />
            <br />
            <button onClick={() => navigate('/appt-reschedule')}>Reschedule</button>
            <br />
            <br />
            <button onClick={() => navigate('/appt-cancel')}>Cancel</button>
            <br />
            <br />
            <button onClick={() => navigate('/ticketpage')}>M-TicketPage</button>
            </div>

    );
};

export default Creation;