import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBarComponent'; 
import '../styles/ChangePasswordSuccessStyles.css'

function ChangePasswordSuccessPage(){
    return(
        <div className="password-change-successful">
            <div className="password-change-successful-item"></div>
            <HeaderBar/>
            <img className="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png" id="sRSCSC1311Image"/>
            <div className="rectangle-div"></div>
            <div className="your-password-has">Your Password has successfully been changed.</div>
            <div className="please-click-the-container">
            <p className="please-click-the">Please click the button below to log</p>
            <p className="please-click-the">back into your account.</p></div>
            <div className="ticket-button">

        <Link to="/customer-login" style={{color: 'inherit',textDecoration: 'none'}}>
            <div className="log-back-in" id="LOGBACKINText">Click to Log Back In</div>
        </Link>
        
            </div>
        </div>
        
    )
}

export default ChangePasswordSuccessPage;