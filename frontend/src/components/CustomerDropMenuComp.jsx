import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CustomerDropDownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('User logged out');
    setIsOpen(false);

    // user should be redirected to the logged out page

  };

  return (
    <div className="account-button-container" ref={menuRef}>
      <div 
        className="account-button-for-customer-view"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="button"></div>
        <img className="person-icon" alt="User menu" src="person.svg" />
      </div>

      {isOpen && (
        <div className="flyout-menu">
          <Link 
            to="/profile" 
            className="menu-item"
            onClick={() => setIsOpen(false)}
          >
            View Profile
          </Link>
          <Link 
            to="/appointments" 
            className="menu-item"
            onClick={() => setIsOpen(false)}
          >
            Manage Appointments
          </Link>
          <Link 
            to="/service-history" 
            className="menu-item"
            onClick={() => setIsOpen(false)}
          >
            Service History
          </Link>
          <button 
            className="menu-item logout"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomerDropDownMenu;