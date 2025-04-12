import { Link } from 'react-router-dom';

function CustomerMenuBar() {
    return (
        <div className="customer-menu">
                <div className="menu-wrapper">
                    <div className="menu">Menu</div>
                </div>
                <Link to="/customer-dashboard" style={{color: 'inherit',textDecoration: 'none'}}>
                    <div className="text-wrapper">
                        <div className="text">Profile</div>
                    </div>
			    </Link>
                <Link to="/appointment-management" style={{color: 'inherit',textDecoration: 'none'}}>
                    <div className="text-container">
                        <div className="text">
                            <p className="manage">Manage</p>
                            <p className="manage">Appointments</p>
                        </div>
                    </div>
			    </Link>
                <Link to="/service-history" style={{color: 'inherit',textDecoration: 'none'}}>
                    <div className="text-wrapper">
                        <div className="text">Service History</div>
                    </div>
			    </Link>
            </div>
    );
}

export default CustomerMenuBar

