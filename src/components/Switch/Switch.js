import React, { useState } from 'react';
import './Switch.css'; // CSS dosyasını oluşturacağız

const Switch = ({ isOn, handleToggle }) => {
    return (
      <label className="custom-switch">
        <input
          checked={isOn}
          onChange={handleToggle}
          className="switch-checkbox"
          type="checkbox"
        />
        <span className="switch-slider"></span>
      </label>
    );
  };
  
  export default Switch;