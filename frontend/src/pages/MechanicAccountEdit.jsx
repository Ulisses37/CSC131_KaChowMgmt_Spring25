import React, { useState, useEffect } from 'react';
import HeaderBar from '../components/HeaderBarComponent';
import '../styles/MechAccountEditStyles.css';

function MechanicAccountEditPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        contactNumber: '',
        city: '',
        state: '',
        bankAccountNumber: '',
        bankRoutingNumber: ''
    });
    const [originalData, setOriginalData] = useState(null);

    // Fetch mechanic's current data
    useEffect(() => {
        const fetchMechanicData = async () => {
            try {
                if (useMockData) {
                    // Use mock data
                    const mockData = generateMockMechanic();
                    setOriginalData(mockData);
                    setFormData({
                        firstName: mockData.name.split(' ')[0] || '',
                        lastName: mockData.name.split(' ')[1] || '',
                        address: mockData.address || '',
                        contactNumber: mockData.phone || '',
                        city: mockData.city || '',
                        state: mockData.state || '',
                        bankAccountNumber: mockData.bankAccountNumber || '',
                        bankRoutingNumber: mockData.bankRoutingNumber || ''
                    });
                    console.log("Using mock mechanic data:", mockData);
                    return;
                }

                const response = await fetch('/api/employees/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setOriginalData(data);
                setFormData({
                    firstName: data.name.split(' ')[0] || '',
                    lastName: data.name.split(' ')[1] || '',
                    address: data.address || '',
                    contactNumber: data.phone || '',
                    city: data.city || '',
                    state: data.state || '',
                    bankAccountNumber: data.bankAccountNumber || '',
                    bankRoutingNumber: data.bankRoutingNumber || ''
                });
            } catch (error) {
                console.error('Error fetching mechanic data:', error);
            }
        };
        fetchMechanicData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Prepare only changed fields for submission
            const changes = {};
            Object.keys(formData).forEach(key => {
                if (formData[key] !== '' && 
                    (!originalData || formData[key] !== originalData[key])) {
                    changes[key] = formData[key];
                }
            });

            // If name fields are changed, combine them
            if (changes.firstName || changes.lastName) {
                changes.name = `${changes.firstName || formData.firstName} ${changes.lastName || formData.lastName}`;
                delete changes.firstName;
                delete changes.lastName;
            }

            if (Object.keys(changes).length === 0) {
                alert('No changes to save');
                return;
            }

            const response = await fetch('/api/employees/me', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(changes)
            });

            if (response.ok) {
                alert('Profile updated successfully');
                // Refresh the data
                const updatedData = await response.json();
                setOriginalData(updatedData);
            } else {
                throw new Error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    if (!originalData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-account">
            <HeaderBar />
            
            <div className="edit-profile-component">
                {/* First Name */}
                <div className="firstname">
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="firstname-child input-field"
                        placeholder="Enter First Name"
                    />
                    <div className="first-name">First Name</div>
                </div>

                {/* Last Name */}
                <div className="lastname">
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="lastname-child input-field"
                        placeholder="Enter Last Name"
                    />
                    <div className="first-name">Last Name</div>
                </div>

                {/* Email (readonly) */}
                <div className="email">
                    <input
                        type="email"
                        value={originalData.email}
                        readOnly
                        className="email-child input-field"
                    />
                    <div className="email1">Email</div>
                </div>

                {/* Address */}
                <div className="address">
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="address-child input-field"
                        placeholder="Enter Address"
                    />
                    <div className="address1">Address</div>
                </div>

                {/* Contact Number */}
                <div className="address">
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="address-child input-field"
                        placeholder="Enter Phone Number"
                    />
                    <div className="address1">Contact Number</div>
                </div>

                {/* City */}
                <div className="firstname">
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="firstname-child input-field"
                        placeholder="Enter Your City"
                    />
                    <div className="first-name">City</div>
                </div>

                {/* State */}
                <div className="state">
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="state-child input-field"
                        placeholder="Select your State"
                    />
                    <img className="keyboard-arrow-down1" alt="" src="Keyboard arrow down.svg"/>
                </div>

                {/* Bank Account Number */}
                <div className="banknumber">
                    <input
                        type="text"
                        name="bankAccountNumber"
                        value={formData.bankAccountNumber}
                        onChange={handleChange}
                        className="banknumber-child input-field"
                        placeholder="Enter Your Bank Account Number"
                    />
                    <div className="first-name">Bank Account Number</div>
                </div>

                {/* Bank Routing Number */}
                <div className="banknumber">
                    <input
                        type="text"
                        name="bankRoutingNumber"
                        value={formData.bankRoutingNumber}
                        onChange={handleChange}
                        className="banknumber-child input-field"
                        placeholder="Enter Your Bank Routing Number"
                    />
                    <div className="first-name">Bank Routing Number</div>
                </div>
            </div>

            <button className="enter-wrapper" onClick={handleSubmit}>
                <div className="enter">Save</div>
            </button>

            <div className="play-arrow-filled-parent">
                <img className="play-arrow-filled-icon" alt="" src="play_arrow_filled.svg"/>
                <div className="text">Edit Account</div>
            </div>
        </div>
    );
}

export default MechanicAccountEditPage;