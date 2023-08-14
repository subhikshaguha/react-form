import React, { useState, useEffect } from 'react';
import BaseField from './UiBaseField';

const UiTextField = ({ field }) => {
  const [inputValue, setInputValue] = useState(field.value);
  const [errors, setErrors] = useState(field.errors);
  const {
    label,
    type = 'text',
    name,
  } = field;

  useEffect(() => {
    setInputValue(field.value);
    setErrors(field.errors);
  }, [field.value, field.errors]);

  const handleChange = (event) => {
    const newValue = event?.target?.value;
    field.updateValue(newValue);
    if (field.validateOnChange) {
      field.validate().then(() => {
        setInputValue(newValue);
      }).catch(() => {
        setInputValue(newValue);
      });
    } else {
      setInputValue(newValue);
    }
  };

  const handleFocusOut = () => {
    if (field.validateOnFocusOut) {
      field.validate().then(() => {
        setErrors(field.errors);
      }).catch(() => {
        setErrors(field.errors);
      });
    }
  };

  return (
    <BaseField
      content={
        <React.Fragment>
          <div className="FormInput">
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={inputValue}
              onChange={handleChange}
              onBlur={handleFocusOut}
            />
          </div>
        </React.Fragment>
      }
      errors={field.errors}
    />
  );
};

export default UiTextField;
