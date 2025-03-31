import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Creation from './Creation.jsx';
import CreationSuccess from './CreationSuccess.jsx';
import Reschedule from './Reschedule.jsx';
import RescheduleSuccess from './RescheduleSuccess.jsx';
import Cancel from './Cancel.jsx';
import CancelSuccess from './CancelSuccess.jsx';
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
            </Routes>
        </Router>
        </div>
    );
}
export default App;
