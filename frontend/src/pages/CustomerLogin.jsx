import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CustomerLoginPageStyles.css';

function CustomerLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("Invalid Credentials");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
            // Replace with actual API call
            const response = await authenticateCustomer(email, password);
            
            if (response.success) {
                // Store minimal secure data
                localStorage.setItem('customerToken', response.token);
                
                // Redirect with FULL customer data
                navigate("/customer-dashboard", {
                    state: {
                        customerSchema: response.customerSchema
                    }
                });
            } else {
                setError(response.message || "Invalid credentials");
            }
        } catch (err) {
            // Enhanced error handling
            if (err.response) {
                // Server responded with error status
                setError(err.response.data.message || "Login failed");
            } else if (err.request) {
                // Request was made but no response
                setError("Network error. Please try again.");
            } else {
                // Other errors
                setError("An unexpected error occurred");
                console.error("Login error:", err);
            }
        } finally {
            setIsLoading(false);
        }
    }

    // Call to the API
    async function authenticateCustomer(email, password) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch('http://localhost:' + 5000 + '/api/login/customer', {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        return response;
    }

    return (
        <div className="login-page-0">
            <div className="login-page-0-child"></div>
            <div className="login-page-0-item"></div>
            {/* Logo (Click to go to Home Page) */}
            <img
                className="srs-csc-131-1-icon"
                alt="Company Logo"
                src="/SRS_CSC_131 1.png"
                onClick={() => navigate("/")}
            />
            <div className="login-page-0-inner"></div>
            <div className="log-in">Log In</div>
            <div className="no-account">No account?</div>
            
            {/* ----------------- NEED TO CHANGE ------------------- */}
            <Link to="/create-account" style={{color: 'inherit',textDecoration: 'none'}}>
                <div className="create-one" id="CREATEONEText">CREATE ONE</div>
            </Link>
            {/* ---------------------------------------------------- */}
            <div className="line-div"></div>
            {/* ----------------- NEED TO CHANGE ------------------- */}
            <Link to="/employee-verification" style={{color: 'inherit',textDecoration: 'none'}}>
                <div className="employee-login" id="EMPLOYEELOGINText">Employee Login</div>
            </Link>
            
            {/* ----------------- NEED TO CHANGE ------------------- */}
            <Link to="/forgot-password" style={{color: 'inherit',textDecoration: 'none'}}>
                <div className="customer-forgot-password" id="FORGOTPASSWORDText">FORGOT PASSWORD</div>
            </Link>
            {/* ---------------------------------------------------- */}

            {/* Error message display */}
            {error && (
                <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
                    {error}
                </div>
            )}

            {/* Form elements */}
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
                    aria-label="Email address"
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
                    aria-label="Password"
                    required
                />
            </div>

            <div 
                onClick={handleLogin}
                className="customer-login-button"
                style={isLoading ? { opacity: 0.7, cursor: 'not-allowed' } : { cursor: 'pointer' }}
                disabled={isLoading}
            >
                <div className="customer-login-button-text">
                    {isLoading ? 'LOGGING IN...' : 'LOG IN'}
                </div>
            </div>

  		</div>
    )
}

export default CustomerLoginPage;

// const response = await fetch('/api/customer/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password })
// });

// // Mock customer database
        // const customers = [
        //     {
        //         email: "customer1@example.com",
        //         password: "secure123", // In reality, backend hashes this
        //         token: "cust-jwt-token-1",
        //         customerData: {
        //             id: "CUST1001",
        //             name: "Alex Johnson",
        //             tier: "Gold Member",
        //             recentOrders: [
        //                 { id: "ORD-2023-001", date: "2023-10-15", total: 149.99 },
        //                 { id: "ORD-2023-002", date: "2023-10-20", total: 89.99 }
        //             ],
        //             preferences: {
        //                 newsletter: true,
        //                 smsAlerts: false
        //             }
        //         }
        //     },
        //     {
        //         email: "customer2@example.com",
        //         password: "secure456",
        //         token: "cust-jwt-token-2",
        //         customerData: {
        //             id: "CUST1002",
        //             name: "Sam Wilson",
        //             tier: "Silver Member",
        //             recentOrders: [
        //                 { id: "ORD-2023-003", date: "2023-10-18", total: 199.99 }
        //             ],
        //             preferences: {
        //                 newsletter: false,
        //                 smsAlerts: true
        //             }
        //         }
        //     }
        // ];

        // const customer = customers.find(c => 
        //     c.email === email && 
        //     c.password === password
        // );

        // return customer ? 
        //     { 
        //         success: true, 
        //         token: customer.token,
        //         customerData: customer.customerData 
        //     } : 
        //     { 
        //         success: false, 
        //         message: "Invalid email or password" 
        //     };