import '../styles/ServiceHistoryStyles.css'

function ServiceHistoryPage(){
    return(
<div className="service-history-page">
<img className="service-history-page-child" alt="" src="Rectangle 2.svg"/>
<div className="service-history-page-item"></div>
<div class="service-history-page-inner"></div>
<img class="srs-csc-131-1-icon" 
alt="" 
src="SRS_CSC_131 1.png" 
id="sRSCSC1311Image"/>
<div className="service-history-page1">service history page</div>
<img class="rectangle-icon" alt="" src="Rectangle 16.svg"/>
<div class="rectangle-div"></div>
<div class="datetime">
<p class="datetime-completion">Date/Time Completion:</p>
<p class="pm">4:38 PM</p>
<p class="pm">March 12, 2022</p></div>
<div class="service-history-header">Service History</div>
<div class="customer-menu">
<div class="menu-wrapper">
<div class="menu">Menu</div>
</div>
<div class="text-wrapper">
<div class="text">Profile</div>
</div>
<div class="text-container">
<div class="text">
<p class="pm">Manage</p>
<p class="pm">Appointments</p>
</div>
</div>
<div class="text-wrapper">
<div class="text">Service History</div>
</div>
</div>
<div class="account-button-for-cutomer-vie">
<div class="button">
</div>
<img class="person-icon" alt="" src="person.svg"/>
</div>
<div class="vin-parent">
<div class="vin">
<span class="vin1">VIN #: </span>
<span>9ZCLG2F45NF30P151</span>
</div>
<div class="makemodel">
<span class="vin1">Make/Model: </span>
<span>Honda Accord</span></div>
<div class="ticket">
<span class="vin1">Ticket #: </span>
<span>47198</span>
</div>
<div class="appointment-type">
<p class="datetime-completion">Appointment Type: </p>
<p class="pm">Oil Change</p>
</div>
<div class="button1" id="buttonContainer">
<div class="button2">Submit Feedback</div>
</div>
</div>
<div class="baa-button" id="baABUTTONContainer">
<div class="baa-button-child">
</div>
<div class="book-an-appointment">BOOK AN APPOINTMENT</div>
</div>
</div>
    )
}
export default ServiceHistoryPage