import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import '../styles/ChangePasswordStyles.css';

function ChangePasswordPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Debugging logs
    const token = localStorage.getItem('customerToken');
    console.log('ChangePassword - Token exists:', !!token);
    console.log('ChangePassword - Token value:', token);

    if (!token) {
        console.log('No token found - redirecting to login');
        return <Navigate to="/customer-login" replace />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Client-side validations
        if (formData.newPassword !== formData.confirmPassword) {
            setError("New passwords don't match!");
            setIsLoading(false);
            return;
        }

        if (formData.newPassword.length < 8) {
            setError("Password must be at least 8 characters");
            setIsLoading(false);
            return;
        }

        try {
            console.log('Attempting password change with token:', token);
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/password/change-password`,
                {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    },
                    body: JSON.stringify({ 
                        oldPassword: formData.oldPassword, 
                        oldPasswordRetyped: formData.oldPassword,
                        newPassword: formData.newPassword
                    }),
                }
            );

            const data = await response.json();
            console.log('Password change response:', data);

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('customerToken');
                    setError('Session expired. Please login again.');
                    return;
                }
                throw new Error(data.message || "Password change failed");
            }

            alert('Password changed successfully!');
            navigate('/customer-dashboard');
        } catch (err) {
            console.error("Password change error:", err);
            setError(err.message || "Error changing password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="change-password-container">
            <div className="header-gradient"></div>
            <div className="nav-bar"></div>
            
            <div className="form-wrapper">
                <h1 className="form-title">Change your Password</h1>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="password-form">
                    <div className="input-group">
                        <label className="input-label">Current Password</label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            placeholder="Enter current password"
                            required
                            className="form-input"
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label className="input-label">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password (min 8 characters)"
                            required
                            minLength="8"
                            className="form-input"
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label className="input-label">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter new password"
                            required
                            minLength="8"
                            className="form-input"
                            disabled={isLoading}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Changing Password...' : 'Change Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordPage;