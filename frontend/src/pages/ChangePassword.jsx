import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ChangePassword.css';

function ChangePasswordPage() {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords don't match!");
            return;
        }
        try {
            const response = await fetch('http://localhost/:' + process.env.REACT_APP_HOST_PORT + '/api/auth/change-password', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });
            if (response.ok) {
                alert("Password changed successfully!");
                navigate('/');
            } else {
                alert("Failed to change password. Please check your old password.");
            }
        } catch (err) {
            console.error("Password change error:", err);
        }
    };

    return (
        <div className="change-password-container">
            {/* Header Section */}
            <div className="header-gradient"></div>
            <div className="nav-bar"></div>
            
            <img 
                src="SRS_CSC_131 1.png" 
                alt="Company Logo" 
                className="logo"
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
            />
            
            {/* Main Form */}
            <div className="form-wrapper">
                <h1 className="form-title">Change your Password</h1>
                
                <form onSubmit={handleSubmit} className="password-form">
                    <div className="input-group">
                        <label className="input-label">Enter Old Password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Old Password"
                            required
                            className="form-input"
                        />
                    </div>
                    
                    <div className="input-group">
                        <label className="input-label">Enter New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            required
                            minLength="8"
                            className="form-input"
                        />
                    </div>
                    
                    <div className="input-group">
                        <label className="input-label">Re-enter New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                            required
                            minLength="8"
                            className="form-input"
                        />
                    </div>
                    
                    <button type="submit" className="submit-btn">
                        CONFIRM
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordPage;