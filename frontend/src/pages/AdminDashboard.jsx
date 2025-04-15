import { useLocation } from 'react-router-dom';

function AdminDashboardPage() {
    const { state } = useLocation();
    const { employeeId, userData } = state || {};

    return (
        <div className="admin-landing-page">
            <img className="directions-car-icon" alt="" src="directions_car.svg"></img>
            <div className="background-red"></div>
            <div className="background-black"></div>
            <img className="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png"></img>
            <div className="payroll-button">
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
            </div>
            <div className="admin-landing-page-child"></div>
            <div className="hello-admin">Hello, Admin</div>                 {/*<h1>Welcome, {userData?.name}</h1>*/}
            <div className="account-button-for-admin">
                <div className="button"></div>
                <div className="account-button-for-admin-child"></div>
                <div className="account-button-for-admin-item"></div>
                <div className="account-button-for-admin-inner"></div>
            </div>
            <div className="button-parent">
                <div className="button1">
                    <div className="tickets4">Clock in</div>
                </div>
                <div className="button1">
                    <div className="tickets4">Clock out</div>
                </div>
            </div>
    </div>
    );
}

export default AdminDashboardPage