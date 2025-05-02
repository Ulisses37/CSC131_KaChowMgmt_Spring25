import { useLocation, Navigate, useNavigate } from 'react-router-dom'; 
import '../styles/EmployeeDashboardStyles.css';
import LgButton from '../components/LightGreyButtonComponent';
import HeaderBar from '../components/HeaderBarComponent'; 
import LogoutButton from '../components/LogOutComponent';

function MechanicDashboardPage() {
    const { state } = useLocation();
    const { employeeData } = state || {};
    const token = localStorage.getItem('employeeToken');
    const navigate = useNavigate();

    // Debugging logs 
    console.log('Dashboard State:', state);
    console.log('Token exists:', !!token);
    console.log('EmployeeData:', employeeData);

    if (!token) {
        return <Navigate to="/employee-login" replace />;
    }

    if (!employeeData) {
        return (
            <div className="loading-fallback">
                <p>Loading employee data...</p>
                <button onClick={() => window.location.reload()}>
                    Refresh Page
                </button>
            </div>
        );
    }

    return (
        <div className="admin-landing-page">
            <LogoutButton/>
            <HeaderBar/>
            <img className="directions-car-icon" alt="" src="directions_car.png"></img>
            <img className="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png"></img>
            
            <LgButton 
                text="ACCOUNT" 
                style={{ position: 'absolute', top: '390px', left: '475px' }}
                onClick={() => navigate('/account-details')}
            />
            <LgButton 
                text="WORK TICKETS" 
                style={{ position: 'absolute', top: '580px', left: '475px' }}
                onClick={() => navigate('/ticketpage')} change the name of this to what brian has it as
            />
            <LgButton 
                text="TICKET HISTORY" 
                style={{ position: 'absolute', top: '770px', left: '475px' }}
                onClick={() => navigate('/ticket-history')}
            />
            <LgButton
                text="CLOCK PAGE"
                style={{ position: 'absolute', top: '960px', left: '475px' }}
                onClick={() => navigate('/employee-clock')}
            />
            
            {/* Dynamic greeting container */}
            <div className="admin-greeting-container">
                <div className="admin-greeting">Hello, {employeeData.name || "N/A"}</div>
            </div>

        </div>
    );
}

export default MechanicDashboardPage;