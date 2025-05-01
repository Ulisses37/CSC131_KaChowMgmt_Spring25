import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeLoginStyles.css';
import BackButton from '../components/BackButtonComponent'; 
import HeaderBar from '../components/HeaderBarComponent'; 

function EmployeeLoginPage() {
    const [email, setEmail] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // API call function
    async function authenticateEmployee(employeeId, email, password) {
        try {
            const response = await fetch('http://localhost:5000/api/login/employee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employeeId, email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            return {
                success: true,
                token: data.token,
                employeeData: data.employee,
                role: data.role // This will be 'admin' or 'mechanic'
            };
            
        } catch (err) {
            return {
                success: false,
                message: err.message || "Authentication failed"
            };
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !employeeId || !password) {
            setError('Please fill all fields');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email');
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await authenticateEmployee(employeeId, email, password);
            
            if (response.success) {
                localStorage.setItem('employeeToken', response.token);
                
                // Route based on employee role from backend
                if (response.role === 'admin') {
                    navigate("/admin-dashboard", {
                        state: {
                            employeeData: response.employeeData
                        }
                    });
                } else {
                    navigate("/mechanic-dashboard", {
                        state: {
                            employeeData: response.employeeData
                        }
                    });
                }
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

    return(
        <div className="employee-login-page">
            <BackButton text="HOME" onClick={() => navigate('/')} />
            <HeaderBar/>
            <img className="srs-csc-131-1-icon" alt="Company Logo" src="/SRS_CSC_131 1.png"/>
            <div className="employee-login-page-inner"></div>
            <div className="employee-log-in">Employee Log In</div>
            <div className="line-div"></div>
            
            {error && (
                <div className="error-message" style={{ 
                    color: 'red', 
                    textAlign: 'center',
                    margin: '10px 0',
                    fontSize: '14px'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="employee-login-form">
                <div className="emp-id-input">
                    <input
                        type="text"
                        className="key-field"
                        placeholder="Employee ID"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                    />
                </div>

                <div className="emp-email-input">
                    <input
                        type="email"
                        className="key-field"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="emp-password-input">
                    <input
                        type="password"
                        className="key-field"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div 
                    className="emp-forgot-password" 
                    id="fORGOTPASSWORDText"
                    onClick={() => navigate('/forgot-password')}
                    style={{ cursor: 'pointer' }}
                >
                    FORGOT PASSWORD
                </div>

                <button
                    type="submit"
                    className="emp-login-button"
                    disabled={isLoading}
                    style={{
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1
                    }}
                >
                    {isLoading ? 'LOGGING IN...' : 'LOG IN'}
                </button>
            </form>
        </div>
    )
}

export default EmployeeLoginPage;