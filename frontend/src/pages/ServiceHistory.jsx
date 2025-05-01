import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ServiceHistoryStyles.css';
import HeaderBar from '../components/HeaderBarComponent'; 
import Menu from '../components/CustomerMenuComponent';
import AppointmentButton from '../components/BookAppointmentComp';
import DropMenu from '../components/CustomerDropMenuComp';

function ServiceHistoryPage() {
    const [serviceHistory, setServiceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch customerId and token from localStorage
    const customerId = localStorage.getItem('customerId');
    const token = localStorage.getItem('customerToken');

    useEffect(() => {
        console.log('Fetching service history for customer:', customerId); // Debug log
        console.log('Using token:', token ? 'exists' : 'missing'); // Debug log

        const fetchServiceHistory = async () => {
            try {
                if (!customerId || !token) {
                    throw new Error('Authentication required');
                }

                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/service-history/${customerId}`,
                    { 
                        headers: { 
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        } 
                    }
                );

                console.log('Response status:', response.status); // Debug log

                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    throw new Error(errorData?.error || 'Failed to fetch service history');
                }

                const data = await response.json();
                console.log('Service history data:', data); // Debug log
                setServiceHistory(data);
            } catch (err) {
                console.error('Error fetching service history:', err); // Debug log
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceHistory();
    }, [customerId, token]);

    if (!customerId || !token) {
        return <div className="auth-error">Please login to view service history</div>;
    }

    if (loading) return <div className="loading">Loading service history...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="service-history-page">
            <HeaderBar/>
            <Menu />
            <div className="service-history-header">Service History</div>
            <div className="gray-rectangle-bg"></div>
            
            {serviceHistory.length === 0 ? (
                <div className="no-history">No service history found</div>
            ) : (
                serviceHistory.map((ticket, index) => (
                    <div key={index} className="vin-parent">
                        <div className="vin">
                            <span className="vin1">VIN #: </span>
                            <span>{ticket["VIN #"]}</span>
                        </div>
                        <div className="makemodel">
                            <span className="vin1">Make/Model: </span>
                            <span>{ticket["Make/Model"]}</span>
                        </div>
                        <div className="ticket">
                            <span className="vin1">Ticket #: </span>
                            <span>{ticket["Ticket #"]}</span>
                        </div>
                        <div className="appointment-type">
                            <p className="datetime-completion">Appointment Type: </p>
                            <p className="pm">{ticket["Appointment Type"]}</p>
                        </div>
                        <div className="datetime">
                            <p className="datetime-completion">Date/Time Completion:</p>
                            <p className="pm">{ticket["Date Completion"]}</p>
                        </div>
                        <div className="button1" id="buttonContainer">
                            <div className="button2">Submit Feedback</div>
                        </div>
                    </div>
                ))
            )}
            
            <AppointmentButton/>
            <DropMenu/>
        </div>
    );
}

export default ServiceHistoryPage;