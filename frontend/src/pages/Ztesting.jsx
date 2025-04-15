import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import kachowImage from '../assets/SRS_CSC_131.png';

const Ztesting = () => {
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
        navigate('/viewappointment');
    };

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', background: 'white', padding: '20px' }}>
            {/* Header Section */}
            <div style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontFamily: 'Montserrat', fontWeight: '500', color: '#333333' }}>Create a Ticket</h2>
                <img src={kachowImage} alt="Kachow" style={{ maxWidth: '200px', margin: '20px auto' }} />
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
                {/* Customer ID */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontFamily: 'Montserrat', fontWeight: '500', color: '#333333', marginBottom: '8px' }}>
                        Customer ID:
                    </label>
                    <input
                        type="text"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ADADAD',
                            fontFamily: 'Montserrat',
                            fontSize: '16px',
                        }}
                    />
                </div>

                {/* Vehicle Number */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontFamily: 'Montserrat', fontWeight: '500', color: '#333333', marginBottom: '8px' }}>
                        Vehicle Number:
                    </label>
                    <input
                        type="text"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ADADAD',
                            fontFamily: 'Montserrat',
                            fontSize: '16px',
                        }}
                    />
                </div>

                {/* Repair Type */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontFamily: 'Montserrat', fontWeight: '500', color: '#333333', marginBottom: '8px' }}>
                        Repair Type:
                    </label>
                    <input
                        type="text"
                        value={vehicleRepairType}
                        onChange={(e) => setVehicleRepairType(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ADADAD',
                            fontFamily: 'Montserrat',
                            fontSize: '16px',
                        }}
                    />
                </div>

                {/* Appointment Date */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontFamily: 'Montserrat', fontWeight: '500', color: '#333333', marginBottom: '8px' }}>
                        Select Appointment Date:
                    </label>
                    <input
                        type="date"
                        value={dateOfRepair}
                        onChange={(e) => setDateOfRepair(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ADADAD',
                            fontFamily: 'Montserrat',
                            fontSize: '16px',
                        }}
                    />
                </div>

                {/* Submit Button */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        type="submit"
                        style={{
                            background: '#2C2C2C',
                            color: '#F5F5F5',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            border: 'none',
                            fontFamily: 'Montserrat',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}
                    >
                        Create Ticket
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Ztesting;