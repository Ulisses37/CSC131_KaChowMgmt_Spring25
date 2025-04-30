import { useState } from 'react';
import '../styles/ForgotPasswordStyles.css';
import {Link, useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [buttonColor, setButtonColor] = useState('');
    const navigate = useNavigate();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    async function handleSendClick() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setMessage('Please enter an email address.');
            setButtonColor('invalid');
            return;
        }

        if (!emailRegex.test(email)) {
            setMessage('Invalid email address.');
            setButtonColor('invalid');
            return;
        }

        try {
            // First check if email exists in your system
            const checkResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/password/forgot-password`, {
            //const checkResponse = await fetch('http://localhost/:' + process.env.REACT_APP_HOST_PORT + '/api/auth/password/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const checkData = await checkResponse.json();

            if (!checkResponse.ok || !checkData.exists) {
                setMessage('No account found with this email address.');
                setButtonColor('invalid');
                return;
            }

            // If email exists, send reset link
            const resetResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/password/reset-password/`, {
            //const resetResponse = await fetch('http://localhost:5000/api/auth/password/reset-password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (resetResponse.ok) {
                setMessage('A reset link has been sent to your email address.');
                setButtonColor('valid');
            } else {
                const errorData = await resetResponse.json();
                setMessage(errorData.message || 'Failed to send reset link.');
                setButtonColor('invalid');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
            setButtonColor('invalid');
        }
    }

    return (
        <div className="forgot-password">
            <div className="forgot-password-child"></div>
            <div className="forgot-password-item"></div>
            <img 
                className="srs-csc-131-icon"
                alt="Company Logo"
                src="SRS_CSC_131 1.png"
                id="KachowMngmtImage"
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
            />
            <div className="forgot-password-inner"></div>
            <div className="line-div"></div>
            <div className="reset-password">RESET PASSWORD</div>
            <div className="a-link-will">A link will be sent to your email address to reset your password</div>

            <div className={`message ${buttonColor}`}>{message}</div>

            <div
                className={`button ${buttonColor}`}
                id="sendButton"
                onClick={handleSendClick}
            >
                <div className="button1">
                    SEND
                </div>
            </div>

            <div 
                className="go-to-login" 
                id="goToLogin"
                onClick={() => navigate('/customer-login')}
                style={{ cursor: 'pointer' }}
            >
                GO TO LOGIN
            </div>

            <div className="username-input">
                <input
                    type="email"
                    placeholder="Email Address"
                    onChange={handleEmailChange}
                    className="key-field"
                    value={email}
                />
            </div>
        </div>
    );
}

export default ForgotPasswordPage;