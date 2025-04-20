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
import CPassword from './pages/ChangePassword'
import FPassword from './pages/ForgotPassword'
import AccCreation from './pages/AccountCreation'
import ApptCreation from './pages/Creation.jsx';
import CreationSuccess from './pages/CreationSuccess.jsx';
import ApptReschedule from './pages/Reschedule.jsx';
import RescheduleSuccess from './pages/RescheduleSuccess.jsx';
import ApptCancel from './pages/Cancel.jsx';
import CancelSuccess from './pages/CancelSuccess.jsx';
import ViewAppointment from './pages/ViewAppointment.jsx';
// Employee Related Pages
import ELogin from './pages/EmployeeLogin'
import EVerif from './pages/EmployeeVerif'
import ADashboard from './pages/AdminDashboard'
import AssignTicket from './pages/AdminTicketView'
import MDashboard from './pages/MechanicDashboard'
import MechTicketPage from './pages/TicketPage.jsx';

import './App.css';
function App() {
  return (
    <>
          <Router>
          <Routes>
            <Route path="/" element={<Home/>} /> {/* Default route */}
            <Route path="/customer-login" element={<CLogin />} />
            <Route path="/account-creation" element={<AccCreation/>} />
            <Route path="/forgot-password" element={<FPassword/>} />
            <Route path="/change-password" element={<CPassword/>} />
            {/* route path for change password confirmation */}
            <Route path="/customer-dashboard" element={<CDashboard />}/>
            <Route path="/appointment-management" element={<ApptManagement />}/>  {/* might need to change the name of this */}
            <Route path="/appt-creation" element={<ApptCreation />} />
            <Route path="/crsuccess" element={<CreationSuccess />} />
            {/* route path for view status */}
            <Route path="/appt-reschedule" element={<ApptReschedule />} />
            <Route path="/resuccess" element={<RescheduleSuccess />} />
            <Route path="/appt-cancel" element={<ApptCancel />} />
            <Route path="/casuccess" element={<CancelSuccess />} />
            <Route path="/service-history" element={<ServiceHistory />}/>         {/* might need to change the name of this */}
            {/* route path for feedback page */}
            {/* route path for logged out page */}
            <Route path="/employee-verification" element={<EVerif />} />
            <Route path="/employee-login" element={<ELogin />} />
            <Route path="/admin-dashboard" element={<ADashboard />}/>
            <Route path="/admin-ticket-view" element={<AssignTicket/>}/>
            <Route path="/mechanic-dashboard" element={<MDashboard />}/>
            <Route path="/viewappointment" element={<ViewAppointment />} />
            <Route path="/ticketpage" element={<MechTicketPage />} />
          </Routes>
          </Router>
        </>
  )
}

export default App;