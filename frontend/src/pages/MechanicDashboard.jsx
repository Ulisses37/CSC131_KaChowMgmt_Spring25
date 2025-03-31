import { useLocation } from 'react-router-dom';

function MechanicDashboardPage() {
    const { state } = useLocation();
    const { employeeId, userData } = state || {};

    return (
        <div>
            <h1>Welcome, {userData?.name}</h1>
            <p>Specialty: {userData?.specialty}</p>
            {/* gotta put in the other stuff for mechanic dashboard */}
        </div>
    );
}

export default MechanicDashboardPage