// DropMenuComp.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/DropMenuStyles.css';

const DropdownMenu = ({ items, userData, isEmployee = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleNavigation = (path, action) => {
    setIsOpen(false);
    if (action) {
      action();
    } else {
      navigate(path, {
        state: {
          token: isEmployee 
            ? localStorage.getItem('employeeToken')
            : localStorage.getItem('customerToken'),
          ...userData,
          isEmployee
        }
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown-container" ref={menuRef}>
      <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
        <div className="hamburger-container">
          <div className="hamburger-icon">☰</div>
        </div>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {items.map((item, index) => (
            item.action ? (
              <button
                key={index}
                className={`dropdown-item ${item.className || ''}`}
                onClick={() => handleNavigation(item.to, item.action)}
              >
                {item.label}
              </button>
            ) : (
              <button
                key={index}
                className={`dropdown-item ${item.className || ''}`}
                onClick={() => handleNavigation(item.to)}
              >
                {item.label}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};

// 1. Guest Dropdown (when not logged in)
export const GuestDropdown = () => {
  const items = [
    { label: 'Create Account', to: '/account-creation' },
    { label: 'Log In', to: '/customer-login' }
  ];

  return <DropdownMenu items={items} />;
};

// 2. Customer Dropdown (logged in as customer)
export const CustomerDropdown = ({ customerData }) => {
  const handleLogout = () => {
    localStorage.removeItem('customerToken');
    window.location.href = '/';
  };

  const items = [
    { label: 'View Profile', to: '/customer-dashboard' },
    { label: 'Manage Appointments', to: '/appointment-management' },
    { label: 'Service History', to: '/service-history' },
    { label: 'Log Out', action: handleLogout, className: 'logout' }
  ];

  return (
    <DropdownMenu 
      items={items} 
      userData={customerData}
      isEmployee={false}
    />
  );
};

// 3. Employee Dropdown (logged in as employee/mechanic/admin)
export const EmployeeDropdown = ({ employeeData }) => {
  const handleLogout = () => {
    localStorage.removeItem('employeeToken');
    window.location.href = '/';
  };

  const baseItems = [
    { label: 'Dashboard', to: employeeData.admin ? '/admin-dashboard' : '/mechanic-dashboard' },
    { label: 'Account', to: '/account-details' },
    { label: 'Tickets', to: employeeData.admin ? '/assign-tickets' : '/my-tickets' },
    { label: 'Ticket History', to: '/ticket-history' }
  ];

  if (employeeData.admin) {
    baseItems.splice(2, 0, { label: 'Manage Mechanics', to: '/manage-mechanics' });
    baseItems.splice(4, 0, { label: 'Payroll', to: '/employee-payroll' });
  }

  const items = [...baseItems, { label: 'Log Out', action: handleLogout, className: 'logout' }];

  return (
    <DropdownMenu 
      items={items} 
      userData={employeeData}
      isEmployee={true}
    />
  );
};

// Export all variants
export default {
  GuestDropdown,
  CustomerDropdown,
  EmployeeDropdown
};
