import { useNavigate } from 'react-router-dom';
import '../styles/components/BookAppointmentCompStyles.css';

function AppointmentButton() {
  const navigate = useNavigate();
  
  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="baa-button" onClick={() => goTo('/appt-creation')}>
      <div className="baa-button-child"></div>
      <div className="book-an-appointment">BOOK AN APPOINTMENT</div>
    </div> 
  );   
}

export default AppointmentButton;
