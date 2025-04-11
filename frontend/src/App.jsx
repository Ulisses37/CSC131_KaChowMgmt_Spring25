import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import TestComponent from './components/testComponent'
import { DeleteMe } from './components/testComponent'
// Pages
import Home from './pages/Home'
// Customer Related Pages
import CLogin from './pages/CustomerLogin'  // note the first letter of what is being imported needs to be an upper case
import CDashboard from './pages/CustomerDashboard'
import ApptManagement from './pages/AppointmentManagement'    // might need to change the name of this
import ServiceHistory from './pages/ServiceHistory'           // might need to change the name of this
// Employee Related Pages
import ELogin from './pages/EmployeeLogin'
import EVerif from './pages/EmployeeVerif'
import ADashboard from './pages/AdminDashboard'
import MDashboard from './pages/MechanicDashboard'

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} /> {/* Default route */}
        <Route path="/customer-login" element={<CLogin />} />
        {/* route path for account creation */}
        {/* route path for forgot password page */}
        {/* route path for change password confirmation */}
        <Route path="/customer-dashboard" element={<CDashboard />}/>
        <Route path="/appointment-management" element={<ApptManagement />}/>  {/* might need to change the name of this */}
        {/* route path for making appointment */}
        {/* route path for appointment confirmation */}
        {/* route path for view status */}
        {/* route path for rescheduling appointment*/}
        {/* route path for reschedule confirmation */}
        {/* route path for cancelling appointment */}
        <Route path="/service-history" element={<ServiceHistory />}/>         {/* might need to change the name of this */}
        {/* route path for feedback page */}
        {/* route path for logged out page */}
        <Route path="/employee-verification" element={<EVerif />} /> 
        <Route path="/employee-login" element={<ELogin />} />
        <Route path="/admin-dashboard" element={<ADashboard />}/>

        <Route path="/mechanic-dashboard" element={<MDashboard />}/>
      </Routes>
      </Router>
    </>
  )
}
export default App
