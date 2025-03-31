import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TestComponent from './components/testComponent'
import { DeleteMe } from './components/testComponent'
// Pages
import Home from './pages/Home'
import CLogin from './pages/CustomerLogin'  // note the first letter of what is being imported needs to be an upper case
import CDashboard from './pages/CustomerDashboard'
import ELogin from './pages/EmployeeLogin'
import EVerif from './pages/EmployeeVerif'
import ADashboard from './pages/AdminDashboard'
import MDashboard from './pages/MechanicDashboard'
import FPassword from './pages/ForgotPassword'
import AccCreation from './pages/AccountCreation'

function App() {
  const [count, setCount] = useState(0)

  return (

    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} /> {/* Default route */}
        <Route path="/customer-login" element={<CLogin />} />
        <Route path="/account-creation" element={<AccCreation/>}
        <Route path="/employee-verification" element={<EVerif />} />
        <Route path="/employee-login" element={<ELogin />} />
        <Route path="/customer-dashboard" element={<CDashboard />}/>
        <Route path="/admin-dashboard" element={<ADashboard />}/>
        <Route path="/mechanic-dashboard" element={<MDashboard />}/>
      </Routes>
      </Router>
    </>
  )
}

export default App
