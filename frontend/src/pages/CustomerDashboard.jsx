// customer-dashboard.js
import { useLocation } from 'react-router-dom';

function CustomerDashboardPage() {
    const { state } = useLocation();
    const { customerData } = state || {};

    return (
        <div>
            <h1>Welcome, {customerData?.name}</h1>
            {/* put personalized content here */}
        </div>
    );
}

export default CustomerDashboardPage

