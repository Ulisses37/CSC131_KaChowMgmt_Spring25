import { useLocation } from 'react-router-dom';
import LgButton from '../components/LightGreyButtonComponent';
import HeaderBar from '../components/HeaderBarComponent'; 

function AdminDashboardPage() {
    const { state } = useLocation();
    const { employeeId, userData } = state || {};

    return (
        <div className="admin-landing-page">
            <HeaderBar/>
            <img className="directions-car-icon" alt="" src="directions_car.png"></img>
            <img className="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png"></img>
            {/* <div className="payroll-button">
                <div className="tickets">PAYROLL</div>
            </div>
            <div className="invoice-button">
                <div className="tickets">INVOICE</div>
            </div>
            <div className="mechanic-button">
                <div className="tickets2">MECHANICS</div>
            </div>
            <div className="ticket-button">
                <div className="tickets">TICKETS</div>
            </div> */}
            <LgButton text="TICKETS" style={{ position: 'absolute', top: '390px', left: '475px' }}/>
            <LgButton text="MECHANICS" style={{ position: 'absolute', top: '525px', left: '475px' }}/>
            <LgButton text="PAYROLL" style={{ position: 'absolute', top: '660px', left: '475px' }}/>
            <LgButton text="INVOICE" style={{ position: 'absolute', top: '795px', left: '475px' }}/>
            <div className="admin-landing-page-child"></div>
            <div className="hello-admin">Hello, Admin</div>                 {/*<h1>Welcome, {userData?.name}</h1>*/}
            <div className="account-button-for-admin">
                {/* <div className="button"></div> */}
                <div className="account-button-for-admin-child"></div>
                <div className="account-button-for-admin-item"></div>
                <div className="account-button-for-admin-inner"></div>
            </div>
            {/* Clock In Component Here */}
    </div>
    );
}

export default AdminDashboardPage