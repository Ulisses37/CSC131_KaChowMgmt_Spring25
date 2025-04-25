import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/components/CustomerMenuComponentStyles.css';

function CustomerMenuBar() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { customerData } = state || {};

    const goTo = (path) => {
        navigate(path, { state: { customerData } });
    };

    return (
        <div className="customer-menu">
            <div className="menu-wrapper">
                <div className="menu">Menu</div>
            </div>
            <div className="text-wrapper" onClick={() => goTo('/customer-dashboard')}>
                <div className="text">Profile</div>
            </div>
            <div className="text-container" onClick={() => goTo('/appointment-management')}>
                <div className="text">
                    <p className="manage">Manage</p>
                    <p className="manage">Appointments</p>
                </div>
            </div>
            <div className="text-wrapper" onClick={() => goTo('/service-history')}>
                <div className="text">Service History</div>
            </div>
        </div>
    );
}

export default CustomerMenuBar;


