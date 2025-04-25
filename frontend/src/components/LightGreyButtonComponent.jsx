import React from 'react';
'../styles/components/LightGreyButtonStyles.css';

const LgButton = ({ text = 'DEFAULT' }) => {
  return (
    <div className="account-container" data-property-1="Default">
      <div className="account-title">{text}</div>
    </div>
  );
};

export default LgButton;
