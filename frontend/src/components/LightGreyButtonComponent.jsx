import React from 'react';
import '../styles/components/LightGreyButtonStyles.css';

const LgButton = ({ text = 'DEFAULT', style = {}, className = '', onClick = () => {} }) => {
    return(
        <div
            className={`account-container ${className}`}
            data-property-1="Default"
            style={style}
            onClick={onClick}
        >
            <div className="account-title">{text}</div>
        </div>
    );
};

export default LgButton;