import '../styles/EmployeeLoginStyles.css'

function EmployeeLoginPage(){
    return(
        <div class="employee-login-page">
    		<div class="employee-login-page-child"></div>
    		<div class="employee-login-page-item"></div>
    		<img class="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png" id="sRSCSC1311Image"></img>
    		<div class="employee-login-page-inner"></div>
    		<div class="employee-log-in">Employee Log In</div>
    		<div class="line-div"></div>
    		<div class="forgot-password" id="fORGOTPASSWORDText">FORGOT PASSWORD</div>
    		<div class="button">
      			<div class="button1">LOG IN</div>
    		</div>
    		<div class="username-input">
      			<div class="key-field">Email Address</div>
    		</div>
    		<div class="id-input">
      			<div class="key-field">Employee ID</div>
    		</div>
    		<div class="password-input">
      			<div class="key-field">Password</div>
    		</div>
  	    </div>
    )
}

export default EmployeeLoginPage