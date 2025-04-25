import React from 'react';
import '../styles/components/LightGreyButtonStyles.css';

const LgButton = ({ text = 'ACCOUNT', style = {}, className = '' }) => {
    return(
        <div
        className={`account-container ${className}`}
        data-property-1="Default"
        style={style}
        >
            <div className="account-title">{text}</div>
        </div>
  );
};

export default LgButton;
