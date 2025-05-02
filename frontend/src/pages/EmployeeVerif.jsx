import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeVerifStyles.css';

function EmployeeVerifPage() {
    const [employeeId, setEmployeeId] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleIdChange = (e) => {
        setEmployeeId(e.target.value);
        setError('');
    };

    // API call function
    async function authenticateEmployeeID(employeeId){
        try {
            const response = await fetch('http://localhost:5000/api/login/employee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employeeId })
            });

            console.log('Raw API Response:', response); // Debug code

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Parsed API Data:', data); // Debug code

            return {
                success: true,
                token: data.token,
                employeeData: data.employee 
            };
            
        } catch (err) {
            return {
                success: false,
                message: err.message || "Authentication failed"
            };
        }
    }

    const handleVerification = async (e) => {
        e.preventDefault();
        
        if (!employeeId) {
            setError('Please enter your Employee ID');
            return;
        }

        if (!/^[A-Za-z0-9]{6,10}$/.test(employeeId)) {
            setError('Please enter a valid Employee ID (6-10 alphanumeric characters)');
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await authenticateEmployeeID(employeeId);
            console.log('Authentication Response:', response); // Debug code
            
            if (response.success) {
                localStorage.setItem('employeeToken', response.token);
                
                console.log('Verfication Response:', response);   // Debug code
                
                navigate("/employee-login", {
                  state: {
                    employeeData: response.employeeData
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
        
        // try {
        //     // Using Fetch API with Promise
        //     const response = await fetch(
        //         'http://localhost:' + 5000 +'/api/employeeLogin',
        //         {
        //             method: 'POST',
        //             headers: {'Content-Type': 'application/json',},
        //             credentials: 'include',
        //             body: JSON.stringify({ employeeId })
        //         }
        //     );

        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }

        //     const data = await response.json();
        //     const { isValid, employeeType, temporaryToken } = data;

        //     if (isValid) {
        //         sessionStorage.setItem('empVerificationToken', temporaryToken);
                
        //         navigate('/employee-login', { 
        //             state: { 
        //                 verifiedEmployeeId: employeeId,
        //                 employeeType
        //             } 
        //         });
        //     } else {
        //         setError(data.message || 'Invalid Employee ID. Please try again.');
        //     }
        // } catch (err) {
        //     setError(err.message || "An unexpected error occurred");
        //     console.error("Verification error:", err);
        // } finally {
        //     setIsLoading(false);
        // }
    }
    
    return (
        <div className="employee-verifcation-page">
            <div className="employee-verifcation-page-child"></div>
            <div className="employee-verifcation-page-item"></div>
            <img 
                className="srs-csc-131-1-icon" 
                alt="Company Logo" 
                src="/SRS_CSC_131 1.png" 
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
            />
            <div className="employee-verifcation-page-inner"></div>
            <div className="line-div"></div>
            <div className="employee-verification">EMPLOYEE VERIFICATION</div>

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

            <div className="id-input-verif">
                <input
                    type="text"
                    className="key-field"
                    placeholder="Employee ID"
                    value={employeeId}
                    onChange={handleIdChange}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: error ? '1px solid red' : '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            </div>

            <div 
                className="verif-button" 
                id="buttonContainer"
                onClick={!isLoading ? handleVerification : null}
                style={{
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1
                }}
            >
                <div className="verif-button1"> {isLoading ? 'VERIFYING...' : 'ENTER'}</div>
            </div>
        </div> 
    )
}

export default EmployeeVerifPage;
