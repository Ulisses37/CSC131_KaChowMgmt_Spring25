import { useLocation, Navigate, useNavigate } from 'react-router-dom'; 
import '../styles/CustomerDashboardStyles.css';
import Menu from '../components/CustomerMenuComponent';
import HeaderBar from '../components/HeaderBarComponent'; 
import AppointmentButton from '../components/BookAppointmentComp';
import DropMenu from '../components/CustomerDropMenuComp';

function CustomerDashboardPage() {
    const { state } = useLocation();
    const { customerData } = state || {};
    const token = localStorage.getItem('customerToken');
    const navigate = useNavigate(); // Initialize the navigate function

    // Debugging logs 
    console.log('Dashboard State:', state);
    console.log('Token exists:', !!token);
    console.log('CustomerData:', customerData);

    if (!token) {
        return <Navigate to="/customer-login" replace />;
    }

    if (!customerData) {
        return (
            <div className="loading-fallback">
                <p>Loading customer data...</p>
                <button onClick={() => window.location.reload()}>
                    Refresh Page
                </button>
            </div>
        );
    }

    const handleChangePasswordClick = () => {
        navigate('/change-password');
    };

    return (
        <div className="user-profile-page">
            <div className="user-profile-page-child"></div>
            <div className="user-profile-page-item"></div>
            <HeaderBar/>
            <img className="srs-csc-131-2-icon" alt="" src="SRS_CSC_131 1.png" />
            <DropMenu/>
            <AppointmentButton/>
            <div className="gray-rectangle-bg"></div>
            <Menu />
            
            <div className="registered-vehicles">Registered Vehicles</div>
            {customerData.cars?.length > 0 ? (
                customerData.cars.map((car, index) => (
                    <div key={index} className={`${index === 0 ? 'st-reg-car-holder' : 'nd-reg-car-holder'}`}>
                        <div className="user-info-bar">
                            {car.make} {car.model} ({car.year || car.plateNumber})
                        </div>
                    </div>
                ))
            ) : (
                <div className="st-reg-car-holder">
                    <div className="user-info-bar">No cars registered</div>
                </div>
            )}

            {/* User Info Section */}
            <div className="user-info-header">User Information</div>
            <div className="name">Name</div>
            <div className="name-holder">
                <div className="user-info-bar auto-fit">{customerData.name || "N/A"}</div>
            </div>
            <div className="email">Email</div>
            <div className="email-holder">
                <div className="user-info-bar auto-fit">{customerData.email || "N/A"}</div>
            </div>
            <div 
                className="change-password" 
                onClick={handleChangePasswordClick}
                style={{ cursor: 'pointer' }} 
            >
                Change Password
            </div>
        </div>
    );
}

export default CustomerDashboardPage;