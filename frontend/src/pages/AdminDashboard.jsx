import { useLocation } from 'react-router-dom';

function AdminDashboardPage() {
    const { state } = useLocation();
    const { employeeId, userData } = state || {};

    return (
        <div>
            <h1>Welcome, {userData?.name}</h1>
            <p>Specialty: {userData?.specialty}</p>
            {/* gotta put in the other stuff for admin dashboard */}
        </div>
    );
}

export default AdminDashboardPage