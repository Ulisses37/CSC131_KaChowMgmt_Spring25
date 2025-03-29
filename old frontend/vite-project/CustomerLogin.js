// Button function for logo to go back to the home page
var SRSCSC1311Image = document.getElementById("SRSCSC1311Image");
    if(SRSCSC1311Image) {
      	SRSCSC1311Image.addEventListener("click", function (e) {
        	window.location.href = "index.html";
      	});
    }

// Interactable text that serves as a button to go to create account page
const toCreateAccount = document.getElementById("CREATEONEText");
    if(CREATEONEText) {
        CREATEONEText.addEventListener("click", function (e) {
            window.location.href = "dummy.html"
        });
    }

// Interactable text that serves as a button to go to the employee verification page
var employeeLoginText = document.getElementById("employeeLoginText");
    if(employeeLoginText) {
          employeeLoginText.addEventListener("click", function (e) {
                // Add your code here
          });
    }

// Interactable text that serves as a button to go to the forgot password page
var fORGOTPASSWORDText = document.getElementById("fORGOTPASSWORDText");
    if(fORGOTPASSWORDText) {
      	fORGOTPASSWORDText.addEventListener("click", function (e) {
        	// Add your code here
      	});
    }