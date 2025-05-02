import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminMechAcctViewStyles.css';
import HeaderBar from '../components/HeaderBarComponent';
import BackButton from '../components/BackButtonComponent'; 

function AdminMechAccountViewPage() {
    const [mechanicData, setMechanicData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allMechanics, setAllMechanics] = useState([]);
    const navigate = useNavigate();

    // Fetch all mechanics on component mount
    useEffect(() => {
        const fetchMechanics = async () => {
            try {
                const response = await fetch('/api/employees', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch mechanics');
                const data = await response.json();
                setAllMechanics(data.data);
            } catch (error) {
                console.error('Error fetching mechanics:', error);
            }
        };
        fetchMechanics();
    }, []);

    // Handle search input changes
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        const results = allMechanics.filter(mechanic =>
            mechanic.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, allMechanics]);

    // Fetch specific mechanic data when selected
    const fetchMechanicData = async (mechanicId) => {
        try {
            const response = await fetch(`/api/employees/${mechanicId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch mechanic data');
            const data = await response.json();
            setMechanicData(data);
            setSearchTerm('');
            setSearchResults([]);
        } catch (error) {
            console.error('Error fetching mechanic data:', error);
        }
    };

    // Handle edit button click
    const handleEditClick = () => {
        if (mechanicData) {
            navigate(`/edit-account/${mechanicData._id}`);
        }
    };

    return (
        <div className="mechanic-statistics-2">
            <BackButton text="DASHBOARD"/>
            <HeaderBar />
            
            <img className="srs-csc-131-1-icon" alt="Company Logo" src="https://placehold.co/367x309" />
            
            {/* Search Bar */}
            <div style={{ position: 'absolute', top: '220px', left: '160px', zIndex: 100 }}>
                <input
                    type="text"
                    placeholder="Search mechanics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '10px',
                        width: '300px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
                {searchResults.length > 0 && (
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        width: '300px'
                    }}>
                        {searchResults.map(mechanic => (
                            <li 
                                key={mechanic._id}
                                onClick={() => fetchMechanicData(mechanic._id)}
                                style={{
                                    padding: '10px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #eee'
                                }}
                            >
                                {mechanic.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            {/* Mechanic Data Table */}
            {mechanicData ? (
                <div className="table">
                    <div className="profession-box">
                        <div className="mechanic-id">
                            <div className="id-box">
                                <div className="id">ID #</div>
                            </div>
                        </div>
                        <div className="year1">
                            <div className="id">{mechanicData._id}</div>
                        </div>
                    </div>
                    
                    <div className="profession-box">
                        <div className="mechanic-year">
                            <div className="year-box">
                                <div className="id">Year</div>
                            </div>
                        </div>
                        <div className="year1">
                            <div className="id">{new Date(mechanicData.createdAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                    
                    <div className="profession-box">
                        <div className="working-hours">
                            <div className="schedule-box">
                                <div className="id">Schedule</div>
                            </div>
                        </div>
                        <div className="working-dates">
                            <div className="days-of-the-container">
                                Monday, Wednesday, Friday: 8:00 A.M. - 4:00 P.M.<br />
                                Tuesday and Thursday: 9:00 A.M. - 3:00 P.M.
                            </div>
                        </div>
                    </div>
                    
                    <div className="profession-box">
                        <div className="mechanic-profession">
                            <div className="id">Specialist</div>
                        </div>
                        <div className="mechanic-skills">
                            <div className="skill-list">
                                {mechanicData.specialties.join('<br/>')}
                            </div>
                        </div>
                    </div>
                    
                    <div className="profession-box">
                        <div className="mechanic-past-working-history">
                            <div className="id">History</div>
                        </div>
                        <div className="vehicles-that-mechanic-worked">
                            <div className="skill-list">
                                {/* You would replace this with actual vehicle history from your data */}
                                Ferrari<br/>Fiat<br/>Ford
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{
                    position: 'absolute',
                    top: '300px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '24px',
                    color: '#555'
                }}>
                    {searchTerm ? 'No mechanics found' : 'Search for a mechanic to view their details'}
                </div>
            )}
            
            {/* Edit Button - Only shown when a mechanic is selected */}
            {mechanicData && (
                <div className="button1" onClick={handleEditClick}>
                    <div className="button2">Edit</div>
                </div>
            )}
            
            <div className="account-button-for-admin">
                <div className="button"></div>
                <div className="account-button-for-admin-child"></div>
                <div className="account-button-for-admin-item"></div>
                <div className="account-button-for-admin-inner"></div>
            </div>
        </div>
    );
}

export default AdminMechAccountViewPage;