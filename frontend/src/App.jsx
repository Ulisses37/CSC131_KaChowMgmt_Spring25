import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Creation from './pages/Creation.jsx';
import CreationSuccess from './pages/CreationSuccess.jsx';
import Reschedule from './pages/Reschedule.jsx';
import RescheduleSuccess from './pages/RescheduleSuccess.jsx';
import Cancel from './pages/Cancel.jsx';
import CancelSuccess from './pages/CancelSuccess.jsx';
import ViewAppointment from './pages/ViewAppointment.jsx';
import TicketPage from './pages/TicketPage.jsx';
import Ztesting from './pages/Ztesting.jsx';
import './App.css';

function App() {
    return (
        <div>
            <div className="body"></div>
        <Router>
            <Routes>
                <Route path="/" element={<Creation />} />
                <Route path="/creation" element={<Creation />} />
                <Route path="/reschedule" element={<Reschedule />} />
                <Route path="/cancel" element={<Cancel />} />
                <Route path="/crsuccess" element={<CreationSuccess />} />
                <Route path="/resuccess" element={<RescheduleSuccess />} />
                <Route path="/casuccess" element={<CancelSuccess />} />
                <Route path="/viewappointment" element={<ViewAppointment />} />
                <Route path="/ticketpage" element={<TicketPage />} />
                <Route path="/ztesting" element={<Ztesting />} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;