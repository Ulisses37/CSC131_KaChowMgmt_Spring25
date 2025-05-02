import BackButton from '../components/BackButtonComponent'; 

function TicketHistoryPage(){
    return (
      <div class="ticket-history-mechanic">
      <BackButton text="DASHBOARD"/>
      <div class="base">
      <div class="page-banner">
      <div class="client-name-vin-service-wrapper">
      <div class="client-name-vin">#0001</div>
      </div>
      <div class="background-red">
      </div>
      <div class="background-black">
      </div>
      <img class="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png"/>
      <div class="account-button">
      <div class="button">
      </div>
      <div class="account-button-child">
      </div>
      <div class="account-button-item">
      </div>
      <div class="account-button-inner">
      </div>
      </div>
      <div class="play-arrow-filled-parent" id="frameContainer1">
      <img class="play-arrow-filled-icon" alt="" src="play_arrow_filled.svg"/>
      <div class="text">TICKET HISTORY</div>
      </div>
      </div>
      <div class="assigning-ticket-adjust">
      <div class="assigned-tickets">
      <div class="start-date-parent">
      <div class="start-date">Ticket #</div>
      <div class="job-status">Job Status</div>
      <div class="job-code">Time Spent</div>
      <div class="make-model-container">
      <p class="customer">Customer</p>
      <p class="customer">Feedback</p>
      </div>
      <div class="end-date">
      <p class="customer">Appointment</p>
      <p class="customer">Data</p>
      </div>
      </div>
      <div class="date-out-parent">
      <div class="date-out">
      <div class="client-name-vin">#0001</div>
      </div>
      <div class="date-out">
      <div class="client-name-vin">03/07/25</div>
      </div>
      <div class="date-out">
      <div class="client-name-vin">Complete</div>
      </div>
      <div class="date-out">
      <div class="client-name-vin">3 hoours</div>
      </div>
      <div class="makemodel-out">
      <div class="client-name-vin">
      <p class="customer">Needs Met: Yes</p>
      <p class="customer">Customer Satisfaction: 4</p>
      </div>
      </div>
      </div>
      <div class="date-out-parent">
      <div class="date-out">
      <div class="client-name-vin">#0025</div>
      </div>
      <div class="date-out">
      <div class="client-name-vin">03/07/25</div>
      </div>
      <div class="date-out">
      <div class="client-name-vin">Complete</div>
      </div>
      <div class="date-out">
      <div class="client-name-vin">45 minutes</div>
      </div>
      <div class="makemodel-out">
      <div class="client-name-vin">
      <p class="customer">Needs Met: No</p>
      <p class="customer">Customer Satisfaction: 2</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      
    )
}

export default TicketHistoryPage