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
import Creation from './pages/Creation.jsx';
import CreationSuccess from './pages/CreationSuccess.jsx';
import Reschedule from './pages/Reschedule.jsx';
import RescheduleSuccess from './pages/RescheduleSuccess.jsx';
import Cancel from './pages/Cancel.jsx';
import CancelSuccess from './pages/CancelSuccess.jsx';
import ViewAppointment from './pages/ViewAppointment.jsx';
import TicketPage from './pages/TicketPage.jsx';

import './App.css';

function App() {
    return (
        <div>
            <div className="body"></div>
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
                <Route path="/" element={<Creation />} />
                <Route path="/creation" element={<Creation />} />
                <Route path="/reschedule" element={<Reschedule />} />
                <Route path="/cancel" element={<Cancel />} />
                <Route path="/crsuccess" element={<CreationSuccess />} />
                <Route path="/resuccess" element={<RescheduleSuccess />} />
                <Route path="/casuccess" element={<CancelSuccess />} />
                <Route path="/viewappointment" element={<ViewAppointment />} />
                <Route path="/ticketpage" element={<TicketPage />} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;