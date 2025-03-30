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
        setError(''); // Clear error when user types
    };

    const handleVerification = async () => {
        if (!employeeId) {
            setError('Please enter your Employee ID');
            return;
        }

        // Basic ID format validation (adjust according to requirements)
        if (!/^[A-Za-z0-9]{6,10}$/.test(employeeId)) {
            setError('Please enter a valid Employee ID (6-10 alphanumeric characters)');
            return;
        }

        setIsLoading(true);
        
        try {
            // Simulate API verification (replace with actual API call)
            const isVerified = await verifyEmployeeId(employeeId);
            
            if (isVerified) {
                // Redirect to employee dashboard or next step
                navigate('/employee-login');
            } else {
                setError('Invalid Employee ID. Please try again.');
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
            console.error('Verification error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Mock verification function - replace with actual API call
    const verifyEmployeeId = async (id) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock verification logic (replace with real verification)
        // In a real app, this would call your backend API
        return id === 'EMP12345'; // Example valid ID
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