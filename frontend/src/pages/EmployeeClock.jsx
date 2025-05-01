import React, { useState, useEffect } from 'react';
import HeaderBar from '../components/HeaderBarComponent';
import { useNavigate } from 'react-router';
import '../styles/EmployeeClock.css'; // Import the CSS file

const EmployeeClock = () => {
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [timeDifference, setTimeDifference] = useState('');
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('employeeId');
    const token = localStorage.getItem('employeeToken');
  
    if (!id || !token) {
      setErrorMessage('Please log in first');
      return;
    }
  
    setEmployeeId(id);
    checkClockStatus(id);
  }, []);

  // Check current clock status
  const checkClockStatus = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/employees/${id}/clock-status`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('employeeToken')}`,
          }
        }
      );

      if (!response.ok) throw new Error('Failed to check status');
      
      const data = await response.json();
      setIsClockedIn(data.isClockedIn);
      if (data.isClockedIn && data.currentSession) {
        setClockInTime(new Date(data.currentSession.clockInTime));
      }
    } catch (error) {
      console.error('Clock status error:', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle clock in
  const handleClockIn = async () => {
    if (!employeeId) {
      setErrorMessage('Employee ID not found');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/employees/${employeeId}/clock-in`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('employeeToken')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Clock in failed');

      setClockInTime(new Date(data.clockInTime));
      setClockOutTime(null);
      setTimeDifference('');
      setIsClockedIn(true);
      setSuccessMessage('Clocked in successfully!');
    } catch (error) {
      console.error('Clock in error:', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle clock out
  const handleClockOut = async () => {
    if (!employeeId) {
      setErrorMessage('Employee ID not found');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/employees/${employeeId}/clock-out`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('employeeToken')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Clock out failed');

      setClockOutTime(new Date(data.clockOutTime));
      setTimeDifference(`${parseFloat(data.durationHours).toFixed(2)} hours`);
      setIsClockedIn(false);
      setSuccessMessage(`Clocked out! Worked: ${data.durationHours} hours`);
    } catch (error) {
      console.error('Clock out error:', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="employee-clock-container">
      <HeaderBar />
      <br />
      <br />
      <br />
      <img
        className="srs-csc-131-1-icon"
        alt="Company Logo"
        src="/SRS_CSC_131 1.png"
        onClick={() => navigate("/")}
      />
      <h2>Employee Clock In/Out</h2>
      <div className="clock-buttons-container">
        <div className="clock-buttons">
          {/* Clock In button */}
          <button onClick={handleClockIn} className="clock-in-button">
            Clock In
          </button>
          {/* Clock Out button */}
          <button onClick={handleClockOut} className="clock-out-button">
            Clock Out
          </button>
        </div>
        <div className="clock-times">
          <h3>Clock In Time:</h3>
          <p>{clockInTime ? clockInTime.toLocaleString() : 'Not clocked in yet'}</p>
          <h3>Clock Out Time:</h3>
          <p>{clockOutTime ? clockOutTime.toLocaleString() : 'Not clocked out yet'}</p>
          {timeDifference && (
            <div className="time-difference">
              <h3>Time Worked:</h3>
              <p>{timeDifference}</p>
            </div>
          )}
        </div>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default EmployeeClock;