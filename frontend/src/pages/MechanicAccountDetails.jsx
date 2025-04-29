import React, { useState, useEffect } from 'react';
import HeaderBar from '../components/HeaderBarComponent';
import { Link } from 'react-router-dom';
import '../styles/MechAccountDetailsStyles.css';

function MechanicAccountDetailsPage() {
    const [mechanic, setMechanic] = useState(null);
    
    // Mock data for testing
    const mockMechanic = {
        name: "John Doe",
        employeeId: "EMP12345",
        address: "123 Apple Street, Somewhere City, CA 90210",
        phone: "(555) 123-4567",
        specialties: ["Brakes", "Engine Repair", "Transmission"],
        bankRoutingNumber: "987654321"
    };

    // Fetch logged-in mechanic's data (falls back to mock data if API fails)
    useEffect(() => {
        const fetchMechanicData = async () => {
            try {
                const response = await fetch('/api/employees/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('API failed - using mock data');
                }
                
                const data = await response.json();
                setMechanic(data);
            } catch (error) {
                console.error('Error fetching mechanic data. Using mock data instead:', error);
                setMechanic(mockMechanic); // Fallback to mock data
            }
        };
        
        fetchMechanicData();
    }, []);

    if (!mechanic) {
        return <div>Loading...</div>;
    }


    return (
        <div className="mechanic-account">
            <HeaderBar />
            <img className="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png" id="sRSCSC1311Image"/>
            
            <div className="account-content">
                <div className="play-arrow-filled-parent">
                    <img className="play-arrow-filled-icon" alt="" src="play_arrow_filled.png"/>
                    <div className="text">Account</div>
                </div>
                
                <div className="table">
                    <div className="mech-name-row">
                        <div className="titlecell">
                            <div className="mech-name">Name</div>
                        </div>
                        <div className="bodycell">
                            <div className="mech-name">{mechanic.name}</div>
                        </div>
                    </div>
                    
                    <div className="mech-name-row">
                        <div className="titlecell1">
                            <div className="mech-name">Employee ID</div>
                        </div>
                        <div className="bodycell1">
                            <div className="mech-name">{mechanic.employeeId || '000003'}</div>
                        </div>
                    </div>
                    
                    <div className="schedule-row">
                        <div className="titlecell">
                            <div className="mech-name">Schedule</div>
                        </div>
                        <div className="bodycell">
                            <div className="mech-name">
                                <p className="monday-wednesday-friday">Monday, Wednesday, Friday 8am - 5pm</p>
                                <p className="monday-wednesday-friday">Tuesday, Thursday 9am- 5pm</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="schedule-row">
                        <div className="titlecell3">
                            <div className="mech-name">Specialties</div>
                        </div>
                        <div className="bodycell3">
                            <div className="empspec">
                                {mechanic.specialties && mechanic.specialties.map((specialty, index) => (
                                    <p key={index} className="brakes">{specialty}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="schedule-row">
                        <div className="titlecell4">
                            <div className="mech-name">Contact Info</div>
                        </div>
                        <div className="bodycell4">
                            <div className="mech-name">
                                <p className="brakes">{mechanic.address || '123 Apple Street, Somewhere City, CA'}</p>
                                <p className="brakes">{mechanic.phone || '(123) 123-5678'}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="contact-info-row1">
                        <div className="titlecell5">
                            <div className="mech-name">Payment Info</div>
                        </div>
                        <div className="bodycell5">
                            <div className="bankaccttitle">Bank Acct#</div>
                            <div className="bankacctnum">****************************</div>
                            <div className="bankaccttitle">Bank Rout#</div>
                            <div className="bankacctnum">{mechanic.bankRoutingNumber || '1234567890'}</div>
                        </div>
                        <div className="reveal-info-wrapper">
                            <div className="mech-name">Reveal Info</div>
                        </div>
                    </div>
                    
                    <div className="complete-row">
                        <div className="bodycell6">
                            <Link to="/edit-account" className="edit-wrapper">
                            <div className="mech-name">Edit</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MechanicAccountDetailsPage;