import React from 'react';
import '../styles/components/HeaderBarStyles.css';  // Fixed import statement

function HeaderBar() {
    return (
        <div className="header-container">
            <div className="red-gradient-bar"></div>
            <div className="black-bar"></div>
        </div>
    );   
}

export default HeaderBar;