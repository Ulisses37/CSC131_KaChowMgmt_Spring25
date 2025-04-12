import { useLocation } from 'react-router-dom';
import '../styles/CustomerDashboardStyles.css';
import Menu from '../components/CustomerMenuComponent';
import AppointmentButton from '../components/BookAppointmentComp'
import DropMenu from '../components/CustomerDropMenuComp'

function CustomerDashboardPage() {
    const { state } = useLocation();
    const { customerData } = state || {};

    // Fallback if customerData is undefined
    if (!customerData) {
        return <div>Loading customer data...</div>;
    }

    // <img className="user-profile-page-child" alt="" src="Rectangle 2.svg"></img>
    // <img className="rectangle-icon" alt="" src="Rectangle 21.svg"></img>

    return (
        <div className="user-profile-page">
            <div className="user-profile-page-child"></div>
            
            <div className="user-profile-page-item"></div>
            <div className="user-profile-page-inner"></div>
            <img className="srs-csc-131-2-icon" alt="" src="SRS_CSC_131 1.png"></img>
            <DropMenu/>
            <AppointmentButton/>
            <div className="gray-rectangle-bg"></div>
            <Menu />
            {/* Dynamically render registered cars */}
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
                <div className="user-info-bar">{customerData.name || "N/A"}</div>
            </div>
            <div className="email">Email</div>
            <div className="email-holder">
                <div className="user-info-bar">{customerData.email || "N/A"}</div>
            </div>
            <div className="change-password">Change Password</div>
        </div>
    );
}

export default CustomerDashboardPage;