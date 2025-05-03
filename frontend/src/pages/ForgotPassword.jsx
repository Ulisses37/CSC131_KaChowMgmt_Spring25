import { useState } from 'react';
import '../styles/ForgotPasswordStyles.css';
import { useNavigate } from 'react-router-dom';

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

        const forgotPasswordUrl = `${import.meta.env.VITE_API_BASE_URL}/api/auth/password/forgot-password`;
        console.log('Sending forgot password request to:', forgotPasswordUrl);

        try {
            const response = await fetch(forgotPasswordUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            let data = {};
            try {
                data = await response.json();
            } catch (jsonError) {
                console.warn('Invalid JSON in response:', jsonError);
            }

            if (response.ok) {
                setMessage(data.message || 'A reset link has been sent to your email address.');
                setButtonColor('valid');
            } else {
                setMessage(data.message || 'No account found with this email address.');
                setButtonColor('invalid');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setMessage(`Unexpected error: ${error.message || 'Please try again later.'}`);
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
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
            />
            <div className="forgot-password-inner"></div>
            <div className="reset-password">RESET PASSWORD</div>
            <div className="a-link-will">
                A link will be sent to your email address to reset your password
            </div>

            <div className={`message ${buttonColor}`}>{message}</div>

            <button 
                className={`send-button ${buttonColor}`}
                id="sendButton"
                onClick={handleSendClick}
            >
                SEND
            </button>

            <div 
                className="go-to-login" 
                onClick={() => navigate('/customer-login')}
            >
                GO TO LOGIN
            </div>

            <div className="username-input">
                <input
                    type="email"
                    placeholder="Email Address"
                    onChange={handleEmailChange}
                    value={email}
                />
            </div>
        </div>
    );
}

export default ForgotPasswordPage;