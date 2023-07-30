// InputComponent.js
import React, { useState, useEffect } from 'react';

const InputComponent = ({ field }) => {
  const [inputValue, setInputValue] = useState(() => field.value);

  const handleChange = (event) => {
    const newValue = event.target.value;
    field.value = event.target.value;
    if (field.validateOnChange) {
      field.validate();
    }
    setInputValue(newValue);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <div className="error-message">
        {field.errors.map((error, index) => (
          <span key={index}>{error}</span>
        ))}
      </div>
    </div>
  );
};

export default InputComponent;
