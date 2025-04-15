import '../styles/ChangePasswordSuccessStyles.css'

function ChangePasswordSuccessPage(){
    return(
    <div className="password-change-successful">
        <img className="password-change-successful-child" alt="" src="Rectangle 2.svg"/>
        <div className="password-change-successful-item"></div>
        <div className="password-change-successful-inner"></div>
        <img className="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png" id="sRSCSC1311Image"/>
        <div className="rectangle-div"></div>
        <div className="your-password-has">Your Password has successfully been changed.</div>
        <div className="please-click-the-container">
        <p className="please-click-the">Please click the button below to log</p>
        <p className="please-click-the">back into your account.</p></div>
        <div className="ticket-button">
        <div className="tickets">Click to Log Back In</div>
        </div>
        </div>
    )
}

export default ChangePasswordSuccessPage;