import { Link } from 'react-router-dom';
import '../styles/HomeStyles.css';
import AppointmentButton from '../components/BookAppointmentComp'

function HomePage() {
    return (
        <div className="home">
    		<div className="home-child"></div>
    		<div className="home-item"></div>
    		<div className="home-inner"></div>
    		<img className="homepage-pic-icon" alt="" src="homepage pic.png"></img>
    		<img className="srs-csc-131-2-icon" alt="" src="SRS_CSC_131 1.png"></img>
            <div className="top-border"></div>
            <div className="account-button-for-home-page">
 				<div className="accountButton"></div>
				<img className="person-icon" alt="" src="person.svg"></img>
			</div>
            <div className="oil-change-wrapper">
 				<div className="oil-change">Oil Change</div>
 			</div>
 			<div className="tire-service-wrapper">
 				<div className="oil-change">Tire Service</div>
 			</div>
 			<div className="diagnostic-repair-wrapper">
 				<div className="oil-change">Diagnostic & Repair</div>
 			</div>
 			<div className="regular-maintenance-wrapper">
 				<div className="oil-change">Regular Maintenance</div>
 			</div>
 			<div className="services-wrapper">
 				<div className="services">Services</div>
 			</div>

			 <div className="frame-div">
 				<div className="about-us-wrapper">
 					<div className="services">About Us</div>
 				</div>
 			</div>
 			<div className="servicing-sacramento-since">Servicing Sacramento since 1857, we have highly trained specialists that have experience with all makes and models</div>
 			<Link to="/customer-login" style={{color: 'inherit',textDecoration: 'none'}}>
				<AppointmentButton/>
			</Link>
			<div className="bottom-border"></div>

  	    </div>
    )
}

export default HomePage

    		