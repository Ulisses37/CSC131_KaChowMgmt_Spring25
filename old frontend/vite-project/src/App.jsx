import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import CustomerLoginPage from "./pages/CustomerLoginPage";
import EmployeeVerificationPage from "./pages/EmployeeVerificationPage"; 
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import CustomerDashboard from "./pages/CustomerDashboard";

function App() {  
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<CustomerLoginPage />} /> {/* Default route */}
        <Route path="/customer-login" element={<CustomerLoginPage />} />
        <Route path="/employee-verification" element={<EmployeeVerificationPage />} /> 
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
