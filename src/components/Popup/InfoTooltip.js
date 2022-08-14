import React from 'react';
import successIcon from '../../images/Union.svg';
import errorIcon from '../../images/Union_error.svg';
import Popup from './Popup';

function InfoTooltip({ name, isOpen, onClose, isSuccess, tooltipText }) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <img
        src={isSuccess ? successIcon : errorIcon}
        alt={
          isSuccess ? 'успешно' : 'ошибка'
        }
        className="popup__signup-icon"
      />
      <h3 className="popup__signup-title">{tooltipText}</h3>
    </Popup>
  );
};

export default InfoTooltip;
