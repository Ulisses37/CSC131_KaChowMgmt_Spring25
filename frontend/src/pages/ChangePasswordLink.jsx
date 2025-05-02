import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ChangePasswordLinkStyles.css';
import HeaderBar from '../components/HeaderBarComponent'; 
function ChangePasswordLinkPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    console.log("ChangePasswordLinkPage loaded with token:", token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/password/reset-password/${token}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password }),
                }
            );

            if (response.ok) {
                alert("Password reset successfully!");
                navigate('/customer-login'); // Redirect to login page
            } else {
                const error = await response.json();
                alert(error.message || "Failed to reset password");
            }
        } catch (err) {
            console.error("Password reset error:", err);
            alert("An error occurred while resetting password");
        }
    };

    return (
        <div className="change-password-page">

            {/* Header Bar */}
           <HeaderBar/>
            {/* Optional logo */}
            <img className="srs-csc-131-1-icon"lt="Company Logo" src="/SRS_CSC_131 1.png"/>

            {/* White box container */}
            <div className="change-password-page-inner"></div>

            {/* Text Labels */}
            <div className="change-your-password">Reset Your Password</div>
            <div className="enter-new-password">Enter New Password</div>
            <div className="re-enter-new-password">Re-enter New Password</div>

            {/* Inputs */}
            <div className="password-input">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    required
                    minLength="8"
                    style={{ width: '100%', border: 'none', outline: 'none' }}
                />
            </div>
            <div className="password-input1">
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    required
                    minLength="8"
                    style={{ width: '100%', border: 'none', outline: 'none' }}
                />
            </div>

            {/* Button */}
            <div className="reset-button" onClick={handleSubmit}>
                <div className="reset-button-text">Reset Password</div>
            </div>

            <div className="line-div"></div>
        </div>
    );
}

export default ChangePasswordLinkPage;