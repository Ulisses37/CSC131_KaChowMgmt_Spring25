import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBarComponent'; 
import BackButton from '../components/BackButtonComponent'; 
import '../styles/CustomerLoginPageStyles.css';

function CustomerLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // API call function
    async function authenticateCustomer(email, password) {
        try {
            const response = await fetch('http://localhost:5000/api/login/customer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
    
            console.log('Raw API Response:', response);

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || 'Login failed');
            }
    
            const data = await response.json();
    
            console.log('Parsed API Data:', data);
    
            return {
                success: data.success,
                token: data.token,
                customerData: data.customer,
                message: data.message
            };
        } catch (err) {
            return {
                success: false,
                message: err.message || "Authentication failed"
            };
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        setError("");
        
        try {
            const response = await authenticateCustomer(email, password);
            console.log('Authentication Response:', response);
            
            if (response.success) {
                localStorage.setItem('customerToken', response.token);
                localStorage.setItem('customerId', response.customerData.id);
                
                console.log('Login successful. Stored:', {
                    token: response.token,
                    customerId: response.customerData.id
                });
                
                navigate("/customer-dashboard", {
                    state: {
                        customerData: response.customerData
                    }
                });
            } else {
                setError(response.message || "Invalid credentials");
            }
        } catch (err) {
            setError(err.message || "An unexpected error occurred");
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-page-0">
            <BackButton text="HOME"/>
            <HeaderBar/>
    
            <img className="srs-csc-131-1-icon"lt="Company Logo" src="/SRS_CSC_131 1.png"/>
            <div className="login-page-0-inner"></div>
            <div className="log-in">Log In</div>
            <div className="no-account">No account?</div>
            
            <Link to="/account-creation" style={{color: 'inherit',textDecoration: 'none'}}>
                <div className="create-one" id="CREATEONEText">CREATE ONE</div>
            </Link>
            
            <div className="line-div"></div>
            
            <Link to="/employee-login" style={{color: 'inherit',textDecoration: 'none'}}>
                <div className="employee-login" id="EMPLOYEELOGINText">Employee Login</div>
            </Link>
            
            <Link to="/forgot-password" style={{color: 'inherit',textDecoration: 'none'}}>
                <div className="customer-forgot-password" id="FORGOTPASSWORDText">FORGOT PASSWORD</div>
            </Link>

            {/* Error message display */}
            {error && (
                <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
                    {error}
                </div>
            )}

            {/* Form elements */}
            <form onSubmit={handleLogin} className="login-form">
                <div className="customer-email-input">
                    <input 
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                        className="key-field"
                        required
                    />
                </div>

                <div className="customer-password-input">
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        className="key-field"
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="customer-login-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'LOGGING IN...' : 'LOG IN'}
                </button>
            </form>
        </div>
    )
}

export default CustomerLoginPage;
