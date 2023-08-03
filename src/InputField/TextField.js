import React, { useState } from 'react';
import BaseField from './BaseField';

const TextField = ({ field, fieldUpdated }) => {
  const [inputValue, setInputValue] = useState(field.value);
  const [errors, setErrors] = useState(field.errors);
  const {
    label,
    type = 'text',
    name,
  } = field;

  const handleChange = (event) => {
    const newValue = event?.target?.value;
    field.updateValue(newValue);
    if (field.validateOnChange) {
      field.validate().then(() => {
        setInputValue(newValue);
        fieldUpdated();
      }).catch(() => {
        setInputValue(newValue);
        fieldUpdated();
      });
    } else {
      setInputValue(newValue);
      fieldUpdated();
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
          <div className="error-message">
            {field.errors?.map((error, index) => (
              <span key={index}>{error}</span>
            ))}
          </div>
        </React.Fragment>
      }
    />
  );
};

export const TextFieldInput = React.memo(TextField);
