import React, { useState } from 'react';

const ClockPage = () => {
    const [clockInTime, setClockInTime] = useState(null);
    const [clockOutTime, setClockOutTime] = useState(null);

    const handleClockIn = () => {
        const now = new Date();
        setClockInTime(now.toLocaleString());
    };

    const handleClockOut = () => {
        const now = new Date();
        setClockOutTime(now.toLocaleString());
    };

    return (
        <div className="clock-container">
            <h1>Clock In and Clock Out</h1>
            <div className="button-container">
                <button className="clock-in-button" onClick={handleClockIn}>
                    Clock In
                </button>
                <button className="clock-out-button" onClick={handleClockOut}>
                    Clock Out
                </button>
            </div>
            <div className="time-display">
                <h3>Clock In Time:</h3>
                <p>{clockInTime ? clockInTime : 'Not clocked in yet'}</p>
                <h3>Clock Out Time:</h3>
                <p>{clockOutTime ? clockOutTime : 'Not clocked out yet'}</p>
            </div>
        </div>
    );
};

export default ClockPage;