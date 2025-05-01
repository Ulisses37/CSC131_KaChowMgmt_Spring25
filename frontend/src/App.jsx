import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
// Pages
import Home from './pages/Home';
// Customer Related Pages
import CLogin from './pages/CustomerLogin';  // note the first letter of what is being imported needs to be an upper case
import CDashboard from './pages/CustomerDashboard';
import ApptManagement from './pages/AppointmentManagement';    // might need to change the name of this
import ServiceHistory from './pages/ServiceHistory';           // might need to change the name of this
import CPassword from './pages/ChangePassword';
import FPassword from './pages/ForgotPassword';
import AccCreation from './pages/AccountCreation';
import CPasswordSuccess from './pages/ChangePasswordSuccess'
import CPasswordLink from './pages/ChangePasswordLink'
import ApptCreation from './pages/AppointmentCreation.jsx';
import CreationSuccess from './pages/AppointmentCreationSuccess.jsx';
import ApptReschedule from './pages/AppointmentReschedule.jsx';
import RescheduleSuccess from './pages/AppointmentRescheduleSuccess.jsx';
import ApptCancel from './pages/AppointmentCancel.jsx';
import CancelSuccess from './pages/AppointmentCancelSuccess.jsx';
import ViewAppointment from './pages/ViewAppointment.jsx';
// Employee Related Pages
import ELogin from './pages/EmployeeLogin'
import EVerif from './pages/EmployeeVerif'
import ADashboard from './pages/AdminDashboard'
import AssignTicket from './pages/AdminTicketView'
import TicketPage from './pages/TicketPage.jsx';
import TicketPageDetails from './pages/TicketPageDetails.jsx';
import AMechDetails from './pages/AdminMechAcctView';
import AMechSelect from './pages/AdminMechSelection';
import Invoice from './pages/Invoice';
import MDashboard from './pages/MechanicDashboard';
import MechTicketPage from './pages/TicketPage.jsx';
import MAccountDetails from './pages/MechanicAccountDetails';
import MAccountEdit from './pages/MechanicAccountEdit';
import TicketHistory from './pages/TicketHistory';
import EmployeeClock from './pages/EmployeeClock.jsx';
import EmployeePayroll from './pages/EmployeePayroll.jsx';

import './App.css';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('customerToken');
  return token ? children : <Navigate to="/customer-login" replace />;
}

function App() {
  return (
    <>
          <Router>
          <Routes>
            <Route path="/" element={<Home/>} /> {/* Default route */}
            {/* Customer Pages */}
            <Route path="/customer-login" element={<CLogin />} />
            <Route path="/account-creation" element={<AccCreation/>} />
            <Route path="/forgot-password" element={<FPassword/>} />
            <Route path="/change-password" element={<CPassword/>} />
            <Route path="/cpass-success" element={<CPasswordSuccess/>}/>
            <Route path="/change-password-link" element={<CPasswordLink/>}/>
            {/* route path for change password confirmation */}
            <Route path="/customer-dashboard" element={
              <ProtectedRoute>
                <CDashboard />
              </ProtectedRoute>
            }/>
            <Route path="/appointment-management" element={<ApptManagement />}/>  {/* might need to change the name of this */}
            <Route path="/appt-creation" element={<ApptCreation />} />
            <Route path="/crsuccess" element={<CreationSuccess />} />
            <Route path="/appt-reschedule" element={<ApptReschedule />} />
            <Route path="/resuccess" element={<RescheduleSuccess />} />
            <Route path="/appt-cancel" element={<ApptCancel />} />
            <Route path="/casuccess" element={<CancelSuccess />} />
            <Route path="/service-history" element={<ServiceHistory />}/>         {/* might need to change the name of this */}
            {/* route path for feedback page */}
            {/* route path for logged out page */}
            {/* Employee Pages */}
            <Route path="/employee-login" element={<ELogin />} />
            <Route path="/admin-dashboard" element={<ADashboard />}/>
            <Route path="/assign-tickets" element={<AssignTicket/>}/>
            <Route path="/invoice" element={<Invoice/>}/>
            <Route path="/mechanic-details" element={<AMechDetails/>}/>
            <Route path="/mechanic-dashboard" element={<MDashboard />}/>
            <Route path="/ticketpage" element={<TicketPage />} />
            <Route path="/ticket/:id" element={<TicketPageDetails />} />
            <Route path="/account-details" element={<MAccountDetails />} />
            <Route path="/edit-account" element={<MAccountEdit />} />
            <Route path="/ticket-history" element={<TicketHistory />} />
            <Route path="/ticketpage" element={<MechTicketPage />} />
            <Route path="/employee-clock" element={<EmployeeClock />} />
            <Route path="/employee-payroll" element={<EmployeePayroll />} />
          </Routes>
          </Router>
        </>
  )
}

export default App;
