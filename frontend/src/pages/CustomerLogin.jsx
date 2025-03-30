import { useState } from 'react'
import '../styles/CustomerLoginStyles.css'

function CustomerLoginPage() {
    // first thing in [] is the state variable, 
    // 2nd thing is the function to update the variable
    // inside the useState (from react) is the default/initial value
    // useState hook
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleEmailChange(e) {
        setEmail(e.target.value)
        console.log(e.target.value)
        //console.log(email)
    }

    function handlePasswordChange(e){
        setPassword(e.target.value)
        console.log(e.target.value)
    }

    function handleLogin(){
        console.log(email)
        console.log(password)
    }

    return (
  		<div class="login-page-0">
    		<div class="login-page-0-child"></div>
    		<div class="login-page-0-item"></div>
    		<img class="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png" id="SRSCSC1311Image"></img>
    		<div class="login-page-0-inner"></div>
    		<div class="log-in">Log In</div>
    		<div class="no-account">No account?</div>
    		<div class="create-one" id="CREATEONEText">CREATE ONE</div>
    		<div class="line-div"></div>

    		<div onClick={handleLogin}class="button">
      			<div class="button1">LOG IN</div>
    		</div>

    		<empButton class="employee-login" 
                id="EMPLOYEELOGINText">Employee Login</empButton>
    		<div class="forgot-password" 
                id="FORGOTPASSWORDText">FORGOT PASSWORD</div>

    		<div class="key-field-wrapper">
      			<input placeholder="Email Address" 
                onChange={handleEmailChange} 
                class="key-field"></input>
    		</div>

    		<div class="password-input">
            <input placeholder="Password" onChange={handlePasswordChange} onclass="key-field"></input>
    		</div>

  		</div>
    )
}

export default CustomerLoginPage;