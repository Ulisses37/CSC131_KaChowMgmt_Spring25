import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeLoginStyles.css';

function EmployeeLoginPage() {
	const [email, setEmail] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !employeeId || !password) {
            setError('Please fill all fields');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email');
            return;
        }

        setIsLoading(true);

        try {
            // Replace with actual API call
            const { success, userType, userData } = await verifyEmployeeLogin({
                email,
                employeeId,
                password
            });

            if (success) {
                if (userType === 'admin') {
                    navigate('/admin-dashboard', { state: { userData } });
                } else {
                    // Pass mechanic ID and data to dashboard
                    navigate('/mechanic-dashboard', { 
                        state: { 
                            employeeId,
                            userData 
                        } 
                    });
                }
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Enhanced mock verification with sample user data
    const verifyEmployeeLogin = async (credentials) => {
        

        const realLogin = async (email, password) => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await fetch('https://your-api.com/login', {  // REMEMBER TO CHANGE PORT NUMBER IF ITS DIFFERENT http://localhost/:' + process.env.REACT_APP_HOST_PORT + '/api/employeeLogin
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            return await response.json();
        };

        // // Sample admin user
        // const adminUsers = [{
        //     email: 'admin@company.com',
        //     id: 'ADMIN001',
        //     password: 'admin123',
        //     data: {
        //         name: "Admin User",
        //         role: "Administrator",
        //         permissions: ["all"]
        //     }
        // }];

        // // Sample mechanic users with individual data
        // const mechanicUsers = [
        //     {
        //         email: 'mechanic1@company.com',
        //         id: 'MECH001',
        //         password: 'mechanic123',
        //         data: {
        //             name: "John Mechanic",
        //             specialty: "Engine Repair",
        //             currentJobs: 3,
        //             schedule: ["Mon", "Wed", "Fri"]
        //         }
        //     },
        //     {
        //         email: 'mechanic2@company.com',
        //         id: 'MECH002',
        //         password: 'mechanic123',
        //         data: {
        //             name: "Sarah Technician",
        //             specialty: "Electrical Systems",
        //             currentJobs: 1,
        //             schedule: ["Tue", "Thu"]
        //         }
        //     }
        // ];

        const foundAdmin = adminUsers.find(user => 
            user.email === credentials.email &&
            user.id === credentials.employeeId &&
            user.password === credentials.password
        );

        const foundMechanic = mechanicUsers.find(user => 
            user.email === credentials.email &&
            user.id === credentials.employeeId &&
            user.password === credentials.password
        );

        if (foundAdmin) {
            return { 
                success: true, 
                userType: 'admin',
                userData: foundAdmin.data
            };
        }
        if (foundMechanic) {
            return { 
                success: true, 
                userType: 'mechanic',
                userData: foundMechanic.data
            };
        }

        return { success: false };
    };

    return(
        <div class="employee-login-page">
    		<div className="employee-login-page-child"></div>
            <div className="employee-login-page-item"></div>
            <img 
                className="srs-csc-131-1-icon" 
                alt="Company Logo" 
                src="/SRS_CSC_131 1.png"
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
            />
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

            <div className="emp-email-input">
                <input
                    type="email"
                    className="key-field"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="emp-id-input">
                <input
                    type="text"
                    className="key-field"
                    placeholder="Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                />
            </div>

            <div className="emp-password-input">
                <input
                    type="password"
                    className="key-field"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

            <div 
                className="emp-login-button"
                onClick={!isLoading ? handleLogin : null}
                style={{
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1
                }}
            >
                <div className="button1">
                    {isLoading ? 'LOGGING IN...' : 'LOG IN'}
                </div>
            </div>
  	    </div>
    )
}

export default EmployeeLoginPage

// const realLogin = async (email, password) => {
//     const response = await fetch('https://your-api.com/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//     });
//     return await response.json();
// };