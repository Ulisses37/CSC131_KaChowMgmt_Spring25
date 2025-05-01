import { useLocation } from 'react-router-dom';
import '../styles/ServiceHistoryStyles.css'
import Menu from '../components/CustomerMenuComponent';
import AppointmentButton from '../components/BookAppointmentComp'
function ServiceHistoryPage(){
    return(
        <div className="service-history-page">
            <div className="service-history-page-item"></div>
            <div className="service-history-page-inner"></div>
            <img className="srs-csc-131-1-icon" alt="" src="SRS_CSC_131 1.png" id="sRSCSC1311Image"></img>
            <AppointmentButton/>
            <div className="gray-rectangle-bg"></div> {/*Gray background box */}
            <Menu />
            <div className="datetime">
            <p className="datetime-completion">Date/Time Completion:</p>
            <p className="pm">4:38 PM</p>
            <p className="pm">March 12, 2022</p></div>
            <div className="service-history-header">Service History</div>
            <div className="account-button-for-cutomer-vie">
            <div className="button">
            </div>
            <img className="person-icon" alt="" src="person.svg"></img>
            </div>
            <div className="vin-parent">
            <div className="vin">
            <span className="vin1">VIN #: </span>
            <span>9ZCLG2F45NF30P151</span>
            </div>
            <div className="makemodel">
            <span className="vin1">Make/Model: </span>
            <span>Honda Accord</span></div>
            <div className="ticket">
            <span className="vin1">Ticket #: </span>
            <span>47198</span>
            </div>
            <div className="appointment-type">
            <p className="datetime-completion">Appointment Type: </p>
            <p className="pm">Oil Change</p>
            </div>
            <div className="button1" id="buttonContainer">
            <div className="button2">Submit Feedback</div>
            </div>
            </div>
            </div>
    )
}
export default ServiceHistoryPage