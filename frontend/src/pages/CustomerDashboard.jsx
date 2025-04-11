// customer-dashboard.js
import { useLocation } from 'react-router-dom';
import '../styles/CustomerDashboardStyles.css';
import AppointmentButton from '../components/BookAppointmentComponent'
import Menu from '../components/CustomerMenuComponent'

function CustomerDashboardPage() {
    const { state } = useLocation();
    const { customerData } = state || {};

    return (
        <div className="user-profile-page">
            <img className="user-profile-page-child" alt="" src="Rectangle 2.svg"></img>
            <div className="user-profile-page-item"></div>
            <div className="user-profile-page-inner"></div>
            <img className="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png" id="sRSCSC1311Image"></img>
            <div className="account-button-for-cutomer-vie">
                <div className="button">
            </div>
            <img className="person-icon" alt="" src="person.svg"></img>
            </div>
            <AppointmentButton/>
            <img className="rectangle-icon" alt="" src="Rectangle 21.svg"></img>
            <Menu/>
            <div className="st-reg-car-holder">
                <div className="honda-civic">Honda Civic</div>
            </div>
            <div className="nd-reg-car-holder">
                <div className="honda-civic">Toyota Sienna</div>
            </div>
            <div className="registered-vehicles">Registered Vehicles</div>
            <div className="change-password">Change Password</div>
            <div className="email-holder">
                <div className="honda-civic">user1@gmail.com</div>
            </div>
            <div className="email">Email</div>
            <div className="name-holder">
                <div className="honda-civic">{customerData?.name}</div>        {/* <h1>Welcome, {customerData?.name}</h1> */}
            </div>
            <div className="name">Name</div>
            <div className="user-info-header">User Information</div>
        </div>

    );
}

export default CustomerDashboardPage

