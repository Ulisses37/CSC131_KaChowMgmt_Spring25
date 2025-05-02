import React, { useState, useEffect } from 'react';
import '../styles/EmployeePayroll.css'; // Import the CSS file
import HeaderBar from '../components/HeaderBarComponent';
import BackButton from '../components/BackButtonComponent'; 
import { useNavigate } from 'react-router';

const EmployeePayroll = () => {
    const [hourlyRate, setHourlyRate] = useState(0); // Hourly rate of the employee
    const [hoursWorked, setHoursWorked] = useState(0); // Total hours worked
    const [totalPay, setTotalPay] = useState(0); // Total pay calculated

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayrollData = async () => {
            try {
                const response = await fetch('/api/employee/payroll'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const payrollData = await response.json(); // Parse the JSON response
                setHourlyRate(payrollData.hourlyRate);
                setHoursWorked(payrollData.hoursWorked);

                // Calculate total pay
                const calculatedPay = payrollData.hourlyRate * payrollData.hoursWorked;
                setTotalPay(calculatedPay);
            } catch (error) {
                console.error('Error fetching payroll data:', error);
            }
        };

        fetchPayrollData();
    }, []);

    return (
        <>
        <BackButton text="DASHBOARD"/>
        <HeaderBar />
        <br/>
        <br/>
        <br/>
        <img
                className="srs-csc-131-1-icon"
                alt="Company Logo"
                src="/SRS_CSC_131 1.png"
                onClick={() => navigate("/")}
            />
            <h2 className="payroll-header">Employee Payroll</h2>
            <div className="payroll-item">
                <strong>Hourly Rate:</strong> ${hourlyRate.toFixed(2)}
            </div>
            <div className="payroll-item">
                <strong>Hours Worked:</strong> {hoursWorked} hours
            </div>
            <div className="payroll-item">
                <strong>Total Pay:</strong> ${totalPay.toFixed(2)}
            </div>
        </>
    );
};

export default EmployeePayroll;