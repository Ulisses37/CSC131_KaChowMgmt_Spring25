import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AccountCreationStyles.css';

function AccountCreationPage() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: fullName, email, password }),
            });
            if (response.ok) navigate('/customer-login');
        } catch (err) {
            console.error("Account creation error:", err);
        }
    };

    return (
        <div className="account-creation-container">
            {/* Header Section */}
            <div className="header-gradient"></div>
            <div className="nav-bar"></div>
            
            <img 
                src="SRS_CSC_131 1.png" 
                alt="Company Logo" 
                className="logo"
                onClick={() => navigate('/')}
            />
            
            {/* Main Form */}
            <div className="form-wrapper">
                <h1 className="form-title">Create Account</h1>
                
                <form onSubmit={handleSubmit} className="account-form">
                    <div className="input-group">
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full Name"
                            required
                            className="form-input"
                        />
                    </div>
                    
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                            className="form-input"
                        />
                    </div>
                    
                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New Password"
                            required
                            minLength="8"
                            className="form-input"
                        />
                    </div>
                    
                    <button type="submit" className="submit-btn">
                        CREATE ACCOUNT
                    </button>
                </form>
                
                <div className="login-prompt">
                    Already have an account?{' '}
                    <span 
                        onClick={() => navigate('/customer-login')} 
                        className="login-link"
                    >
                        LOG IN
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AccountCreationPage;