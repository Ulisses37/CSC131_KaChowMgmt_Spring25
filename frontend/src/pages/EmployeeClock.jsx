import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeClock = () => {
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [timeDifference, setTimeDifference] = useState('');
  const navigate = useNavigate();

  const handleClockIn = async () => {
    const now = new Date();
    setClockInTime(now);
    setClockOutTime(null); // Reset clock-out time
    setTimeDifference(''); // Reset time difference
    setErrorMessage('');

    try {
      // Send clock-in time to the database
      const response = await fetch('https://your-api-endpoint.com/clock-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clockInTime: now.toISOString() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error saving clock-in time:', error);
    }
  };

  const handleClockOut = async () => {
    if (!clockInTime) {
      setErrorMessage('You must clock in before clocking out!');
      return;
    }
    const now = new Date();
    setClockOutTime(now);

    // Calculate time difference
    const diffInMs = now - clockInTime;
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
    const calculatedTimeDifference = `${hours}h ${minutes}m ${seconds}s`;
    setTimeDifference(calculatedTimeDifference);

    try {
      // Send clock-out time and time difference to the database
      const response = await fetch('https://your-api-endpoint.com/clock-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clockInTime: clockInTime.toISOString(),
          clockOutTime: now.toISOString(),
          timeDifference: calculatedTimeDifference,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error saving clock-out time:', error);
    }
  };

  return (
    <div>
      <h2>Employee Clock In/Out</h2>
      <div className="clock-buttons">
        <button onClick={handleClockIn} className="clock-in-button">
          Clock In
        </button>
        <button onClick={handleClockOut} className="clock-out-button">
          Clock Out
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default EmployeeClock;