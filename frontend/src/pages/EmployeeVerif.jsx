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

    const handleVerification = async (e) => {
        e.preventDefault();
        
        if (!employeeId) {
            setError('Please enter your Employee ID');
            return;
        }

        // Basic ID format validation
        if (!/^[A-Za-z0-9]{6,10}$/.test(employeeId)) {
            setError('Please enter a valid Employee ID (6-10 alphanumeric characters)');
            return;
        }

        setIsLoading(true);
        
        try {
            // Real API call to verify employee ID
            const response = await axios.post(
                'http://localhost/:'+ process.env.REACT_APP_HOST_PORT + '/api/employeeLogin',
                { employeeId },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            const { isValid, employeeType, temporaryToken } = response.data;

            if (isValid) {
                // Store temporary verification token
                sessionStorage.setItem('empVerificationToken', temporaryToken);
                
                // Navigate to employee login with ID pre-filled
                navigate('/employee-login', { 
                    state: { 
                        verifiedEmployeeId: employeeId,
                        employeeType // 'admin' or 'mechanic'
                    } 
                });
            } else {
                setError('Invalid Employee ID. Please try again.');
            }
        } catch (err) {
            // Enhanced error handling
            if (err.response) {
                setError(err.response.data.message || "Verification failed");
            } else if (err.request) {
                setError("Network error. Please try again.");
            } else {
                setError("An unexpected error occurred");
                console.error("Verification error:", err);
            }
        } finally {
            setIsLoading(false);
        }
    };
    
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

            {/* Error message display */}
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

            {/* ID Input Field */}
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

            {/* Verification Button */}
            <div 
                className="button" 
                id="buttonContainer"
                onClick={!isLoading ? handleVerification : null}
                style={{
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1
                }}
            >
                <div className="button1"> {isLoading ? 'VERIFYING...' : 'ENTER'}</div>
            </div>
            
      </div> 
    )
}

export default EmployeeVerifPage

//  // Mock verification function - replace with actual API call
//  const verifyEmployeeId = async (id) => {
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     // Mock verification logic (replace with real verification)
//     // In a real app, this would call your backend API
//     return id === 'EMP12345'; // Example valid ID
// }