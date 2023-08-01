import React, { useState } from 'react';

export const TextFieldInput = (BaseField) => {
  const TextInput = ({ field, fieldUpdated }) => {
    const [inputValue, setInputValue] = useState(field.value);
    const {
      label,
      type = 'text',
      name,
      handleFieldChange,
      form,
      errors,
    } = field;

    const handleChange = (event) => {
      const newValue = event.target.value;
      field.updateValue(newValue);
      field.validate().then(() => {
        setInputValue(newValue);
        fieldUpdated();
      }).catch(() => {
        setInputValue(newValue);
        fieldUpdated();
      }
      );
    };

    return (
      <BaseField>
        <div className="FormInput">
          <label>{label}</label>
          <input
            type={type}
            name={name}
            value={inputValue}
            onChange={handleChange}
          />
        </div>
        <div className="error-message">
          {field.errors?.map((error, index) => (
            <span key={index}>{error}</span>
          ))}
        </div>
      </BaseField>
    );
  };
  return TextInput;
};
