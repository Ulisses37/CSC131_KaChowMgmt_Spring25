import '../styles/CustomerDashboardStyles.css';
import Menu from '../components/CustomerMenuComponent';
import HeaderBar from '../components/HeaderBarComponent';
import AppointmentButton from '../components/BookAppointmentComp';
import Dropdown from '../components/CustomerDropMenuComp';

function AppointmentFeedbackPage() {
   
    return (
        <div className="feedback-page">
            <HeaderBar />
            <div className="header-gradient" />
            
            <Menu />
            <AppointmentButton />
            
            <div className="feedback-container">
                <h1 className="feedback-title">Feedback</h1>
                
                <div className="appointment-details">
                    <div className="detail-item">
                        <span className="detail-label">Ticket #:</span>
                        <span className="detail-value">47198</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Make/Model:</span>
                        <span className="detail-value">Honda Accord</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">VIN #:</span>
                        <span className="detail-value">9ZCLG2F45NF30P151</span>
                    </div>
                    <div className="service-type">
                        <span className="detail-label">Appointment Type:</span>
                        <span className="detail-value">Oil Change</span>
                    </div>
                </div>

                <div className="feedback-form">
                    <div className="feedback-question">
                        <label>Were your needs satisfied in this appointment?</label>
                        <Dropdown 
                            options={['Yes', 'No']}
                            placeholder="Select Answer"
                        />
                    </div>

                    <div className="feedback-question">
                        <label>From 1 to 5, how satisfied are you with the mechanic’s service?</label>
                        <Dropdown
                            options={['1', '2', '3', '4', '5']}
                            placeholder="Select Rating"
                        />
                    </div>

                    <button 
                        className="confirm-button"
                    >
                        Confirm
                    </button>
                </div>
            </div>

            <div className="user-profile-controls">
                <div className="profile-icon" onClick={() => navigate('/customer-profile')}>
                    <img src="profile-icon.png" alt="Profile" />
                </div>
            </div>
        </div>
    );
}

export default AppointmentFeedbackPage;