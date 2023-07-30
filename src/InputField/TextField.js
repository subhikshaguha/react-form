import React, { useState } from 'react';

export const TextFieldInput = (BaseField) => {
  const TextInput = ({ field }) => {
    const [inputValue, setInputValue] = useState(field.value);
    const {
      label,
      type = 'text',
      name,
      handleFieldChange,
      form,
      errors,
    } = field;
    console.log('my values over here are', field.errors);

    const handleChange = (event) => {
      const newValue = event.target.value;
      field.value = event.target.value;
      field.validate();
      setInputValue(newValue);
    };

    // console.log('my label shall be', field);
    // const formContext = useContext(FormContext);
    // const { form, errors } = formContext;

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
